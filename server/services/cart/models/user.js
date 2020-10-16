'use strict';
const {
  Model
} = require('sequelize');
// const { hashPassword } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Food, { through: models.Cart });
      User.hasMany(models.Cart);
    }
  };
  User.init({
    username: {
      type:DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Username cannot be left blank!"
        }
      }
    },
    email: {
      type:DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: "Please insert a valid email!"
        },
        notEmpty: {
          args: true,
          msg: "Email cannot be left blank!"
        }
      }
    },
    password: {
      type:DataTypes.STRING,
      validate: {
        len: {
          args: [8,15],
          msg: "password must be between 8 to 15 characters!"
        },
        notEmpty: {
          args: true,
          msg: "Password cannot be left blank!"
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Role cannot be left blank!"
        }
      }
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  // User.beforeCreate((user, options) => {
  //   user.password = hashPassword(user.password);
  //   if (!user.role) {
  //     user.role = "customer";
  //   }
  // });
  return User;
};