import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://b0ad-186-154-118-200.ngrok-free.app/graphql",
  cache: new InMemoryCache(),
});

export default client;
