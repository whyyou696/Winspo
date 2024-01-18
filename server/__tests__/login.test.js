const app = require("../app");
const request = require("supertest");
const { sequelize, User } = require("../models");
const { describe } = require("sequelize/types/query-types");

let { queryInterface } = sequelize;

afterAll(async () => {
    await queryInterface.bulkDelete("users", null, {
        truncate: true,
        cascade: true,
        restartIdentity: true,
    });
});

const user = {
    email: "baiquni1@gmail.com",
    password: "baiquni123",
};

beforeAll(async () => {
    await User.create(user);
});


describe("Login", () => {
    test("Email is required", async () => {
        const { status, body } = (await request(app).post("/login")).send({password:user.password});
    expect(status).toBe(400);
    expect(body).toHaveProperty("message", "Email is required");
    });

    test("Password is required", async () => {
        const { status, body } = (await request(app).post("/login")).send({email:user.email});
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", "Password is required");
    });

    test("Invalid Email", async () => {
        const { status, body } = await request(app)
        .post("/login")
        .send({
            email: "Invalid@gmail.com",
            password: user.password,
        });
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Invalid email");
    });

    test("Invalid Password", async () => {
        const { status, body } = await request(app)
        .post("/login")
        .send({
            email: user.email,
            password: "InvalidPassword",
        });
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Invalid password");
    });

    test("Success Login", async () => {
        const { status, body } = (await request(app).post("/login")).send(user);
        expect(status).toBe(200);
        expect(body).toHaveProperty("token", expect.any(String));
    });
});