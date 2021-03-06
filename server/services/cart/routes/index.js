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
router.patch("/done/:id", CartController.cartDone)
router.post("/midtrans", CartController.midtrans);
router.get(
  "/midtrans/:midtransTrxId",
  CartController.getTransactionFromMidtrans
);
router.post("/midtrans/notification", CartController.midtransTransaction);
router.get("/transactions", CartController.getTransactionFromDatabase);

module.exports = router;
