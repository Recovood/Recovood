const { Food, Restaurant } = require("../models");

class FoodController {
  static async addFood(req, res, next) {
    try {
      console.log(req.body, ">>>> body req");
      const {
        name,
        image_url,
        price,
        stock,
        ingredient,
        RestaurantId, // for testing (delete before production)
      } = req.body;
      const food = await Food.create({
        name,
        image_url,
        price,
        stock,
        ingredient,
        RestaurantId,
      });
      return res.status(201).json(food);
    } catch (err) {
      console.log(err, "<<<< error in addFood Food Controller");
      return next(err);
    }
  }

  static async getFoods(req, res, next) {
    try {
      const foods = await Food.findAll({ include: [Restaurant] });
      return res.status(200).json(foods);
    } catch (err) {
      // console.log(err, "<<<< error in getFoods Food Controller");
      return next(err);
    }
  }

  static async getFood(req, res, next) {
    try {
      const food = await Food.findByPk(+req.params.id);
      return res.status(200).json(food);
    } catch (err) {
      // console.log(err, "<<<< error in getFood Food Controller");
      return next(err);
    }
  }

  static async updateFood(req, res, next) {
    try {
      const { name, image_url, price, stock, ingredient } = req.body;
      const food = await Food.update(
        {
          name,
          image_url,
          price,
          stock,
          ingredient,
        },
        {
          where: {
            id: +req.params.id,
          },
          returning: true,
        }
      );
      return res.status(200).json(food[1][0]);
    } catch (err) {
      // console.log(err, "<<<< error in updateFood Food Controller");
      return next(err);
    }
  }

  static async deleteFood(req, res, next) {
    try {
      const food = await Food.destroy({
        where: {
          id: +req.params.id,
        },
      });
      return res
        .status(200)
        .json({ message: "Food has been deleted successfully" });
    } catch (err) {
      // console.log(err, "<<<< error in deleteFood Food Controller");
      return next(err);
    }
  }
}

module.exports = FoodController;
