import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://54.169.0.71/",
  cache: new InMemoryCache(),
});

export default client;
