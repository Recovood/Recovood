const request = require("supertest");
const app = require("../app.js");
const { sequelize, User, Food } = require("../models");
const { queryInterface } = sequelize;

let user;
let idOfCart;
let food;

beforeAll(async (done) => {
  const carts = {
    FoodId: 1,
    quantity: 20,
    status: "waiting for payment",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  food = await Food.create({
    name: "Nasi Padang",
    image_url:
      "https://travel.tribunnews.com/2020/02/24/4-fakta-unik-rumah-makan-padang-ada-lagu-berjudul-nasi-padang",
    price: 18000,
    stock: 10,
    ingredient: "nasi dicampur dengan kaldu ditambah dengan ayam",
    RestaurantId: 1,
  });

  user = await User.create({
    username: "user",
    email: "user@mail.com",
    password: "userganteng",
    role: "customer",
  });

  queryInterface
    .bulkInsert("Carts", [carts], {})
    .then(() => {
      request(app)
        .post("/carts")
        .send({
          FoodId: 1,
          quantity: 20,
          status: "waiting for payment",
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .then((res) => {
          return (idOfCart = res.body.id);
        });
    })
    .then(() => {
      done();
    });
});

afterAll((done) => {
  queryInterface.bulkDelete("Carts", null, {}).then(() => done());
  queryInterface.bulkDelete("Users", null, {}).then(() => done());
  queryInterface.bulkDelete("Food", null, {}).then(() => done());
});

describe("MODEL Cart", () => {
  test("Success Create Cart", (done) => {
    // console.log(food, ">>>> food");
    request(app)
      .post("/carts")
      .send({
        FoodId: 1,
        quantity: 20,
        status: "waiting for payment",
      })
      .set("Accept", "application/json")
      .set("user_id", user.id)
      .expect("Content-Type", /json/)
      .then((response) => {
        const { body, status } = response;
        // console.log(body, ">>> body add");
        idOfCart = body.id;
        idOfFood = body.FoodId;
        expect(status).toBe(201);
        // expect(response).toHaveProperty("body", expect.any(Object));
        expect(body).toHaveProperty("id");
        expect(body).toHaveProperty("FoodId", 1);
        expect(body).toHaveProperty("quantity", 20);
        expect(body).toHaveProperty("status", "waiting for payment");
        done();
      });
  });

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

  test("Success update quantity", (done) => {
    request(app)
      .patch(`/carts/${idOfCart}`)
      .send({
        quantity: 10,
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
        expect(body).toHaveProperty("FoodId", 1);
        expect(body).toHaveProperty("quantity", 10);
        expect(body).toHaveProperty("status", "waiting for payment");
        done();
      });
  });

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

  // test("Success Checkout Cart", (done) => {
  //   request(app)
  //     .patch(`/checkout`)
  //     .set("Accept", "application/json")
  //     .set("user_id", user.id)
  //     .expect("Content-Type", /json/)
  //     .then((response) => {
  //       const { body, status } = response;
  //       console.log(body, ">>>> body");
  //     })
  //     .catch((err) => {
  //       console.log(err, "<<<<<<<ini error di checkout tes");
  //     });
  // });

  // Failed

  test("Failed add cart: quantity is empty", (done) => {
    request(app)
      .post("/carts")
      .send({
        FoodId: 1,
        quantity: "",
        status: "waiting for payment",
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
        FoodId: 1,
        quantity: -10,
        status: "waiting for payment",
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

  test("Failed update cart: cart not found", (done) => {
    request(app)
      .patch(`/carts/${2}`)
      .send({})
      .set("Accept", "application/json")
      .set("user_id", user.id)
      .expect("Content-Type", /json/)
      .then((response) => {
        // console.log(response.body, "<<<<< response");
        const { body, status } = response;
        console.log(body, "body from update failed");
        expect(status).toBe(404);
        expect(response).toHaveProperty("body", expect.any(Object));
        // expect(body).toHaveProperty("errors");
        // expect(body.errors[0]).toBe("Cart not found");
        done();
      });
  });

  test("Success update quantity", (done) => {
    request(app)
      .patch(`/carts/${idOfCart}`)
      .send({
        quantity: 10,
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
        expect(body).toHaveProperty("FoodId", 1);
        expect(body).toHaveProperty("quantity", 10);
        expect(body).toHaveProperty("status", "waiting for payment");
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

  test("Failed add cart: quantity greater than stock", (done) => {
    request(app)
      .post("/carts")
      .send({
        FoodId: food.id,
        quantity: 100,
        status: "waiting for payment",
      })
      .set("Accept", "application/json")
      .set("user_id", user.id)
      .expect("Content-Type", /json/)
      .then((res) => {
        // console.log(res.body, "<<<<< res");
        const { body, status } = res;
        expect(status).toBe(400);
        expect(body).toHaveProperty("errors");
        expect(body.errors[0]).toBe("Not enough food");
        done();
      });
  });
});
