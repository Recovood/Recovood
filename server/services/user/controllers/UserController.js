const { User } = require("../models");
const { generateToken, verifyToken } = require("../helpers/jwt");
const { checkPassword } = require("../helpers/bcrypt");

class UserController {

  static async showHome(req, res, next) {
    try {
      return res.status(200).send("Recovood Server");
    } catch (err) {
      console.log(err, "<<<< error in showHome UserController");
      return next(err);
    }
  }

  static async userAuthentication(req, res, next) {
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
        return res.status(200).json(userData);
      } else {
        throw { message: "User is not authenticatd", statusCode: 401 };
      }
    } catch(err) {
      console.log(err, "<<<< error in userAuthentication");
      return next(err);
    }
  }

  static async register(req, res, next) {
    try {
      const { username, email, password, role } = req.body;
      const user = await User.create({
        username,
        email,
        password,
        role
      });
      const access_token = generateToken(user);
      return res.status(201).json({
        access_token: access_token,
        email: user.email,
        role: user.role
      });
    } catch(err) {
      console.log(err, "<<<< error in register UserController");
      return next(err);
    }
  }
  
  static async login(req, res, next) {
    try {
      const user = await User.findOne({
        where: {
          email: req.body.email
        }
      });
      if (!user) {
        throw { 
          message: "Invalid email or password", statusCode: 400 
        };
      }
      const isValid = checkPassword(req.body.password, user.password);
      console.log(isValid);
      if (isValid) {
        const access_token = generateToken(user);
        return res.status(200).json({
          access_token: access_token,
          email: user.email,
          role: user.role
        });
      } else {
        throw {
          message: "Invalid email or password",
          statusCode: 400
        };
      }
    } catch(err) {
      console.log(err, "<<<< error in login UserController");
      return next(err);
    }
  }

  static async googleLogin(req, res, next) {

  }

}

module.exports = UserController;