const jwt = require("jsonwebtoken");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const secret = process.env.SECRET;

module.exports = class Token {
  static create(payload) {
    return jwt.sign(payload, secret);
  }
  static verify(token) {
    return jwt.verify(token, secret);
  }
};
