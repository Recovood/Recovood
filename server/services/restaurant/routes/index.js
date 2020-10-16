const RestaurantController = require("../controllers/restaurantController")

const router = require("express").Router()

router.get('/', (req, res) => {
  res.send("Restaurant API")
})

router.get("/restaurants", RestaurantController.findAll)
router.get("/restaurants/:id", RestaurantController.findOne)
router.post("/restaurants", RestaurantController.create)
router.put("/restaurants/:id", RestaurantController.update)
router.delete("/restaurants/:id", RestaurantController.delete)


module.exports = router