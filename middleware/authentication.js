const JWT = require('jsonwebtoken');
const SecKey = "Hello"
function authentication (req, res, next){

    const Token = req.cookies.Tokenization; 

    if (Token==null) {
      res.status(400).send("You are not authenticate");
    } else {
      JWT.verify(Token, SecKey, (err, other) => {
        if (err) {
          res.status(401).send("Try Login");
        } 
        
        req.Another = other;
        next();
      });
    }
  }
module.exports = authentication