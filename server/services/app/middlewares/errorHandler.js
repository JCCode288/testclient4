const { sequelize } = require("../models");

module.exports = (err, req, res, next) => {
  console.log(err);
  if (err.name.match(/(jsonwebtoken)/gi)) {
    let message = "You are not authenticated";
    res.status(401).json({ message });
  } else if (err.name.match(/(validation)|(unique)/gi)) {
    let message = err.errors.map((el) => el.message).join("\n");
    res.status(400).json({ message });
  } else if (err.name === "Handled") {
    res.status(err.status).json(err.message);
  } else {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
