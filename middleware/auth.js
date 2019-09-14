const jwt = require("jsonwebtoken");
const config = require("config");

//middleware function that has access to the req res objects. next is a callback that gets run when finished to move to next middleware
module.exports = function(req, res, next) {
  //Get token from header
  const token = req.header("x-auth-token");

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization failed" });
  }

  //verify token
  try {
    //decode token
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    //take req object and assign value to user
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
