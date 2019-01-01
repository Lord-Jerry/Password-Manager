const detail = require('../models/details.js');
const jwt = require('jsonwebtoken');

class details {

  /** 
   *get profile of user with submitted token
   *@param{object} req - api request
   *@param{object} res - api response
   *@returns {json}  user profile || error message
  **/
  static getDetails(req,res) {
    let { token } = req.headers;
    token = jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {

      if(err) return res.json({
        code: 401,
        error: true,
        message: 'invalid token'
      });

      return decoded
    });

    detail.find({
      user_id: token.id
    })
    .then(data=>{

      if (!data || data.length < 1) {
        return res.status(400).json({
          code: 400,
          error: true,
          message: 'No details available yet',
        })
      }

      return res.status(200).json({
        code: 200,
        error: false,
        message: data,
      });
    })
  }

  static createDetails(req,res) {
    let { token } = req.headers;
    token = jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {

      if(err) return res.json({
        code: 401,
        error: true,
        message: 'invalid Token'
      });
    });

    const data = new detail({
      user_id: token.id,
      website: req.body.website,
      username: req.body.username,
      password: req.body.password,
    })
    .save()
    .then(data => {
      
      if(!data) return res.status(401).json({
        code: 401,
        error: true,
        message: 'An error occured',
      });

      return res.status(201).json({
        code: 201,
        error: false,
        message: "Details Saved Successfully"
      });
    })
    .catch(err=>{
      return res.status(500).json({
        code: 500,
        error: true,
        message: 'internal server error'
      });
    });  
  }

  static modifyDetails(req,res) {

  }

  static deleteDetails(req,res) {

  }

}

module.exports = details;