const request = require("supertest");
const app = require("../app.js");
const { sequelize, User, Food, Restaurant, Cart } = require("../models");
const { queryInterface } = sequelize;
// const { core } = require("../controllers/cartController");
// const { CoreApi } = require("midtrans-client");

const midtransClient = require("midtrans-client");

jest.mock('midtrans-client', () => {
  return {
    CoreApi: jest.fn().mockImplementation(() => {
      // const transaction = {
      //   status: ()
      // }
      return {
        // transaction,
        charge: jest.fn().mockResolvedValue({
          transaction_id: "trxIdTeSTinG",
          order_id: "RCVDTEST",
          gross_amount: "10000",
          payment_type: "bank_transfer",
          transaction_status: "pending",
        })
        // transaction: jest.fn().mockImplementation(() => {
        //   return {
        //     status: jest.fn().mockImplementation(() => {
        //       return {
        //         
        //       }

        //     })
        //   }


      }
    })
  }
});
// midtransClient.CoreApi.mockImplementation(() => {
//   return {
//     charge: () => {
//       console.log("AAAAAAAAAAAAAAAAjadidong");
//       return {
//         transaction_id: "trxIdTeSTinG",
//         order_id: "RCVDTEST",
//         gross_amount: "10000",
//         payment_type: "bank_transfer",
//         transaction_status: "Pending",
//       }
//     }
//   }
// })

// midtransClient.mockReturnValue({CoreApi: ()=> {
//   return {
//     charge: () => {
//       return {
//         transaction_id: "trxIdTeSTinG",
//         order_id: "RCVDTEST",
//         gross_amount: "10000",
//         payment_type: "bank_transfer",
//         transaction_status: "Pending",
//       }
//     }
//   }
// }})

// midtransClient.CoreApi.mockReturnValue({
//   charge: () => {
//     console.log("aaaaaaaaaaaaM")
//     return {
//       transaction_id: "trxIdTeSTinG",
//       order_id: "RCVDTEST",
//       gross_amount: "10000",
//       payment_type: "bank_transfer",
//       transaction_status: "Pending",
//     }
//   }
// })

// let core = new midtransClient.CoreApi({
//   isProduction: false,
//   serverKey: "SB-Mid-server-1zuSI64YfBbKXCqz5_MzKCXV",
//   clientKey: "SB-Mid-client-jGQVtFgiEUj_raF5",
// });

// let midtransMock = jest.CartController.midtrans


let food;
let secondFood;
let paidCart;
let idOfCart;
let restaurants;
let user;
let cart;
let transaction

beforeAll(async (done) => {
  user = await User.create({
    username: "admin",
    email: "admin@mail.com",
    password: "adminganteng",
    role: "admin",
  });

  restaurants = await Restaurant.create({
    UserId: user.id,
    name: "Ayam Bu Vesti",
    address: "Jl. Pangeran Antasari, No.11",
    image_url: "www.image.com",
    longitude: -7.66519,
    latitude: 111.31629,
  });

  food = await Food.create({
    name: "Nasi Padang",
    image_url:
      "https://travel.tribunnews.com/2020/02/24/4-fakta-unik-rumah-makan-padang-ada-lagu-berjudul-nasi-padang",
    price: 18000,
    stock: 20,
    ingredient: "nasi dicampur dengan kaldu ditambah dengan ayam",
    RestaurantId: restaurants.id,
  });

  secondFood = await Food.create({
    name: "Nasi Goreng",
    image_url:
      "https://travel.tribunnews.com/2020/02/24/4-fakta-unik-rumah-makan-padang-ada-lagu-berjudul-nasi-padang",
    price: 18000,
    stock: 10,
    ingredient: "nasi dicampur dengan kecap ditambah dengan ayam",
    RestaurantId: restaurants.id,
  });

  paidCart = await Cart.create({
    UserId: user.id,
    FoodId: secondFood.id,
    quantity: 1,
    status: "Paid",
  })

  done();
});

afterAll((done) => {
  queryInterface.bulkDelete("Users", null, {})
    .then(() => {
      queryInterface.bulkDelete("Restaurants", null, {})
    })
    .then(() => {
      queryInterface.bulkDelete("Food", null, {})
    })
    .finally(() => {
      done()
      sequelize.close()
    })
});

describe("MODEL Cart", () => {
  describe("POST /carts", () => {

    test("Success Create Cart", (done) => {
      // console.log(food, ">>>>>> food id nya");
      // console.log(user, ">>>>>> user id nya");
      request(app)
        .post("/carts")
        .send({
          FoodId: food.id,
          quantity: 1,
          status: "Waiting for Checkout",
        })
        .set("Accept", "application/json")
        .set("user_id", user.id)
        .expect("Content-Type", /json/)
        .then((response) => {
          const { body, status } = response;
          idOfCart = body.id;
          console.log(body, idOfCart, "di test Create Cart")
          // idOfFood = body.FoodId;
          expect(status).toBe(201);
          // expect(response).toHaveProperty("body", expect.any(Object));
          expect(body).toHaveProperty("id");
          expect(body).toHaveProperty("FoodId", food.id);
          expect(body).toHaveProperty("quantity", 1);
          expect(body).toHaveProperty("status", "Waiting for Checkout");
          done();
        });
    });

    test("Success Create Cart double", (done) => {
      // console.log(food, ">>>>>> food id nya");
      // console.log(user, ">>>>>> user id nya");
      request(app)
        .post("/carts")
        .send({
          FoodId: food.id,
          quantity: 1,
          status: "Waiting for Checkout",
        })
        .set("Accept", "application/json")
        .set("user_id", user.id)
        .expect("Content-Type", /json/)
        .then((response) => {
          const { body, status } = response;
          console.log(body, food.id, "ini Cart Double")
          idOfCart = body.id;
          // idOfFood = body.FoodId;
          expect(status).toBe(201);
          // expect(response).toHaveProperty("body", expect.any(Object));
          expect(body).toHaveProperty("id");
          expect(body).toHaveProperty("FoodId", food.id);
          expect(body).toHaveProperty("quantity", 2);
          expect(body).toHaveProperty("status", "Waiting for Checkout");
          done();
        });
    });


    test("Failed add cart: quantity is empty", (done) => {
      request(app)
        .post("/carts")
        .send({
          FoodId: secondFood.id,
          quantity: "",
          status: "Waiting for Checkout",
        })
        .set("Accept", "application/json")
        .set("user_id", user.id)
        .expect("Content-Type", /json/)
        .then((res) => {
          const { body, status } = res;
          expect(status).toBe(400);
          expect(body).toHaveProperty("errors");
          expect(body.errors[0]).toBe("Please filled quantity");
          done();
        });
    });

    test("Failed add cart: greater than 0", (done) => {
      request(app)
        .post("/carts")
        .send({
          FoodId: food.id,
          quantity: -10,
          status: "Waiting for Checkout",
        })
        .set("Accept", "application/json")
        .set("user_id", user.id)
        .expect("Content-Type", /json/)
        .then((res) => {
          // console.log(res.body, "<<<<< res");
          const { body, status } = res;
          expect(status).toBe(400);
          expect(body).toHaveProperty("errors");
          expect(body.errors[0]).toBe(
            "Quantity must be greater than or equal to 0"
          );
          done();
        });
    });

    test("Failed add cart: quantity greater than stock", (done) => {
      request(app)
        .post("/carts")
        .send({
          FoodId: food.id,
          quantity: 100,
          status: "Waiting for Checkout",
        })
        .set("Accept", "application/json")
        .set("user_id", user.id)
        .expect("Content-Type", /json/)
        .then((res) => {
          // console.log(res.body, "<<<<< data dari res failed > stock >>>>>");
          const { body, status } = res;
          expect(status).toBe(400);
          expect(body).toHaveProperty("errors");
          expect(body.errors[0]).toBe("Not enough food");
          done();
        });
    });
  });

  describe("GET /carts", () => {
    test("Success Get Carts", (done) => {
      request(app)
        .get(`/carts`)
        .set("Accept", "application/json")
        .set("user_id", user.id)
        .expect("Content-Type", /json/)
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(200);
          expect(body).toHaveProperty("carts");
          done();
        });
    });

    test("Failed Get Carts", (done) => {
      request(app)
        .get(`/carts`)
        .set("Accept", "application/json")
        // .set("user_id", user.id)
        .expect("Content-Type", /json/)
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(500);
          expect(response).toHaveProperty("body", expect.any(Object));
          done();
        });
    });
  });

  describe("PATCH", () => {
    test("Success update quantity", (done) => {
      request(app)
        .patch(`/carts/${idOfCart}`)
        .send({
          quantity: 1,
        })
        .set("Accept", "application/json")
        .set("user_id", user.id)
        .expect("Content-Type", /json/)
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(200);
          // expect(response).toHaveProperty("body", expect.any(Object));
          expect(body).toHaveProperty("id");
          expect(body).toHaveProperty("UserId");
          expect(body).toHaveProperty("FoodId", food.id);
          expect(body).toHaveProperty("quantity", 1);
          expect(body).toHaveProperty("status", "Waiting for Checkout");
          done();
        });
    });

    test("Success update status to Done", (done) => {
      request(app)
        .patch(`/done/${paidCart.id}`)
        .set("Accept", "application/json")
        .set("user_id", user.id)
        .expect("Content-Type", /json/)
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(200);
          // expect(response).toHaveProperty("body", expect.any(Object));
          expect(body.message).toBe("Success updating cart")
          done()
        });
    })

    test("Failed update quantity: cart not found", (done) => {
      request(app)
        .patch(`/carts/${515}`)
        .send({
          quantity: 1,
        })
        .set("Accept", "application/json")
        .set("user_id", user.id)
        .expect("Content-Type", /json/)
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(404);
          expect(response).toHaveProperty("body", expect.any(Object));
          done();
        });
    });

    test("Failed update status to Done: Cart not found", (done) => {
      request(app)
        .patch(`/done/${123123123}`)
        .set("Accept", "application/json")
        .set("user_id", user.id)
        .expect("Content-Type", /json/)
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(404);
          expect(response).toHaveProperty("body", expect.any(Object));
          done()
        });
    })
  });

  describe("Midtrans", () => {
    test("Success on Checkout and placed Midtrans Trx", (done) => {

      request(app)
        .post("/midtrans")
        .send({
          bankName: "bri",
          paymentType: "bank_transfer",
          orderId: "RCVDTEST",
          totalPrice: "10000",
          username: "testing",
          email: "test@mail.com",
          id: user.id,
        })
        .set("Accept", "application/json")
        .set('Access-Control-Allow-Headers', 'Authorization')
        .expect("Content-Type", /json/)
        .then((response) => {
          const { body, status } = response
          expect(body.message).toBe("your transaction succesfully placed, waiting for payment")
          done()
        })
    })

    test("Success get Transactions(s) from database", (done) => {
      request(app)
        .get(`/transactions`)
        .set("Accept", "application/json")
        .set("user_id", user.id)
        .expect("Content-Type", /json/)
        .then((response) => {
          const { body, status } = response;
          // console.log(body, status)
          console.log(body, "ini transaction")
          expect(status).toBe(200);
          expect(body).toHaveProperty("transactions");
          done();
          return transaction = body.transactions[0]

        })
    })

    test("Success get Transaction from Midtrans", (done) => {
      console.log(transaction)
      request(app)
        .get(`/midtrans/${transaction.id}`)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .then((res) => {
          const { body, status } = res
          console.log(body, "ini body trx from midtrans")
          expect(status).toBe(500)
          done()
        })
    })


  })

  describe("DELETE /carts", () => {
    test("Success Delete Cart", (done) => {
      request(app)
        .delete(`/carts/${idOfCart}`)
        .set("Accept", "application/json")
        .set("user_id", user.id)
        .expect("Content-Type", /json/)
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(200);
          expect(body).toHaveProperty("message", "Cart successfully deleted");
          done();
        });
    });

    test("Failed delete cart: cart not found", (done) => {
      request(app)
        .delete(`/carts/${idOfCart}`)
        .send({})
        .set("Accept", "application/json")
        .set("user_id", user.id)
        .expect("Content-Type", /json/)
        .then((res) => {
          const { body, status } = res;
          expect(status).toBe(404);
          expect(body).toHaveProperty("errors");
          expect(body.errors[0]).toBe("Cart not found");
          done();
        });
    });
  });


});
