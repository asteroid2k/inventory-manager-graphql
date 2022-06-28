import { UserInputError } from "apollo-server-core";
import { skip } from "graphql-resolvers";
import { Context } from "src/graphql/context";
import { getUserByEmail } from "src/user/user.services";

const emailExists =
  (exists = true) =>
  /**
   * Checks if a user with given email exists
   * @param args - request arguments
   * @param context - graphql context
   */
  async (_, args, context: Context) => {
    const user = await getUserByEmail(args.email);
    if (!user && exists) {
      throw new UserInputError("Email not found");
    }
    if (user && !exists) {
      throw new UserInputError("Email already exists");
    }
    context.user = user;
    skip;
  };

export { emailExists };
