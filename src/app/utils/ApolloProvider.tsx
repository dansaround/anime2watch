"use client";

import { ReactNode } from "react";
import { ApolloProvider as Provider } from "@apollo/client";
import createApolloClient from "@/lib/apollo.client";

interface Props {
  children: ReactNode;
}

const ApolloProvider: React.FC<Props> = ({ children }) => {
  const client = createApolloClient();
  return <Provider client={client}>{children}</Provider>;
};

export default ApolloProvider;
