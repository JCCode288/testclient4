const Hash = require("../helpers/Hash");
const User = require("../models");

module.exports = async function seeding() {
  try {
    let users = require("./users.json").map((el) => {
      el.password = Hash.create(el.password);
      return el;
    });

    let created = await User.createMany(users);

    console.log(created);
  } catch (err) {
    console.log(err);
  }
};
