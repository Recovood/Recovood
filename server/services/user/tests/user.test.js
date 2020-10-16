const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;

afterAll( async (done) => {
  try {
    await queryInterface.bulkDelete("Users", {});
    done();
  } catch(err) {
    done(err);
  }
});

describe("User Endpoints Tests", () => {

  const userRegister = {
    username: "admin",
    email: "admin@mail.com",
    password: "adminganteng",
    role: "admin"
  };

  const emptyUserRegister = {
    username: "",
    email: "",
    password: "",
    role: ""
  }

  const uniqueEmailMsg = [
    "Email has already been registered!"
  ];

  const missingValueMsg = [
    "Username cannot be left blank!",
    "Please insert a valid email!",
    "Email cannot be left blank!",
    "password must be between 8 to 15 characters!",
    "Password cannot be left blank!",
    "Role cannot be left blank!"
  ]

  describe("POST /register", () => {

    test("201:Created, return json with access_token, email, and role", (done) => {
      request(app)
      .post("/register")
      .send(userRegister)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(201);
        expect(body).toHaveProperty("access_token", expect.any(String));
        expect(body).toHaveProperty("email", userRegister.email);
        expect(body).toHaveProperty("role", userRegister.role);
        done();
      })
      .catch((err) => {
        done(err);
      });
    });

    test("400:Unique email error validations, return json with error messages", (done) => {
      request(app)
      .post("/register")
      .send(userRegister)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(400);
        expect(body).toHaveProperty("errors", uniqueEmailMsg);
        done();
      })
      .catch((err) => {
        done(err);
      });
    });

    test("400:Empty field, return json with error messages", (done) => {
      request(app)
      .post("/register")
      .send(emptyUserRegister)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(400);
        expect(body).toHaveProperty("errors", missingValueMsg);
        done();
      })
      .catch((err) => {
        done(err);
      })
    })

  });

  const userLogin = {
    email: "admin@mail.com",
    password: "adminganteng"
  };

  const invalidPassword = {
    email: "admin@mail.com",
    password: "adminkardus"
  };

  const invalidPasswordEmailMsg = [
    "Invalid email or password"
  ];

  const invalidEmail = {
    email: "customer@mail.com",
    password: "adminganteng"
  };

  const emptyUserLogin = {
    email: "",
    password: ""
  };

  describe("POST /login", () => {
    test("200:OK, return json with registered user's data", (done) => {
      request(app)
      .post("/login")
      .send(userLogin)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .then((response) => {
        const { body, status } = response;
        console.log(body, "<<<< ini body");
        expect(status).toBe(200);
        expect(body).toHaveProperty("access_token", expect.any(String));
        expect(body).toHaveProperty("email", userRegister.email);
        expect(body).toHaveProperty("role", userRegister.role);
        done();
      })
      .catch((err) => {
        done(err);
      });
    });
    
    test("400:Invalid password, return json with error messages", (done) => {
      request(app)
      .post("/login")
      .send(invalidPassword)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(400);
        expect(body).toHaveProperty("errors", invalidPasswordEmailMsg);
        done();
      })
      .catch((err) => {
        done(err);
      });
    });

    test("400:Invalid Email, return json with error messages", (done) => {
      request(app)
      .post("/login")
      .send(invalidEmail)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(400);
        expect(body).toHaveProperty("errors", invalidPasswordEmailMsg);
        done();
      })
      .catch((err) => {
        done(err);
      });
    });

    test("400:Empty email and password, return json with error messages", (done) => {
      request(app)
      .post("/login")
      .send(emptyUserLogin)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(400);
        expect(body).toHaveProperty("errors", invalidPasswordEmailMsg);
        done();
      })
      .catch((err) => {
        done(err);
      });
    });
  });
});