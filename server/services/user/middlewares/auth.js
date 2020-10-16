const { verifyToken } = require("../helpers/jwt.js");
const { User } = require("../models");

const userAuthentication = async(req, res, next) => {
  const { access_token } = req.headers;
  try {
    const userData = verifyToken(access_token);
    console.log(userData, "<<<< this is userData");
    
    const user = await User.findOne({
      where: {
        email: userData.email
      }
    });
    if (user) {
      req.userData = userData;
      next();
    } else {
      throw { message: "User is not authenticatd", statusCode: 401 };
    }
  } catch(err) {
    console.log(err, "<<<< error in userAuthentication");
    return next(err);
  }
}

const userAuthorization = (req, res, next) => {
  const { access_token } = req.headers;
  const userData = verifyToken(access_token);
  console.log(userData, "<<<< this is userData");

  if (userData.role === "owner") {
    next();
  } else {
    throw { message: "Unauthorized Access", statusCode: 403 };
  }
}

module.exports = { userAuthentication, userAuthorization };