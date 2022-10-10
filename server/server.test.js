const app = require("./index.js");
const request = require("supertest");

describe("Encompass app server test", () => {
  it("should make get request to /", async () => {
    let result = await request(app).get("/test").expect(200);
  });
});
