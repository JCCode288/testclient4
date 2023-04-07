const Errors = require("../helpers/Errors");
const { User, Product, Category, Image, sequelize } = require("../models");

module.exports = class ProductController {
  static async allProducts(req, res, next) {
    try {
      let products = await Product.findAll({
        include: [
          {
            model: Category,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
          {
            model: Image,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });

      res.status(200).json(products);
    } catch (err) {
      next(err);
    }
  }

  static async getProduct(req, res, next) {
    try {
      let productId = req.params.id;

      let product = await Product.findByPk(productId, {
        include: [
          {
            model: Category,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
          {
            model: Image,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });

      if (!product) {
        throw new Errors(404, "Product not found!");
      }

      res.status(200).json(product);
    } catch (err) {
      next(err);
    }
  }

  static async createProduct(req, res, next) {
    const t = await sequelize.transaction();
    let transaction = t;
    try {
      let { name, description, price, mainImg, categoryId, Images, authorId } =
        req.body;

      if (
        !name ||
        !description ||
        !price ||
        !mainImg ||
        !categoryId ||
        !Images ||
        !authorId
      ) {
        throw new Errors(400, "Required fields must be filled");
      }

      let category = await Category.findByPk(categoryId, { transaction });

      if (!category) {
        throw new Errors(404, "Category is not found");
      }

      let [product, created] = await Product.findOrCreate({
        where: {
          name,
          description,
          price,
          mainImg,
          categoryId,
          authorId,
        },
        transaction,
      });

      Images = Images.map((el) => ({ productId: product.id, imgUrl: el }));

      let images = await Image.bulkCreate(Images, { transaction });

      if (!created) {
        throw new Errors("400", "you already put this item");
      }

      await t.commit();
      res.status(201).json(product);
    } catch (err) {
      await t.rollback();
      next(err);
    }
  }

  static async editProduct(req, res, next) {
    const t = await sequelize.transaction();
    let transaction = t;
    try {
      let { name, description, price, mainImg, categoryId, Images, authorId } =
        req.body;
      let productId = req.params.id;

      if (!authorId) {
        throw new Errors(400, "Required fields must be filled");
      }

      let product = await Product.findByPk(productId, { transaction });

      if (!product) {
        throw new Errors(404, "Product is not found");
      }

      let category = await Category.findByPk(categoryId, { transaction });

      if (!category) {
        throw new Errors(404, "Category is not found");
      }

      let edited = await product.update(
        {
          name,
          description,
          price,
          mainImg,
          categoryId,
          authorId,
        },
        { transaction }
      );

      console.log(edited.id);

      Images = Images.map((el) => {
        el.productId = edited.id;
        return el;
      });

      let images = await Image.bulkCreate(Images, {
        transaction,
        where: { productId: edited.id },
        updateOnDuplicate: ["imgUrl"],
      });

      await t.commit();
      res.status(200).json(edited);
    } catch (err) {
      await t.rollback();
      next(err);
    }
  }

  static async deleteProduct(req, res, next) {
    try {
      const productId = req.params.id;
      const result = await sequelize.transaction(async (t) => {
        const product = await Product.findByPk(productId, { transaction: t });

        if (!product) {
          throw new Errors(404, "Product not found");
        }

        const images = await Image.findAll({
          where: { productId },
          transaction: t,
        });

        if (images.length) {
          await Image.destroy({ where: { productId }, transaction: t });
        }

        await product.destroy({ transaction: t });

        return { message: `${product.name} has been deleted` };
      });
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
};
