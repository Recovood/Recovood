const { Cart, sequelize, Food } = require("../models");
const midtransClient = require("midtrans-client");

class CartController {
  static async create(req, res, next) {
    try {
      const UserId = req.headers.user_id;
      const { FoodId, quantity, status } = req.body;

      let cartFromDb = await Cart.findOne({
        where: { UserId, FoodId },
        include: [Food],
      }); // Add include: Food | if Food model completed

      console.log(cartFromDb, ">>>> cart from db");

      if (cartFromDb) {
        let totalQuantity = +quantity + +cartFromDb.quantity;

        if (totalQuantity > cartFromDb.Food.stock) {
          let err = {
            statusCode: 400,
            message: "Not enough food",
          };
          next(err);
        } else {
          let data = await Cart.update(
            { quantity: totalQuantity },
            { where: { UserId, FoodId }, returning: true }
          );
          let cartAfterUpdate = data[1][0].dataValues;
          return res.status(201).json({
            id: cartAfterUpdate.id,
            UserId: cartAfterUpdate.UserId,
            FoodId: cartAfterUpdate.FoodId,
            quantity: cartAfterUpdate.quantity,
            status: cartAfterUpdate.status,
          });
        }
      } else {
        const newCart = await Cart.create({ UserId, FoodId, quantity, status });
        return res.status(201).json({
          id: newCart.id,
          UserId: newCart.UserId,
          FoodId: newCart.FoodId,
          quantity: newCart.quantity,
          status: newCart.status,
        });
      }
    } catch (error) {
      next(error);
    }
  }

  static async getCarts(req, res, next) {
    try {
      let UserId = req.headers.user_id;
      // console.log(req.headers);
      let carts = await Cart.findAll({ where: { UserId }, include: [Food] }); // Add include: Food | if Food model completed

      return res.status(200).json({ carts });
    } catch (error) {
      next(error);
    }
  }

  static async updateQuantity(req, res, next) {
    try {
      let UserId = req.headers.user_id;
      let { id } = req.params; //Cart Id
      let { quantity } = req.body;

      let data = await Cart.update(
        { quantity },
        { where: { id, UserId }, returning: true }
      );
      if (!data) {
        let err = {
          statusCode: 404,
          message: "Cart not found",
        };
        next(err);
      }
      let cartAfterUpdate = data[1][0].dataValues;
      return res.status(200).json({
        id: cartAfterUpdate.id,
        UserId: cartAfterUpdate.UserId,
        FoodId: cartAfterUpdate.FoodId,
        quantity: cartAfterUpdate.quantity,
        status: cartAfterUpdate.status,
      });
    } catch (err) {
      next(err);
    }
  }

  static async deleteCart(req, res, next) {
    try {
      let UserId = req.headers.user_id;
      let { id } = req.params; //Cart Id

      let cart = await Cart.findOne({ where: { id, UserId } });
      if (!cart) {
        let err = {
          statusCode: 404,
          message: "Cart not found",
        };
        next(err);
      }
      await Cart.destroy({ where: { id, UserId } });

      return res.status(200).json({ message: "Cart successfully deleted" });
    } catch (err) {
      next(err);
    }
  }

  static async checkout(req, res, next) {
    //waiting for Midtrans intregation
    try {
      // console.log(req.headers, "<<<<carts neeh");
      const t = sequelize.transaction();
      let UserId = req.headers.id;
      let promises = [];
      let carts = Cart.findAll(
        { where: { UserId, status: "waiting for payment" } },
        { transaction: t }
      );

      for await (let cart of Object.keys(carts)) {
        promises.push(
          await Food.findOne({ where: { id: cart.FoodId } }, { transaction: t })
            .then((food) => {
              let calculatedStock = +food.stock - +cart.quantity;
              if (calculatedStock < 0) {
                let err = {
                  statusCode: 400,
                  message: "Not enough stock",
                };
                throw new Error(err);
              } else {
                Food.update({ calculatedStock }, { where: { id: food.id } });
              }
            })
            .catch((error) => next(error))
        );
      }

      await Promise.all(promises);
      await t.commit();
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }

  static async midtrans(req, res, next) {
    try {
      let snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction: false,
        serverKey: "SB-Mid-server-1zuSI64YfBbKXCqz5_MzKCXV",
      });

      let parameter = {
        transaction_details: {
          order_id: "YOUR-ORDERID-123456",
          gross_amount: 10000,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          first_name: "budi",
          last_name: "pratama",
          email: "budi.pra@example.com",
          phone: "08111222333",
        },
      };

      snap
        .createTransaction(parameter)
        .then((transaction) => {
          // transaction token
          let midtransResponse = transaction;
          // console.log(transaction);
          res.status(200).json({ midtransResponse });
        })
        .catch((err) => {
          next(err);
        });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CartController;
