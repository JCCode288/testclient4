const categoriesRouter = require("express").Router();
const AppController = require("../controllers/AppController");

categoriesRouter.get("/", AppController.getCategories);
categoriesRouter.get("/:id", AppController.getCategory);

module.exports = categoriesRouter;
