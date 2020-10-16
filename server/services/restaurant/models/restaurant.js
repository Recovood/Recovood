'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Restaurant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Restaurant.init({
    UserId: DataTypes.STRING,
    name: {
      type: DataTypes.STRING,
      validate:{
        notEmpty: {
          args: true,
          msg: "name required"
        }
      }
    },
    address: {
      type: DataTypes.STRING,
      validate:{
        notEmpty: {
          args: true,
          msg: "address required"
        }
      }
    },
    image_url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Restaurant',
  });
  return Restaurant;
};