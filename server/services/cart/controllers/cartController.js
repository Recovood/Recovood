const { Cart, sequelize, Food, Restaurant, Transaction } = require("../models");
const midtransClient = require("midtrans-client");
let core = new midtransClient.CoreApi({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
});

class CartController {
  static async create(req, res, next) {
    try {
      const UserId = req.headers.user_id;
      const { FoodId, quantity, status } = req.body;
      // console.log(quantity, ">>>>> quantitynya");
      console.log(UserId, FoodId, quantity)


      let cartFromDb = await Cart.findOne({
        where: { UserId, FoodId, status: "Waiting for Checkout" },
        include: [Food],
      }); // Add include: Food | if Food model completed
      // console.log(cartFromDb, "INI CART FROM DB")
      // console.log(cartFromDb.quantity, ">>>>> cartfromdb");
      if (cartFromDb) {
        console.log(UserId, FoodId, quantity, "masuk ke if")

        let totalQuantity = Number(quantity) + Number(cartFromDb.quantity);
        // console.log(totalQuantity, quantity, cartFromDb.quantity, ">>>>>> totalqty");

        if (totalQuantity > cartFromDb.Food.stock) {
          let err = {
            statusCode: 400,
            message: "Not enough food",
          };
          throw err;
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
        const food = await Food.findOne({ where: { id: FoodId } });
        let calculatedStock = +food.stock - +quantity;
        if (calculatedStock < 0) {
          let err = {
            statusCode: 400,
            message: "Not enough food",
          };
          throw err;
        }
        // console.log(quantity, "safasdf")
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
      let carts = await Cart.findAll({
        where: { UserId },
        include: [{ model: Food, include: [Restaurant] }],
      }); // Add include: Food | if Food model completed

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
      if (!data[0]) {
        let err = {
          statusCode: 404,
          message: "Cart not found",
        };
        next(err);
      }
      console.log(data, ">>>> data from cartController");
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

  static async cartDone(req, res, next){
    try {
      console.log("masuk ke cartDone service")
      const id = req.params.id
      const UserId = req.headers.user_id
      console.log(id, UserId, "Darii CartDone")
      const cart = await Cart.findOne({where: {id,UserId,  status: "Paid"}})
      if(!cart){
        let err = {
          statusCode: 404,
          message: "Cart not found"
        }
        throw err
      }
      await Cart.update({status:"Done"}, {where: {id: cart.id}})
      res.status(200).json({message: "Success updating cart"})
    } catch (error) {
      next(error)
    }
      
  }
  
  static async midtrans(req, res, next) {
    try {
      console.log(req.body, "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<\n");
      let {
        bankName,
        paymentType,
        orderId,
        totalPrice,
        username,
        email,
        id: UserId,
      } = req.body;
      let parameter = {};
      let midtransTrxId;

      switch (
        req.body.paymentType //SETTING PARAMETER
      ) {
        case "bank_transfer": //BCA BNI BRI
          parameter = {
            payment_type: paymentType,
            bank_transfer: {
              bank: bankName,
            },
            transaction_details: {
              order_id: orderId,
              gross_amount: +totalPrice,
            },
            customer_details: {
              first_name: username,
              last_name: "",
              email: email,
            },
          };
          break;
        case "credit_card":
          parameter = {
            payment_type: req.body.paymentType,
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
        default:
          break;
      }
      const t = await sequelize.transaction();
      CartController.checkout(UserId, t)
        .then((checkoutStatus) => {
          console.log(checkoutStatus, "<<< checkout status");
          if (checkoutStatus === "checkout fail") {
            let err = {
              statusCode: 400,
              message: "checkout fail",
            };
            throw err
          } else {

            console.log(core.charge(), "ini charge")
            return core.charge(parameter);
          }
        })
        .then((midtransResponse) => {
          console.log(core.charge.mock.results);
          console.log(midtransResponse, 'response mockfunction');
          midtransTrxId = midtransResponse.transaction_id;
          return Transaction.create(
            {
              UserId,
              transactionId: midtransResponse.transaction_id,
              orderId: midtransResponse.order_id,
              totalAmount: midtransResponse.gross_amount,
              paymentType: midtransResponse.payment_type,
              transactionStatus: midtransResponse.transaction_status,
            },
            { transaction: t }
          );
        })
        .then((trxData) => {
          console.log(trxData, "ini data trx yang dibuat");
          return CartController.setTrxId(UserId, trxData.id, t);
        })
        .then((setTrxIdStatus) => {
          console.log(setTrxIdStatus, "<< set trx");
          if (setTrxIdStatus === "set trxId fail") {
            let err = {
              statusCode: 400,
              message: "set trxId fail",
            };
            throw new Error(err);
          } else {
            return t.commit();
          }
        })
        .then(() => {
          res.status(201).json({
            message: "your transaction succesfully placed, waiting for payment",
          });
        })
        .catch((e) => {
          console.log(e);
          t.rollback();
          // core.transaction.cancel(midtransTrxId);
          throw e;
        });
    } catch (error) {
      next(error);
    }
  }
  static async checkout(UserId, t) {
    //waiting for Midtrans intregation
    try {
      let promises = [];
      let carts = await Cart.findAll(
        { where: { UserId, status: "Waiting for Checkout" } },
        { transaction: t }
      );
      if (carts.length === 0) {
        throw "no cart found";
      }
      for await (let cart of carts) {
        promises.push(
          await Food.findOne({ where: { id: cart.FoodId }, transaction: t })
            .then((food) => {
              let calculatedStock = +food.stock - +cart.quantity;
              console.log(calculatedStock, food.stock, cart.quantity, food.id);
              if (calculatedStock < 0) {
                throw new Error("not enough Stock");
              } else {
                return Food.update(
                  { stock: calculatedStock },
                  { where: { id: food.id }, transaction: t }
                );
              }
            })
            .then((statusFoodUpdate) => {
              console.log(statusFoodUpdate, "ini status food");
              if (statusFoodUpdate[0] === 0) {
                throw "food not found";
              }
            })
            .catch((error) => {
              console.log(error, "<< error di checkout");
              throw error;
            })
        );
      }
      return await Promise.all(promises);
    } catch (error) {
      console.log(error, "errorr<< di checkout");
      return "checkout fail";
    }
  }
  static async setTrxId(UserId, trxId, t) {
    //trxId is id on Transactions row not transactionId from midtrans
    console.log(UserId, trxId, "<<<<< setTRXID PARAMS");
    try {
      let promises = [];
      promises.push(
        Cart.update(
          { TransactionId: trxId, status: "Pending" },
          { where: { UserId, status: "Waiting for Checkout" }, transaction: t }
        )
          .then((statusUpdate) => {
            console.log(statusUpdate, "<<<<<<<<status Update");
            if (statusUpdate[0] === 0) {
              throw null;
            }
          })
          .catch((err) => {
            throw err;
          })
      );
      return await Promise.all(promises);
    } catch (error) {
      console.log(error);
      return "set trxId fail";
    }
  }

  static async getTransactionFromDatabase(req, res, next) {
    try {
      const UserId = req.headers.user_id;
      let transactions = await Transaction.findAll({
        where: { UserId, transactionStatus: "pending" },
        include: [Cart],
      });
      res.status(200).json({ transactions });
    } catch (err) {
      next(err);
    }
  }

  static async getTransactionFromMidtrans(req, res, next) {
    try {
      console.log("test from trx MIdtrans");
      const transaction_id = req.params.midtransTrxId;
      const promises = [];
      console.log(core.transaction.status)
      console.log(core.transaction, "trx doang")
      // console.log(core)
      core.transaction
        .status(transaction_id)
        .then((response) => {
          let orderId = response.order_id;
          let transactionStatus = response.transaction_status;
          let fraudStatus = response.fraud_status;
          console.log(response, "<<<<<<< response cart controller");
          if (transactionStatus == "capture") {
            // capture only applies to card transaction, which you need to check for the fraudStatus
            if (fraudStatus == "challenge") {
              // TODO set transaction status on your databaase to 'challenge'
            } else if (fraudStatus == "accept") {
              // TODO set transaction status on your databaase to 'success'
            }
          } else if (transactionStatus == "settlement") {
            Transaction.findOne({
              where: { orderId: orderId },
              include: [Cart],
            }).then((data) => {
              if (data) {
                console.log(data.id);
                Transaction.update(
                  { transactionStatus: "Settlement" },
                  { where: { id: data.id } }
                ).then(() => {
                  Cart.update(
                    { status: "Paid" },
                    { where: { TransactionId: data.id } }
                  );
                });
              }
            });
          } else if (transactionStatus == "deny") {
            // TODO you can ignore 'deny', because most of the time it allows payment retries
            // and later can become success
          } else if (
            transactionStatus == "cancel" ||
            transactionStatus == "expire"
          ) {
            // TODO set transaction status on your databaase to 'failure'
            Transaction.findAll({ where: { orderId: orderId } }).then(
              (data) => {
                if (data) {
                  Transaction.destroy({ where: { id: data.id } });
                }
              }
            );
          } else if (transactionStatus == "pending") {
            // TODO set transaction status on your databaase to 'pending' / waiting payment
          }
          return response;
        })
        .then((response) => {
          console.log(response, "ini dari cartController")
          res.status(200).json({
            statusMessage: response.status_message,
            transactionId: response.transaction_id,
            orderId: response.order_id,
            totalPrice: response.gross_amount,
            paymentType: response.payment_type,
            transactionStatus: response.transaction_status,
            vaNumber: response.va_numbers[0].va_number || response.permata_va_number,
            bank: response.va_numbers[0].bank || null,
          });
        });
    } catch (error) {
      next(error);
    }
  }

  static async midtransTransaction(req, res, next) {
    res.status(200).json({ message: "gaskeun" });
    //FLOW:
    /*
      1. Midtrans post data to /cart service 
      2. /cart service GET trx status to Midtrans Server
      3. Compare two result
    */


    console.log(req.body, "<<<<<<<<<<<<<<<<ini request")
    // console.log(req.body, "<<<<<<<<<<<<<<<<ini request")
    // console.log(res, "<<<<<<<<<<<<<<<<<<<ini response")
    let mockNotificationJson = {
      // 'currency': 'IDR',
      // 'fraud_status': 'accept',
      // 'gross_amount': '24145.00',
      // 'order_id': 'test-transaction-321',
      // 'payment_type': 'bank_transfer',
      // 'status_code': '201',
      // 'status_message': 'Success, Bank Transfer transaction is created',
      transaction_id: "4255dc29-76c7-462c-88df-f30be2795f3e",
      // 'transaction_status': 'pending',
      // 'transaction_time': '2018-10-24 15:34:33',
      // 'va_numbers': [{ 'bank': 'bca', 'va_number': '490526303019299' }]
    };
    // {'transaction_id': req.params.midtransTrxId}
    core.transaction.notification(JSON.stringify(req.body))
      .then((statusResponse) => {
        console.log(
          statusResponse,
          "<<<<<<<<< ini status response dari Midtrans Notification"
        );
        let promises = [];
        let orderId = statusResponse.order_id;
        let transactionStatus = statusResponse.transaction_status;
        let fraudStatus = statusResponse.fraud_status;
        console.log(
          `Transaction notification received. Order ID: ${orderId}. Transaction status: ${transactionStatus}. Fraud status: ${fraudStatus}`
        );

        // Sample transactionStatus handling logic

        if (transactionStatus == "capture") {
          // capture only applies to card transaction, which you need to check for the fraudStatus
          if (fraudStatus == "challenge") {
            // TODO set transaction status on your databaase to 'challenge'
          } else if (fraudStatus == "accept") {
            // TODO set transaction status on your databaase to 'success'
          }
        } else if (transactionStatus == "settlement") {
          // TODO set transaction status on your databaase to 'success'
          Transaction.findOne({
            where: { orderId: orderId },
            include: [Cart],
          }).then((data) => {
            if (data) {
              Transaction.update(
                { transactionStatus: "Settlement" },
                { where: { id: data.id } }
              ).then(() => {
                Cart.update(
                  { status: "Paid" },
                  { where: { TransactionId: data.id } }
                );
              });
            }
          });
        } else if (transactionStatus == "deny") {
          // TODO you can ignore 'deny', because most of the time it allows payment retries
          // and later can become success
        } else if (
          transactionStatus == "cancel" ||
          transactionStatus == "expire"
        ) {
          // TODO set transaction status on your databaase to 'failure'
          Transaction.findOne({ where: { orderId: orderId } }).then((data) => {
            console.log(data, "");
            if (data) {
              Transaction.destroy({ where: { id: data.id } });
            }
          });
        } else if (transactionStatus == "pending") {
          // TODO set transaction status on your databaase to 'pending' / waiting payment
        }
        Promise.all(promises)
          .then(() => {
            // res.status(200)
          })
          .catch((err) => {
            console.log(err);
          });
      });
  }
}

module.exports = CartController;
