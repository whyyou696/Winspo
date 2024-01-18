const { User } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { OAuth2Client } = require("google-auth-library");

module.exports = class UserController {
  static async register(req, res, next) {
    try {
      let { email, password } = req.body;
      const userCreate = await User.create({
        email,
        password,
      });
      res.status(201).json({
        id: userCreate.id,
        email: userCreate.email,
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      console.log(req.body);
      let { email, password } = req.body;
      if (!email || !password) {
        throw { name: "ValidationError" };
      }

      //cek apakah user ada di database
      let user = await User.findOne({ where: { email } });
      if (!user) {
        throw { name: "InvalidUser" };
      }

      //cek apakah password benar
      let isPasswordValid = comparePassword(password, user.password);
      if (!isPasswordValid) {
        throw { name: "InvalidUser" };
      }
      //generate token
      let access_token = signToken({ id: user.id });
      console.log(access_token);

      //kirim response token ke client
      res.status(200).json({ access_token });
    } catch (error) {
      //   console.log(error);
      //   if (error.name === "ValidationError") {
      //     res.status(400).json({ message: "Email and Password is Required" });
      //   } else if (error.name === "InvalidUser") {
      //     res.status(401).json({ message: "Invalid Email or Password" });
      //   } else {
      //     res.status(500).json({ message: "Internal Server Error" });
      //   }
      next(error);
    }
  }
  static async googleLogin(req, res, next) {
    const token = req.headers["google-token"];
    const client = new OAuth2Client();

    try {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      const email = payload.email;
      console.log({ email });

      let user = await User.findOne({
        where: { email },
      });
      console.log("user found", !!user);

      if (!user) {
        console.log("create");
        user = await User.create(
          {
            username: payload.name,
            email,
            password: "caem" + Date.now(),
          },
          {
            hooks: false,
          }
        );
      }

      const access_token = signToken({ id: user.id });

      res.status(200).json({ access_token });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
};
