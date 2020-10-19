const request = require("supertest");
const app = require("../app.js");

let user;

beforeAll(async (done) => {
  user = await User.create({
    username: "user",
    email: "user@mail.com",
    password: "userganteng",
    role: "customer",
  });
});

describe("MODEL Cart", () => {
  // test("Hello Cart", (done) => {
  //   request(app)
  //     .get("/")
  //     .set("Accept", "application/json")
  //     // .expect("Content-Type", /json/)
  //     .then(response => {
  //       const { body, status } = response
  //       expect(body).toBe("Cart API")
  //     })
  // })
  test("Create Cart", (done) => {
    request(app)
      .post("/")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .then((response) => {
        const { body, status } = response;
      });
  });
});
