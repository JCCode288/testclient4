import axios from "axios";
import redis from "../config/redis.js";

const APP_SERVICE_URL = process.env.APP_SERVICE_URL;

const typeDefsCategory = `#graphql

  type Product {
    id: ID!
    name: String!
    slug: String!
    description: String!
    price: Int!  
    mainImg: String!
    categoryId: Int!
    authorId: String!
    Category: Category
  }

  type Category {
    id: ID!
    name: String!
    Products: [Product]
  }

  type Query {
    categories: [Category]!
    category(id:ID!): Category
  }
`;

const categoryResolver = {
  Query: {
    categories: async () => {
      try {
        let categories = await redis.get("categories:all");

        if (!categories) {
          let { data } = await axios.get(`${APP_SERVICE_URL}/categories`);

          redis.set("categories:all", JSON.stringify(data));
          return data;
        } else {
          return JSON.parse(categories);
        }
      } catch (err) {
        throw err;
      }
    },
    category: async (_, { id }) => {
      try {
        let category = await redis.get(`categories:${id}`);

        if (!category) {
          let { data } = await axios.get(`${APP_SERVICE_URL}/categories/${id}`);

          redis.set(`categories:${id}`, JSON.stringify(data));
          return data;
        } else {
          return JSON.parse(category);
        }
      } catch (err) {
        throw err;
      }
    },
  },
};

export default [typeDefsCategory, categoryResolver];
