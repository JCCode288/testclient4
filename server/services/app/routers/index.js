const Controller = require("../controllers");
const authentication = require("../middlewares/authentication");
const categoriesRouter = require("./categories");
const productsRouter = require("./products");

const router = require("express").Router();

// router.post("/login", Controller.login);

// router.use(authentication);

// router.post("/register", Controller.register);

router.use("/products", productsRouter);

router.use("/categories", categoriesRouter);

module.exports = router;
