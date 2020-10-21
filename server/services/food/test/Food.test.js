const request = require("supertest");
const app = require("../app");
const { sequelize, User, Restaurant } = require("../models");
const { queryInterface } = sequelize;

let FoodId;
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
  done();
});

afterAll((done) => {
  queryInterface.bulkDelete("Food", null, {}).then(() => done());
  queryInterface.bulkDelete("Restaurants", null, {}).then(() => done());
  queryInterface.bulkDelete("Users", null, {}).then(() => done());
});

describe("Food Endpoint Test", () => {
  // SUCCESS CRUD FOOD

  test("Success add Food, return json with foods data", (done) => {
    // console.log(user, ">>>>>>>>>> userADDfood");
    // console.log(restaurants, ">>>>>>>>>> restaurantsADDfood");

    request(app)
      .post("/foods")
      .send({
        name: "Nasi Padang",
        image_url:
          "https://travel.tribunnews.com/2020/02/24/4-fakta-unik-rumah-makan-padang-ada-lagu-berjudul-nasi-padang",
        price: 18000,
        stock: 10,
        ingredient: "nasi dicampur dengan kaldu ditambah dengan ayam",
        RestaurantId: restaurants.id,
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
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
        RestaurantId: restaurants.id,
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
        RestaurantId: restaurants.id,
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
        RestaurantId: restaurants.id,
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

  it("Fail update food because price is negative number", (done) => {
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

  it("Fail update food because stock is negative number", (done) => {
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

  it("Fail delete food because invalid data type", (done) => {
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
