import axios from "axios";
import redis from "../config/redis.js";

const USERS_SERVICE_URL = process.env.USER_SERVICE_URL;

const typeDefsUser = `#graphql
  type User {
    _id: String!
    username: String!
    email: String!
    role: String
    phoneNumber: String
    address: String
  }

  type TokenResponse {
    access_token: String!
    username: String
  }

  input newUser {
    username: String!
    email: String!
    password: String!
    phoneNumber: String!
    address: String!
  }

  type Query {
    users: [User]
  }

  type Mutation {
    register (newUser: newUser): TokenResponse
    deleteUser (id: String!): Message
  }
`;

const userResolver = {
  Query: {
    users: async () => {
      try {
        let users = await redis.get("users:all");

        if (!users) {
          let { data } = await axios({
            method: "get",
            url: `${USERS_SERVICE_URL}/users`,
          });

          await redis.set("users:all", JSON.stringify(data));
          return data;
        } else {
          return JSON.parse(users);
        }
      } catch (err) {
        throw err;
      }
    },
  },
  Mutation: {
    register: async (_, { newUser }) => {
      try {
        let { data } = await axios.post(
          `${USERS_SERVICE_URL}/register`,
          newUser
        );

        await redis.flushall();
        return data;
      } catch (err) {
        throw err;
      }
    },
    deleteUser: async (_, { id }) => {
      try {
        let { data } = await axios({
          method: "delete",
          url: `${USERS_SERVICE_URL}/users/${id}`,
        });

        await redis.flushall();
        return data;
      } catch (err) {
        throw err;
      }
    },
  },
};

export default [typeDefsUser, userResolver];
