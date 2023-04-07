const { ObjectId } = require("mongodb");
const Errors = require("../helpers/Errors");
const Hash = require("../helpers/Hash");
const Token = require("../helpers/Token");
const User = require("../models");

module.exports = class Controller {
  static async login(req, res, next) {
    try {
      let { email, password } = req.body;

      if (!email || !password) {
        throw new Errors(400, "email/password must be filled");
      }

      let user = await User.findOne({ email });
      if (!user) {
        throw new Errors(401, "wrong email/password");
      }

      let valid = Hash.verify(password, user.password);

      if (!valid) {
        throw new Errors(401, "wrong email/password");
      }

      let access_token = Token.create({ id: user.id });

      res.status(200).json({ access_token, username: user.username });
    } catch (err) {
      next(err);
    }
  }
  static async register(req, res, next) {
    try {
      let { email, password, username, phoneNumber, address } = req.body;

      if (!email || !password || !username || !phoneNumber || !address) {
        throw new Errors(400, "all required fields must be filled");
      }

      let user = await User.findOne({ email });

      if (user) {
        throw new Errors(400, "you are already registered");
      }

      let lastUser = await User.findLast();

      let { acknowledged } = await User.create({
        email,
        password,
        username,
        phoneNumber,
        address,
        role: "Admin",
        id: lastUser[0].id + 1,
      });

      if (!acknowledged) {
        throw new Errors(500, "Internal Server Error");
      }

      let access_token = Token.create({ id: lastUser[0].id + 1 });

      res.status(201).json({ access_token, username });
    } catch (err) {
      next(err);
    }
  }
  static async findUser(req, res, next) {
    try {
      let _id = req.params.id;

      let user = await User.findOne({ _id });

      delete user.password;
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }
  static async fetchUsers(req, res, next) {
    try {
      let users = await User.findAll();

      users = users.map((el) => {
        delete el.password;
        return el;
      });

      res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  }

  static async deleteUser(req, res, next) {
    try {
      let _id = req.params.id;

      let user = await User.findOne({ _id });

      if (!user) {
        throw new Errors(404, "user not found!");
      }

      let { acknowledged } = await User.destroy({ _id });

      if (!acknowledged) {
        throw new Errors(400, "failed to delete");
      }

      res.status(200).json({ message: `${user.email} has been deleted` });
    } catch (err) {
      next(err);
    }
  }
};
