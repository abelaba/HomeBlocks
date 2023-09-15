const app = require("../app");
const { User } = require("../model/User");
const mongoose = require("mongoose");
const request = require("supertest");
const dotenv = require("dotenv");

dotenv.config();

describe("User Registration and Login Tests", () => {
  beforeAll(async () => {
    mongoose.connect(
      process.env.TEST_DB,
      { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
      () => {
        console.log("*** DATABASE HAS CONNECTED SUCCESSFULLY");
      }
    );
    await User.deleteMany(); // Delete all users from the database
  });

  // Test user registration
  it("should register a new user", async () => {
    const response = await request(app).post("/api/user/register").send({
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
      etherAccount: "0xabc1234567890",
    });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("user");
  });

  // Test user login
  it("should login an existing user", async () => {
    const response = await request(app).post("/api/user/login").send({
      email: "john@example.com",
      password: "password123",
    });

    expect(response.statusCode).toBe(200);
    expect(response.header).toHaveProperty("auth-token");
  });

  afterAll(() => mongoose.disconnect());
  // Additional tests can be added based on your requirements
});
