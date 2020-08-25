import { GraphQLClient, gql } from "graphql-request";

const client = new GraphQLClient("http://localhost:4000/");

export const graphql_request = { client, gql };
