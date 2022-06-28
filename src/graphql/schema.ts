import { userResolvers, userTypeDef } from "../user";
import { authResolvers, authTypeDef } from "../auth";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { gql } from "apollo-server-core";

const baseTypeDef = gql`
  type Query
  type Subscription
  type Mutation
`;

const resolvers = [userResolvers, authResolvers];
const typeDefs = [baseTypeDef, userTypeDef, authTypeDef];

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
