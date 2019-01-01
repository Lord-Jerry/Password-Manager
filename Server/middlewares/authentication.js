const jwt = require('jsonwebtoken');
class authentication {
  /**
   *
   *
  **/
  static verifyOperation(req,res,next) {

    if (req.headers.token) {
      jwt.verify(req.headers.token,process.env.SECRET_KEY,(err,decoded) => {

        if (err) return res.status(401).json({
          code: 401,
          message: 'invalid token',
          error: true,
        });

        if (decoded) return next();
      });
    } else {

      return res.status(401).json({
        code:401,
        message: 'invalid token',
        error: true,
      });
    }
  }

  

}
module.exports = authentication;