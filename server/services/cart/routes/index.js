const CartController = require("../controllers/cartController");

const router = require("express").Router();

// router.get("/", (req, res) => {
//   res.send("Cart API")
// })

router.post("/carts", CartController.create);
router.get("/carts", CartController.getCarts);
router.patch("/carts/:id", CartController.updateQuantity);
router.delete("/carts/:id", CartController.deleteCart);
router.patch("/checkout", CartController.checkout);
router.post("/midtrans", CartController.midtrans);

module.exports = router;
