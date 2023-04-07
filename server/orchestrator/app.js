import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import schemaProducts from "./schema/products.js";
import schemaCategories from "./schema/categories.js";
import schemaUsers from "./schema/users.js";

const [typeDefsProduct, productResolver] = schemaProducts;
const [typeDefsCategory, categoryResolver] = schemaCategories;
const [typeDefsUser, userResolver] = schemaUsers;

const server = new ApolloServer({
  typeDefs: [typeDefsProduct, typeDefsCategory, typeDefsUser],
  resolvers: [productResolver, categoryResolver, userResolver],
  introspection: true,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: process.env.PORT || 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
