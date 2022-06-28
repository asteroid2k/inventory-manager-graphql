import { combineResolvers } from "graphql-resolvers";
import { PubSub } from "graphql-subscriptions";
import { emailExists } from "src/middleware/user-exists";
import { validateResourceSchema } from "src/middleware/validate-resource";
import { successResponse } from "src/utils/helpers/response";
import { createUser } from "./user.controller";
import { createUserSchema } from "./user.schema";
import { getUsers } from "./user.services";

const pubsub = new PubSub();

const userResolvers = {
  Query: {
    users: async () => {
      const users = await getUsers();
      return successResponse({ message: "Users", data: { users } });
    },
  },
  Mutation: {
    createUser: combineResolvers(
      validateResourceSchema(createUserSchema),
      emailExists(false),
      createUser
    ),
  },
  Subscription: {
    users: {
      subscribe: () => pubsub.asyncIterator(["PEEKABOO"]),
    },
  },
};

export default userResolvers;
