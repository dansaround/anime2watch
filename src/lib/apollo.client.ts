import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://graphql.anilist.co", // Cambia esto por tu endpoint
  cache: new InMemoryCache(),
});

export default client;
