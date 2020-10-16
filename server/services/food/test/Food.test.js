const request = require("supertest");
const app = require("../app");
const { Food } = require("../models");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;

let FoodId;

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
  const addFood = {
    name: "Nasi Padang",
    image_url:
      "https://travel.tribunnews.com/2020/02/24/4-fakta-unik-rumah-makan-padang-ada-lagu-berjudul-nasi-padang",
    price: 18000,
    stock: 10,
    ingredient: "nasi dicampur dengan kaldu ditambah dengan ayam",
    RestaurantId: 1,
  };

  // SUCCESS CRUD FOOD

  it("Success add Food, return json with foods data", (done) => {
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

  it("Success show all Food", (done) => {
    request(app)
      .get("/foods")
      .then((res) => {
        const { body, status } = res;
        expect(status).toBe(200);
        expect(res).toHaveProperty("body", expect.any(Object));
        done();
      });
  });

  it("Success show food by id", (done) => {
    request(app)
      .get(`/foods/${FoodId}`)
      .then((res) => {
        const { body, status } = res;
        //   console.log(res, "<<<<<");
        expect(status).toBe(200);
        expect(res).toHaveProperty("body", expect.any(Object));
        done();
      });
  });

  it("Success update Food, return json with foods data", (done) => {
    request(app)
      .put(`/foods/${FoodId}`)
      .send({
        name: "Nasi Padang",
        image_url:
          "https://travel.tribunnews.com/2020/02/24/4-fakta-unik-rumah-makan-padang-ada-lagu-berjudul-nasi-padang",
        price: 9000,
        stock: 5,
        ingredient: "nasi dicampur dengan kaldu ditambah dengan ayam",
        RestaurantId: 1,
      })
      .then((res) => {
        const { body, status } = res;
        FoodId = body.id;
        expect(status).toBe(200);
        expect(res).toHaveProperty("body", expect.any(Object));
        done();
      });
  });

  it("Success delete food by id", (done) => {
    request(app)
      .delete(`/foods/${FoodId}`)
      .then((res) => {
        const { body, status } = res;
        //   console.log(res, "<<<<<");
        expect(status).toBe(200);
        expect(res).toHaveProperty("body", expect.any(Object));
        done();
      });
  });

  // FAILED CRUD FOOD

  // CREATE
  const emptyFood = {
    name: "",
    image_url: "",
    price: "",
    stock: "",
    ingredient: "",
  };

  const emptyAddFoodMsg = [
    "Name must be filled!",
    "Image must be filled!",
    "Please insert a valid url!",
    "Price must be in numeric format!",
    "Price must be filled!",
    "Stock must be in numeric format!",
    "Stock must be filled!",
    "Ingredient must be filled!",
  ];

  it("Failed add Food because field is empty", (done) => {
    request(app)
      .post("/foods")
      .send(emptyFood)
      .then((res) => {
        const { body, status } = res;
        expect(status).toBe(400);
        expect(body).toHaveProperty("errors", emptyAddFoodMsg);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  const minusPrice = ["Price must be greater than or equals to 0"];

  it("Fail add food because price is negative number", (done) => {
    request(app)
      .post("/foods")
      .send({
        name: "Nasi Padang",
        image_url:
          "https://travel.tribunnews.com/2020/02/24/4-fakta-unik-rumah-makan-padang-ada-lagu-berjudul-nasi-padang",
        price: -10,
        stock: 10,
        ingredient: "nasi dicampur dengan kaldu ditambah dengan ayam",
        RestaurantId: 1,
      })
      .then((res) => {
        const { body, status } = res;
        expect(status).toBe(400);
        expect(body).toHaveProperty("errors", minusPrice);
        done();
      });
  });

  const minusStock = ["Stock must be greater than or equals to 0"];

  it("Fail add food because stock is negative number", (done) => {
    request(app)
      .post("/foods")
      .send({
        name: "Nasi Padang",
        image_url:
          "https://travel.tribunnews.com/2020/02/24/4-fakta-unik-rumah-makan-padang-ada-lagu-berjudul-nasi-padang",
        price: 10,
        stock: -10,
        ingredient: "nasi dicampur dengan kaldu ditambah dengan ayam",
        RestaurantId: 1,
      })
      .then((res) => {
        const { body, status } = res;
        expect(status).toBe(400);
        expect(body).toHaveProperty("errors", minusStock);
        done();
      });
  });

  const invalidDataType = {
    name: "Nasi Padang",
    image_url: "url",
    price: "mahal",
    stock: "habis",
    ingredient: "nasi dicampur dengan kaldu ditambah dengan ayam",
    RestaurantId: 1,
  };

  const invalidMsg = [
    "Please insert a valid url!",
    "Price must be in numeric format!",
    "Stock must be in numeric format!",
  ];

  it("Fail add food because invalid data type", (done) => {
    request(app)
      .post("/foods")
      .send(invalidDataType)
      .then((res) => {
        const { body, status } = res;
        expect(status).toBe(400);
        expect(body).toHaveProperty("errors", invalidMsg);
        done();
      });
  });

  // UPDATE

  const minusUpdatePrice = {
    name: "Nasi Padang",
    image_url:
      "https://travel.tribunnews.com/2020/02/24/4-fakta-unik-rumah-makan-padang-ada-lagu-berjudul-nasi-padang",
    price: -10,
    stock: 10,
    ingredient: "nasi dicampur dengan kaldu ditambah dengan ayam",
    RestaurantId: 1,
  };

  const minusPriceMsg = ["Price must be greater than or equals to 0"];

  it("Fail add food because price is negative number", (done) => {
    request(app)
      .put(`/foods/${FoodId}`)
      .send(minusUpdatePrice)
      .then((res) => {
        const { body, status } = res;
        console.log(body, ">>>>> body");
        expect(status).toBe(400);
        expect(body).toHaveProperty("errors", minusPriceMsg);
        done();
      });
  });

  const minusUpdateStock = {
    name: "Nasi Padang",
    image_url:
      "https://travel.tribunnews.com/2020/02/24/4-fakta-unik-rumah-makan-padang-ada-lagu-berjudul-nasi-padang",
    price: 10,
    stock: -10,
    ingredient: "nasi dicampur dengan kaldu ditambah dengan ayam",
    RestaurantId: 1,
  };

  const minusStockMsg = ["Stock must be greater than or equals to 0"];

  it("Fail add food because stock is negative number", (done) => {
    request(app)
      .put(`/foods/${FoodId}`)
      .send(minusUpdateStock)
      .then((res) => {
        const { body, status } = res;
        console.log(body, ">>>>> body");
        expect(status).toBe(400);
        expect(body).toHaveProperty("errors", minusStockMsg);
        done();
      });
  });

  const invalidDataTypeUpdate = {
    name: "Nasi Padang",
    image_url: "url",
    price: "mahal",
    stock: "habis",
    ingredient: "nasi dicampur dengan kaldu ditambah dengan ayam",
    RestaurantId: 1,
  };

  const invalidMsgUpdate = [
    "Please insert a valid url!",
    "Price must be in numeric format!",
    "Stock must be in numeric format!",
  ];

  it("Fail add food because invalid data type", (done) => {
    request(app)
      .put(`/foods/${FoodId}`)
      .send(invalidDataTypeUpdate)
      .then((res) => {
        const { body, status } = res;
        expect(status).toBe(400);
        expect(body).toHaveProperty("errors", invalidMsgUpdate);
        done();
      });
  });
});
