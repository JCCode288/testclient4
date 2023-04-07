const Errors = require("../helpers/Errors");
const Token = require("../helpers/Token");
const { User } = require("../models");

module.exports = async (req, res, next) => {
  try {
    let access_token = req.headers.access_token;
    if (!access_token) {
      throw new Errors(401, "Unauthenticated");
    }

    let { id, email } = Token.verify(access_token);

    let user = await User.findByPk(id, {
      attributes: {
        exclude: ["password"],
      },
    });

    if (!user || user.role !== "Admin") {
      throw new Errors(401, "Unauthenticated");
    }

    req.user = user;

    next();
  } catch (err) {
    next(err);
  }
};
