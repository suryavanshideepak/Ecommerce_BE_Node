const jwt = require("jsonwebtoken")
const TOKEN_SECRET = "b91028378997c0b3581821456edefd417606a";


const verifyMiddelware=(req,res,next)=>{
  var decoded = jwt.verify(req.headers.token,TOKEN_SECRET  );
  console.log("d",decoded);
  req.body.id= decoded.id  
  next()
}
module.exports = {verifyMiddelware}
