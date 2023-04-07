"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Product.belongsTo(models.Category, { foreignKey: "categoryId" });
      Product.hasMany(models.Image, {
        foreignKey: "productId",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });
    }
  }
  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Name cannot be empty",
          },
          notEmpty: {
            msg: "Name cannot be empty",
          },
        },
      },
      slug: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Description cannot be empty",
          },
          notEmpty: {
            msg: "Description cannot be empty",
          },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Price cannot be empty",
          },
          notEmpty: {
            msg: "Price cannot be empty",
          },
          min: {
            args: 20000,
            msg: "Price can't be lower than Rp 20.000",
          },
        },
      },
      mainImg: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Main Image cannot be empty",
          },
          notEmpty: {
            msg: "Main Image cannot be empty",
          },
        },
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Category cannot be empty",
          },
          notNull: {
            msg: "Category cannot be empty",
          },
        },
      },
      authorId: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Author cannot be empty",
          },
          notNull: {
            msg: "Author cannot be empty",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Product",
    }
  );

  Product.beforeCreate((product, opt) => {
    product.slug = product.name.replaceAll(" ", "-");
  });

  return Product;
};
