const request = require("supertest");
const app = require("../app");
const { Food } = require("../models");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;

afterAll((done) => {
  queryInterface
    .bulkDelete("Food", null, {})
    .then(() => {
      done();
    })
    .catch((err) => {
      done(err);
    });
});

describe("Food Endpoint Test", () => {
  describe("POST /foods", () => {
    const addFood = {
      name: "Nasi Padang",
      image_url:
        "https://travel.tribunnews.com/2020/02/24/4-fakta-unik-rumah-makan-padang-ada-lagu-berjudul-nasi-padang",
      price: 18000,
      stock: 10,
      ingredient: "nasi dicampur dengan kaldu ditambah dengan ayam",
      RestaurantId: 1,
    };

    test("Succes create Food, return json with foods data", (done) => {
      request(app)
        .post("/foods")
        .send(addFood)
        .then((res) => {
          const { body, status } = res;
          FoodId = body.id;
          expect(status).toBe(201);
          expect(res).toHaveProperty("body", expect.any(Object));
          done();
        });
    });
  });
});
