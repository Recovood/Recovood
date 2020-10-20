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
      Restaurant.belongsTo(models.User);
      Restaurant.hasMany(models.Food);
    }
  };
  Restaurant.init({
    UserId: DataTypes.INTEGER,
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
    image_url: DataTypes.STRING,
    longitude: DataTypes.INTEGER,
    latitude: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Restaurant',
  });
  return Restaurant;
};