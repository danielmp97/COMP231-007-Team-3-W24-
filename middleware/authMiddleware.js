const jwt = require("jsonwebtoken");
require("dotenv").config();
const  { jwtDecode } = require("jwt-decode");

function getToken(req) {
    if (
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
      return req.headers.authorization.split(" ")[1];
    }
    return null;
  }


  const User = (req, res, next) => {
    const token = getToken(req);
    console.log(token)
    if (!token) {
      return res.status(403).json({
        message: "Unauthorized Access! Please Login to continue",
        success: false,
      });
    }
  
   
    jwt.verify(token, process.env.JWT_SECRET, async function (err, decoded) {
      if (err) {
        return res.status(403).json({
          message: "Invalid Token",
          success: false,
        });
      } else {
        
  
        req.user = {
            role:'doctor',//there was no role on token
...decoded
        }
        next();
      }
    });

  
    
  };


  module.exports = {User}
  