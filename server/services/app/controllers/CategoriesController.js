const { Category, Product } = require("../models");
const Errors = require("../helpers/Errors");

module.exports = class CategoriesController {
  static async getCategories(req, res, next) {
    try {
      const categories = await Category.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });

      res.status(200).json(categories);
    } catch (err) {
      next(err);
    }
  }

  static async getCategory(req, res, next) {
    try {
      let categoryId = req.params.id;

      const category = await Category.findByPk(categoryId, {
        include: {
          model: Product,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });

      if (!category) {
        throw new Errors(404, "Category not found");
      }

      res.status(200).json(category);
    } catch (err) {
      next(err);
    }
  }

  static async createCategory(req, res, next) {
    try {
      const { name } = req.body;

      if (!name) {
        throw new Errors(400, "all field must be filled");
      }

      let [category, created] = await Category.findOrCreate({
        where: { name },
      });

      if (!created) {
        throw new Errors(400, "The category is already created");
      }

      res.status(201).json(category);
    } catch (err) {
      next(err);
    }
  }

  static async deleteCategory(req, res, next) {
    try {
      let categoryId = req.params.id;

      let category = await Category.findByPk(categoryId);

      if (!category) {
        throw new Errors(404, "Category not found");
      }

      await category.destroy();
      let message = `${category.name} has been deleted`;

      res.status(200).json({ message });
    } catch (err) {
      next(err);
    }
  }
};
