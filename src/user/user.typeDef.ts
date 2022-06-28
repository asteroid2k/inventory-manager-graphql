import { gql } from "apollo-server-core";

const userTypeDef = gql`
  # RESPONSE TYPES
  # fetch all users response
  type UsersData {
    users: [User]
  }
  type UsersResponse {
    message: String!
    status: Int!
    data: UsersData
  }
  # create user response
  type NewUserResponse {
    success: Boolean!
    message: String!
    status: Int!
    data: User!
  }

  type User {
    id: String!
    name: String!
    email: String!
    password: String!
    salt: String!
  }

  extend type Query {
    users: UsersResponse
  }

  extend type Mutation {
    createUser(
      name: String!
      email: String!
      password: String!
    ): NewUserResponse
  }

  extend type Subscription {
    users: String
  }
`;

export default userTypeDef;
