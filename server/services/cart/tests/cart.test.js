const request = require("supertest");
const app = require("../app.js");
const { sequelize, User } = require("../models");
const { queryInterface } = sequelize;

let user;
let idOfCart;

beforeAll(async (done) => {
  const carts = {
    FoodId: 1,
    quantity: 20,
    status: "waiting for payment",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

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
});

console.log(user, ">>> user di cart");

describe("MODEL Cart", () => {
  test("Success Create Cart", (done) => {
    request(app)
      .post("/carts")
      .send({})
      .set("Accept", "application/json")
      .set("user_id", user.id)
      .expect("Content-Type", /json/)
      .then((response) => {
        const { body, status } = response;
        idOfCart = body.id;
        expect(status).toBe(201);
        expect(response).toHaveProperty("body", expect.any(Object));
        done();
      });
  });
});
