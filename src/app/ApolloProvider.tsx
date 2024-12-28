"use client";

import { ReactNode } from "react";
import { ApolloProvider as Provider } from "@apollo/client";
import client from "../lib/apollo.client";

interface Props {
  children: ReactNode;
}

const ApolloProvider: React.FC<Props> = ({ children }) => {
  return <Provider client={client}>{children}</Provider>;
};

export default ApolloProvider;
