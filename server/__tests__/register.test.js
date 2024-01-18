const app = require('../app');
const request = require('supertest');
const { sequelize, User } = require('../models');
let { queryInterface } = sequelize;
const { sign } = require('jsonwebtoken');
const { describe } = require("sequelize/types/query-types");

const user1 = {
     
    email: "user1@gmail.com",
    password: "user1"
};

const user2 = {
     
    email: "user2@gmail.com",
    password: "user2"
};

afterAll(async () => {
    await queryInterface.bulkDelete('Users', null, {
        truncate: true,
        cascade: true,
        restartIdentity: true
    });
});

beforeAll(async () => {
    let user = await User.create(user1);
    token = sign({ id: user.id }, process.env.JWT_SECRET);
});

describe("/register", () => {
   
    test("Success add user", async () => {
        const { status, body } = await request(app)
            .post('/register')
            .send(user2);

        expect(status).toBe(201);
        expect(body).toHaveProperty("id", expect.any(Number));
        expect(body).toHaveProperty("email", "user2@gmail.com");
    });


    test("Email not provided", async () => {
        const { status, body } = await request(app)
            .post('/register')
            .send({
                password: user2.password
            });

        expect(status).toBe(400);
        expect(body).toHaveProperty("message", "Email is required");
    });

    test("Password not provided", async () => {
        const { status, body } = await request(app)
            .post('/register')
            .send({
                email: user2.email
            });

        expect(status).toBe(400);
        expect(body).toHaveProperty("message", "Password is required");
    });

    test("Email empty", async () => {
        const { status, body } = await request(app)
            .post('/register')
            .send({
                email: "",
                password: user2.password
            });

        expect(status).toBe(400);
        expect(body).toHaveProperty("message", "Email is required");
    });

    test("Password empty", async () => {
        const { status, body } = await request(app)
            .post('/register')
            .send({
                email: user2.email,
                password: ""
            });

        expect(status).toBe(400);
        expect(body).toHaveProperty("message", "Password is required");
    });


    test("Email already registered", async () => {
        const { status, body } = await request(app)
            .post('/register')
            .send(user1);
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", "Email is already registered");
   
    });
});
