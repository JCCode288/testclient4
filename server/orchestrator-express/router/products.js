const productsRouter = require("express").Router();
const AppController = require("../controllers/AppController");

productsRouter.get("/", AppController.getProducts);
productsRouter.get("/:id", AppController.getProduct);

module.exports = productsRouter;
