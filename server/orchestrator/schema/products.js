import axios from "axios";
import redis from "../config/redis.js";

const APP_SERVICE_URL = process.env.APP_SERVICE_URL;
const USERS_SERVICE_URL = process.env.USER_SERVICE_URL;

const typeDefsProduct = `#graphql

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
    Author: User
    Images: [Image]
  }

  type Category {
    id: ID!
    name: String!
    Products: [Product]
  }

  type Image {
    productId: ID!
    imgUrl: String
  }

  type User {
    _id: String!
    username: String!
    email: String!
    role: String
    phoneNumber: String
    address: String
  }

  type Message {
    message: String
  }

  input newProduct {
    Images: [String]
    name: String!
    description: String!
    price: Int!  
    mainImg: String!
    categoryId: Int!
    authorId: String!
  }

  input editProduct {
    Images: [ImageInput]
    name: String!
    description: String!
    price: Int!  
    mainImg: String!
    categoryId: Int!
    authorId: String!
  }

  input ImageInput {
    imgUrl: String
  }

  type Query {
    products: [Product]
    product(id:ID!): Product
  }

  type Mutation {
    addProduct (newProduct: newProduct): Product
    editProduct (id: ID!, editProduct: editProduct ): Product
    deleteProduct (id: ID!): Message
  }
`;

const productResolver = {
  Query: {
    products: async () => {
      try {
        const products = await redis.get("products:all");

        if (!products) {
          let { data } = await axios({
            method: "get",
            url: APP_SERVICE_URL,
          });

          await redis.set("products:all", JSON.stringify(data));
          return data;
        } else {
          return JSON.parse(products);
        }
      } catch (err) {
        throw err;
      }
    },
    product: async (_, { id }) => {
      try {
        let product = await redis.get(`products:${id}`);

        if (!product) {
          let { data } = await axios({
            method: "get",
            url: `${APP_SERVICE_URL}/${id}`,
          });
          let user = await axios.get(
            `${USERS_SERVICE_URL}/users/${data.authorId}`
          );
          data.Author = user.data;

          await redis.set(`products:${id}`, JSON.stringify(data));
          return data;
        } else {
          return JSON.parse(product);
        }
      } catch (err) {
        throw err;
      }
    },
  },
  Mutation: {
    addProduct: async (_, { newProduct }) => {
      try {
        let { data } = await axios.post(
          `${APP_SERVICE_URL}/adm/products`,
          newProduct
        );

        await redis.flushall();
        return data;
      } catch (err) {
        throw err;
      }
    },
    editProduct: async (_, { editProduct, id }) => {
      try {
        let { data } = await axios.put(
          `${APP_SERVICE_URL}/adm/products/${id}`,
          editProduct
        );

        await redis.flushall();
        return data;
      } catch (err) {
        throw err;
      }
    },
    deleteProduct: async (_, { id }) => {
      try {
        let { data } = await axios.delete(
          `${APP_SERVICE_URL}/adm/products/${id}`
        );

        await redis.flushall();
        return data;
      } catch (err) {
        throw err;
      }
    },
  },
};

export default [typeDefsProduct, productResolver];
