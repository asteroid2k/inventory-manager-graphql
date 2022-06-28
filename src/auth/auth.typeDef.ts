import { gql } from "apollo-server-core";

const authTypeDef = gql`
  # RESPONSE TYPES
  # signin response
  type SigninResponse {
    message: String!
    status: Int!
    data: SigninData
  }

  type SigninData {
    token: String!
    user: User!
  }

  extend type Mutation {
    signin(email: String!, password: String!): SigninResponse
  }
`;

export default authTypeDef;
