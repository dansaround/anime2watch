import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const createApolloClient = () => {
  return new ApolloClient({
    ssrMode: typeof window === "undefined", // Habilita el soporte SSR
    link: new HttpLink({
      uri: "https://graphql.anilist.co", // URL de tu API
      fetch,
    }),
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
