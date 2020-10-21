const request = require("supertest");
const app = require("../app.js");
const { sequelize, User, Food, Restaurant } = require("../models");
const { queryInterface } = sequelize;

let food;
let idOfCart;
let restaurants;
let user;

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
  done();
});

afterAll((done) => {
  queryInterface.bulkDelete("Users", null, {}).then(() => done());
  queryInterface.bulkDelete("Restaurants", null, {}).then(() => done());
  queryInterface.bulkDelete("Food", null, {}).then(() => done());
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
          status: "Waiting for Payment",
        })
        .set("Accept", "application/json")
        .set("user_id", user.id)
        .expect("Content-Type", /json/)
        .then((response) => {
          const { body, status } = response;
          idOfCart = body.id;
          // idOfFood = body.FoodId;
          expect(status).toBe(201);
          // expect(response).toHaveProperty("body", expect.any(Object));
          expect(body).toHaveProperty("id");
          expect(body).toHaveProperty("FoodId", food.id);
          expect(body).toHaveProperty("quantity", 1);
          expect(body).toHaveProperty("status", "Waiting for Payment");
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
          FoodId: food.id,
          quantity: "",
          status: "Waiting for Payment",
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
          status: "Waiting for Payment",
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
          status: "Waiting for Payment",
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
  });

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

  // describe("PATCH /checkout", () => {
  //   console.log("masuk di patch checkout");
  //   test("200: Success", (done) => {
  //     request(app)
  //       .patch("/chcekout")
  //       .set("Accept", "application/json")
  //       .set("user_id", user.id)
  //       .expect("Content-Type", /json/)
  //       .then((res) => {
  //         const { body, status } = res;
  //         console.log(res, ">>>>>> ini patch checkout");
  //         done();
  //       })
  //       .catch((err) => {
  //         done(err);
  //       });
  //   });
  // });
});
