const Errors = require("../helpers/Errors");
const Hash = require("../helpers/Hash");
const Token = require("../helpers/Token");
const { User, Product, Category, Image } = require("../models");

module.exports = class Controller {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw new Errors(400, "email/password must be filled");
      }

      let user = await User.findOne({ where: { email } });

      if (!user && user.role !== "Admin") {
        throw new Errors(401, "Invalid email/password");
      }

      let valid = Hash.verify(password, user.password);

      if (!valid) {
        throw new Errors(401, "Invalid email/password");
      }

      let access_token = Token.create({ id: user.id, email: user.email });

      res.status(200).json({ access_token, username: user.username });
    } catch (err) {
      next(err);
    }
  }

  static async register(req, res, next) {
    try {
      let { email, password, username, phoneNumber, address } = req.body;

      if (!email || !password) {
        throw new Errors(400, "email/password must be filled");
      }

      let [user, created] = await User.findOrCreate({
        where: { email },
        defaults: {
          email,
          password,
          username,
          phoneNumber,
          address,
          role: "Admin",
        },
      });

      if (!created) {
        throw new Errors(400, "you are already registered");
      }

      res.status(201).json({ message: `Registering ${user.email} Success!` });
    } catch (err) {
      next(err);
    }
  }

  static async googleLogin(req, res, next) {
    try {
      //google login here
    } catch (err) {
      next(err);
    }
  }
};
