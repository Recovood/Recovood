const app = require("../app");
const { sequelize, User } = require("../models");
const { queryInterface } = sequelize;
const request = require("supertest");

let idOfRestaurant;

let user;

beforeAll(async (done) => {
  const restaurants = {
    name: "Ayam Bu Vesti",
    address: "Jl. Pangeran Antasari, No.11",
    image_url: "www.image.com",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  user = await User.create({
    username: "admin",
    email: "admin@mail.com",
    password: "adminganteng",
    role: "admin",
  });

  queryInterface
    .bulkInsert("Restaurants", [restaurants], {})
    .then(() => {
      request(app)
        .post("/restaurants")
        .send({
          name: "Ayam Bu Vesti",
          address: "Jl. Pangeran Antasari, No.11",
          image_url: "www.image.com",
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .then((res) => {
          return (idOfRestaurant = res.body.id);
        });
    })
    .then(() => {
      done();
    });
});

afterAll((done) => {
  queryInterface.bulkDelete("Restaurants", null, {}).then(() => done());
  queryInterface.bulkDelete("Users", null, {}).then(() => done());
});

describe("Model Restaurant", () => {
  test("Successfully add product to database", (done) => {
    console.log(user, "<<<<<<<<<<<<<<<<<<<<<<< user");
    request(app)
      .post("/restaurants")
      .send({
        name: "Ayam Bu Vesti",
        address: "Jl. Pangeran Antasari, No.11",
        image_url: "www.image.com",
      })
      .set("Accept", "application/json")
      .set("user_id", user.id)
      .expect("Content-Type", /json/)
      .then((res) => {
        const { body, status } = res;
        // console.log(body, ">>> ini body addResto");
        idOfRestaurant = body.id;
        expect(status).toBe(201);
        expect(body).toHaveProperty("id");
        expect(body).toHaveProperty("name", "Ayam Bu Vesti");
        expect(body).toHaveProperty("address", "Jl. Pangeran Antasari, No.11");
        expect(body).toHaveProperty("image_url", "www.image.com");
        done();
      })
      .catch((err) => {
        console.log(err, "<<<<<<<<<<<<<<<<<<<< errornya");
      });
    // console.log(response, "<<<<<<<<<<<<<<<<<<<<<<< response");
  });

  test("Sucessfully read all restaurants", (done) => {
    request(app)
      .get("/restaurants")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .then((res) => {
        const { body, status } = res;
        expect(status).toBe(200);
        expect(body).toHaveProperty("restaurants");
        done();
      });
  });

  // console.log(idOfRestaurant, ">>>> id restaurant");
  test("Successfully read a restaurant", (done) => {
    request(app)
      .get(`/restaurants/${idOfRestaurant}`)
      .set("Accept", "application/json")
      .set("user_id", user.id)
      .expect("Content-Type", /json/)
      .then((res) => {
        const { body, status } = res;
        expect(status).toBe(200);
        expect(body).toHaveProperty("id");
        expect(body).toHaveProperty("name", "Ayam Bu Vesti");
        expect(body).toHaveProperty("address", "Jl. Pangeran Antasari, No.11");
        expect(body).toHaveProperty("image_url", "www.image.com");
        done();
      })
      .catch((err) => {
        console.log(err, ">>> error di read restaurants");
      });
  });

  test("Sucessfully update a restaurant", (done) => {
    request(app)
      .put(`/restaurants/${idOfRestaurant}`)
      .send({
        name: "Ayam Bu Vesti",
        address: "Jl. Pangeran Antasari, No.12",
        image_url: "www.image.com",
      })
      .set("Accept", "application/json")
      .then((res) => {
        const { body, status } = res;
        // expect(status).toBe(200)
        expect(body).toHaveProperty("id");
        expect(body).toHaveProperty("name", "Ayam Bu Vesti");
        expect(body).toHaveProperty("address", "Jl. Pangeran Antasari, No.12");
        expect(body).toHaveProperty("image_url", "www.image.com");
        done();
      });
  });

  test("Sucessfully delete a restaurant", (done) => {
    request(app)
      .delete(`/restaurants/${idOfRestaurant}`)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .then((res) => {
        const { body, status } = res;
        expect(status).toBe(200);
        expect(body).toHaveProperty(
          "message",
          "Restaurant successfully deleted"
        );
        // expect(body.restaurant).toBe(1);
        done();
      });
  });

  test("Failed Add: name field is null", (done) => {
    request(app)
      .post("/restaurants")
      .send({
        name: "",
        address: "Jl. Pangeran Antasari, No.11",
        image_url: "www.image.com",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .then((res) => {
        const { body, status } = res;
        expect(status).toBe(400);
        expect(body).toHaveProperty("errors");
        expect(body.errors[0]).toBe("name required");
        done();
      });
  });

  test("Failed Add: address field is null", (done) => {
    request(app)
      .post("/restaurants")
      .send({
        name: "Ayam Bu Vesti",
        address: "",
        image_url: "www.image.com",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .then((res) => {
        const { body, status } = res;
        expect(status).toBe(400);
        expect(body).toHaveProperty("errors");
        expect(body.errors[0]).toBe("address required");
        done();
      });
  });

  test("Failed Read: restaurant not found", (done) => {
    request(app)
      .get(`/restaurants/${2}`)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .then((res) => {
        const { body, status } = res;
        expect(status).toBe(404);
        expect(body).toHaveProperty("errors");
        expect(body.errors[0]).toBe("restaurant not found");
        done();
      });
  });

  test("Failed Updata: name field is null", (done) => {
    request(app)
      .put(`/restaurants/${idOfRestaurant}`)
      .send({
        name: "",
        address: "Jl. Pangeran Antasari, No.12",
        image_url: "www.image.com",
      })
      .set("Accept", "application/json")
      .then((res) => {
        const { body, status } = res;
        expect(status).toBe(400);
        expect(body).toHaveProperty("errors");
        expect(body.errors[0]).toBe("name required");
        done();
      });
  });

  test("Failed Update: address field is null", (done) => {
    request(app)
      .put(`/restaurants/${idOfRestaurant}`)
      .send({
        name: "Ayam Bu Vesti",
        address: "",
        image_url: "www.image.com",
      })
      .set("Accept", "application/json")
      .then((res) => {
        const { body, status } = res;
        expect(status).toBe(400);
        expect(body).toHaveProperty("errors");
        expect(body.errors[0]).toBe("address required");
        done();
      });
  });
});
