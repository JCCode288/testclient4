const Controller = require("../controllers");

const router = require("express").Router();

router.post("/login", Controller.login);
router.post("/register", Controller.register);
router.get("/users", Controller.fetchUsers);
router.get("/users/:id", Controller.findUser);
router.delete("/users/:id", Controller.deleteUser);

module.exports = router;
