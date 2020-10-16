const route = require("express").Router();
const FoodController = require("../controllers/FoodController");

route.post("/foods", FoodController.addFood);
route.get("/foods", FoodController.getFoods);
route.get("/foods/:id", FoodController.getFood);
route.put("/foods/:id", FoodController.updateFood);
route.delete("/foods/:id", FoodController.deleteFood);

module.exports = route;
