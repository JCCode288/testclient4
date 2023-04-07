const serviceUrl = "http://localhost:4001";
const appUrl = "http://localhost:4002";
const redis = require("../config/redis");
const { default: axios } = require("axios");

module.exports = class AppController {
  static async getProducts(req, res) {
    try {
      let products = await redis.get("products:all");

      if (!products) {
        let { data } = await axios.get(`${appUrl}/`);
        products = await Promise.all(
          data.map(async (el) => {
            try {
              const author = await axios.get(
                `${serviceUrl}/users/` + el.authorId
              );
              el.Author = author.data;
              return el;
            } catch (err) {
              throw err;
            }
          })
        );
        products = data;
        redis.set("products:all", JSON.stringify(products));
        res.json(products);
      } else {
        res.json(JSON.parse(products));
      }
    } catch (err) {
      res.status(err.response.status).json(err.response.data);
    }
  }
  static async getProduct(req, res) {
    try {
      let id = req.params.id;

      let product = await redis.get(`products:${id}`);
      if (!product) {
        let { data } = await axios.get(`${appUrl}/` + id);

        let author = await axios.get(`${serviceUrl}/users/` + data.authorId);

        product = { ...data };

        product.Author = author.data;

        redis.set(`products:${id}`, JSON.stringify(product));

        res.json(product);
      } else {
        res.json(JSON.parse(product));
      }
    } catch (err) {
      res.status(err.response.status).json(err.response.data);
    }
  }
  static async getCategories(req, res) {
    try {
      let categories = await redis.get("categories:all");

      if (!categories) {
        let { data } = await axios.get(`${appUrl}/categories`);

        redis.set("categories:all", JSON.stringify(data));
        res.json(data);
      } else {
        res.json(JSON.parse(categories));
      }
    } catch (err) {
      res.status(err.response.status).json(err.response.data);
    }
  }
  static async getCategory(req, res) {
    try {
      let id = req.params.id;

      let category = await redis.get(`categories:${id}`);

      if (!category) {
        let { data } = await axios.get(`${appUrl}/categories/` + id);

        redis.set(`categories:${id}`, JSON.stringify(data));
        res.json(data);
      } else {
        res.json(JSON.parse(category));
      }
    } catch (err) {
      res.status(err.response.status).json(err.response.data);
    }
  }
};
