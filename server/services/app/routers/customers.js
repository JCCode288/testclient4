const CategoriesController = require("../controllers/CategoriesController");
const ProductController = require("../controllers/ProductsController");

const customersRouter = require("express").Router();

customersRouter.get("/", ProductController.allProducts);
customersRouter.get("/categories", CategoriesController.getCategories);
customersRouter.get("/categories/:id", CategoriesController.getCategory);
customersRouter.get("/:id", ProductController.getProduct);

module.exports = customersRouter;
