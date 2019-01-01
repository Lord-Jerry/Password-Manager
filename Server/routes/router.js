const express = require('express');
const validation = require('../middlewares/validation.js');
const authentication = require('../middlewares/authentication.js');
const user = require('../controllers/users.js');
const details = require('../controllers/details.js');

//set up express router
const router = express.Router();

/** ************************ API ENDPOINTS ******************** **/

//SIGNUP ROUTE
router.route('/api/v1/signup')
  .post(validation.checkBodyContains('username','password'),
        validation.checkNotEmpty('username','password'),
        user.createUser,
       );

  //LOGIN ROUTE
router.route('/api/v1/login')
  .post(validation.checkBodyContains('username','password'),
        validation.checkNotEmpty('username','password'),
        user.loginUser, 
       );
//get user saved details
router.route('/api/v1/details')
  .get(authentication.verifyOperation,
       details.getDetails,
    );

//create user details
router.route('/api/v1/details')
  .post(authentication.verifyOperation,
        validation.checkBodyContains('website','username','password'),
        validation.checkNotEmpty('website','username','password'),
        details.createDetails,
       );


    //Modify details ROUTE
router.route('/api/v1/details/modify/:id')
  .put(authentication.verifyOperation,
       validation.checkBodyContains('website','username','password'),
       validation.checkNotEmpty('website','username','password'),
       details.modifyDetails,
       );
//Delete Details
router.route(`/api/v1/details/delete/:id`)
  .delete( );

//check username exists
router.route('/api/v1/checkUsernameExists')
  .post(validation.checkBodyContains('username'),
        validation.checkNotEmpty('username'),
        user.checkUsernameExists

    ) 

//404 ROUTE
router.route('*')
  .all((req,res) => {
    res.status(404).json({
      code: 404,
    	message: 'Invalid route'
    });
  });


module.exports = router;