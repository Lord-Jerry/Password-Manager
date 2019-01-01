const jwt = require('jsonwebtoken')
const users = require('../models/users.js');
const authenticate = require('../middlewares/authentication.js');
class validation {
  
  /**
   *checks if request body contains required keys
   *@param{array} required keys
   *@param{object} req - api request
   *@param{object} res - api response
   *@param{function} next - next middleware function
   *@return{json || undefined}
  **/
  static checkBodyContains(...params) {
    return (req,res,next) => {
      console.log(req.body);
      for (let p of params) {

        if (req.body[p] === undefined) {
          return res.status(401).json({
            code: 401,
            message: `${p} is required`,
            error: true,
          });
        }

      }
      return next();
    }
  }

  /**
   *checks if value of required keys are empty or null
   *@param{array} array of required keys
   *@param{object} req - api request
   *@param{object} res - api response
   *@param{function} next - next middleware function
   *@return{json || undefined}
  **/
  static checkNotEmpty(...params) {
    return (req,res,next) => {
      for (let p of params) {

        if (req.body[p] === (null || undefined || '')) {
          return res.status(401).json({
            code: 401,
            message: `${p} cannot have empty or null value`,
            error: true,
          });
        }

      }
      return next();
    }
  }

  

}
module.exports = validation;