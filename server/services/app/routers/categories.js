const CategoriesController = require("../controllers/CategoriesController");
const categoriesRouter = require("express").Router();

categoriesRouter.get("/", CategoriesController.getCategories);
categoriesRouter.post("/", CategoriesController.createCategory);
categoriesRouter.get("/:id", CategoriesController.getCategory);
categoriesRouter.delete("/:id", CategoriesController.deleteCategory);

module.exports = categoriesRouter;
