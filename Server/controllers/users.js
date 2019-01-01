//const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authenticate = require('../middlewares/authentication.js');
const users = require('../models/users.js');
const details = require('../models/details.js');

class user {

  /**
   *creates user account
   *@param{object} req - api request
   *@param{object} res - api response
   *@return{json} user details || error message
  **/
  static createUser(req,res) {
    const password = 'bcrypt.hashSync(req.body.password,10)';
    const data = new users({
      username: req.body.username,
      password,
    })
    .save()
    .then(data=>{

      if(!data) {
        return res.status(401).json({
          code: 401,
          error: true,
          message: 'An error occured',
        });
      }
      //create token for user
      const token = jwt.sign({
        id: data.id,
        username: data.username
      },
      process.env.SECRET_KEY,
      { expiresIn: '10mins'});
      const { username }= data;
      //unsets user password
      user.password = undefined;
      return res.status(200).json({
        code: 200,
        error: false,
        username,
        token, 
      });
    })
    .catch(err=>{
      return res.status(500).json({
        code: 500,
        error: true,
        message: 'internal server error'
      });
    })
  }

  /**
   *logs in user
   *@param{object} req - api request
   *@param{object} res - api response 
    *@return{json} user token or error message
  **/
  static loginUser(req,res) {
    users.findOne({
      username: req.body.username,
    })
    .then(result => {

      if (!result) {
        return res.status(401).json({
          code: 401,
          error: true,
          message: 'Wrong User Name Or Password'
        });

      } else {
        return res.status(201).json({
          code: 201,
          error: true,
          message: 'success'
        });
       /** bcrypt.compare(req.body.password,result.password)
        .then(pass=> {

          if (!pass) {
            return res.status(401).json({
              code: 401,
              error: true,
              message: 'Wrong User Name Or Password'
            })
          }else {
            //create token for user
            const token = jwt.sign({id: result.id,
              username: result.username,},
              process.env.SECRET_KEY,{expiresIn: '10mins'});

              return res.status(200).json({
                code: 200,
                error: false,
                token,
                result
              });
            }
          })**/
      }
    })
    .catch(err => {
      return res.status(500).json({
        code: 500,
        error: true,
        message: err
      });
    });
  }

  static checkUsernameExists(req,res) {
    users.findOne({
      username: req.body.username
    })
    .then(data => {
      if (!data) return res.status(200).json({
        code: 200,
        error: false,
        message: 'username does not exist'
      });

      return res.status(401).json({
        code: 401,
        error: true,
        message: 'username is taken'
      })
    })
    .catch(err => {
      return res.status(500).json({
        code: 500,
        error: true,
        message: 'internal server error'
      });
    })
  }

  
  
}
module.exports = user