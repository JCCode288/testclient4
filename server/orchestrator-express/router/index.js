const Controller = require("../controllers");
const categoriesRouter = require("./categories");
const productsRouter = require("./products");
const router = require("express").Router();

router.post("/login", Controller.login);
// router.get("/users", Controller.fetchUsers);
router.post("/register", Controller.register);

router.use("/categories", categoriesRouter);
router.use("/products", productsRouter);

module.exports = router;
