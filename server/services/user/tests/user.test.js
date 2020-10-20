const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;
const { generateToken } = require("../helpers/jwt");

let access_token;

afterAll(async (done) => {
  try {
    await queryInterface.bulkDelete("Users", {});
    done();
  } catch (err) {
    done(err);
  }
});

describe("User Endpoints Tests", () => {
  const userRegister = {
    username: "admin",
    email: "admin@mail.com",
    password: "adminganteng",
    role: "admin",
  };

  const emptyUserRegister = {
    username: "",
    email: "",
    password: "",
    role: "",
  };

  const uniqueEmailMsg = ["Email has already been registered!"];

  const missingValueMsg = [
    "Username cannot be left blank!",
    "Please insert a valid email!",
    "Email cannot be left blank!",
    "password must be between 8 to 15 characters!",
    "Password cannot be left blank!",
    "Role cannot be left blank!",
  ];

  describe("Get show home", () => {
    test("200: Success show home", (done) => {
      request(app)
        .get("/")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(200);
          expect(body).toHaveProperty("message");
          expect(body.message[0]).toBe("R");
          done();
        });
    });
  });

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
        });
    });
  });

  const userLogin = {
    email: "admin@mail.com",
    password: "adminganteng",
  };

  const invalidPassword = {
    email: "admin@mail.com",
    password: "adminkardus",
  };

  const invalidPasswordEmailMsg = ["Invalid email or password"];

  const invalidEmail = {
    email: "customer@mail.com",
    password: "adminganteng",
  };

  const emptyUserLogin = {
    email: "",
    password: "",
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
          // console.log(body, "<<<< ini body login post");
          access_token = body.access_token;
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

  const userAuth = {
    email: "admin@mail.com",
    password: "adminganteng",
  };

  const fakeUser = {
    email: "fake@mail.com",
    password: "fakeuser",
  };

  const userNotAuthenMsg = ["User is not authenticated"];

  describe("POST /authentication", () => {
    test("200:OK, user authentication", (done) => {
      request(app)
        .post("/authentication")
        .send(userAuth)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .set("access_token", access_token)
        .then((response) => {
          const { body, status } = response;
          // console.log(body, "<<<< ini body di authen post");
          expect(status).toBe(200);
          expect(response).toHaveProperty("body", expect.any(Object));
          // expect(body).toHaveProperty("email", userAuth.email);
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    test("401:Failed, user not authentication", (done) => {
      request(app)
        .post("/authentication")
        .send(userAuth)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .set("access_token", generateToken(fakeUser))
        .then((response) => {
          const { body, status } = response;
          // console.log(body, "<<<< ini body di authen post");
          expect(status).toBe(401);
          expect(body).toHaveProperty("errors", userNotAuthenMsg);
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    test("401:Failed, without access_token", (done) => {
      request(app)
        .post("/authentication")
        .send(userAuth)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(401);
          // expect(response).toHaveProperty("body", expect.any(Object));
          expect(body).toHaveProperty("errors", userNotAuthenMsg);
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    test("401:Failed, without req body and access_token", (done) => {
      request(app)
        .post("/authentication")
        // .send(userAuth)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .then((response) => {
          const { body, status } = response;
          console.log(body, "<<<< ini body di authen post");
          expect(status).toBe(401);
          expect(response).toHaveProperty("body", expect.any(Object));
          // expect(body).toHaveProperty("errors", userNotAuthenMsg);
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });

  // describe('POST /googleLogin', () => {
  //   test('200: Success login with google login', (done) => {

  //   })

  // })
});
