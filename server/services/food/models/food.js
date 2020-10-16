"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Food extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Food.init(
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "Name must be filled!",
          },
        },
      },
      image_url: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "Image must be filled!",
          },
          isUrl: {
            args: true,
            msg: "Please insert a valid url!",
          },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        validate: {
          min: {
            args: [0],
            msg: "Price must be greater than or equals to 0",
          },
          isInt: {
            msg: "Price must be in numeric format!",
          },
          notEmpty: {
            args: true,
            msg: "Price must be filled!",
          },
        },
      },
      stock: {
        type: DataTypes.INTEGER,
        validate: {
          min: {
            args: [0],
            msg: "Price must be greater than or equals to 0",
          },
          isInt: {
            msg: "Price must be in numeric format!",
          },
          notEmpty: {
            args: true,
            msg: "Price must be filled!",
          },
        },
      },
      ingredient: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "Ingredient must be filled!",
          },
        },
      },
      RestaurantId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Food",
    }
  );
  return Food;
};
