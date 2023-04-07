const ProductController = require("../controllers/ProductsController");

const productsRouter = require("express").Router();

productsRouter.get("/", ProductController.allProducts);
productsRouter.post("/", ProductController.createProduct);
productsRouter.get("/:id", ProductController.getProduct);
productsRouter.put("/:id", ProductController.editProduct);
productsRouter.delete("/:id", ProductController.deleteProduct);

module.exports = productsRouter;
