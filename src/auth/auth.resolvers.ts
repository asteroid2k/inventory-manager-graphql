import { combineResolvers } from "graphql-resolvers";
import { emailExists } from "src/middleware/user-exists";
import { validateResourceSchema } from "src/middleware/validate-resource";
import { signin } from "./auth.controller";
import { signinSchema } from "./auth.schema";

const authResolvers = {
  Mutation: {
    signin: combineResolvers(
      validateResourceSchema(signinSchema),
      emailExists(),
      signin
    ),
  },
};

export default authResolvers;
