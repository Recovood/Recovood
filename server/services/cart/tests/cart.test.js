const request = require("supertest")
const app = require("../app.js")

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
      .then(response => {
        const { body, status } = response
      })
  })
})