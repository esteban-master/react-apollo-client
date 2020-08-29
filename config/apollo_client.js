import {
  ApolloClient,
  HttpLink,
  ApolloLink,
  InMemoryCache,
  concat,
  gql,
} from "@apollo/client";

import Cookies from "universal-cookie";

const cookies = new Cookies();

const httpLink = new HttpLink({ uri: "http://localhost:4000/" });

const authMiddleware = new ApolloLink((operation, forward) => {
  if (cookies.get("token")) {
    operation.setContext({
      headers: {
        authorization: `Bearer ${cookies.get("token")}`,
      },
    });
  }
  return forward(operation);
});

const client = new ApolloClient({
  connectToDevTools: true,
  cache: new InMemoryCache(),
  link: concat(authMiddleware, httpLink),
});

module.exports = {
  client,
  gql,
};
