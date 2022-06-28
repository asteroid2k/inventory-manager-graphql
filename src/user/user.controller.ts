import { Context } from "src/graphql/context";
import { hashPassword } from "src/utils/helpers/auth";
import { graphqlResponse, successResponse } from "../utils/helpers/response";
import User from "./user.model";

// export const getDetails = async (_, __, context: Context) => {
//   const users = await context.prisma.user.findMany();
//   return successResponse({ data: users, message: "All users" });
// };

export const createUser = async (_, args, context: Context) => {
  const { hash: password, salt } = await hashPassword(args.password);
  const { id, email, name } = await User.create({ ...args, password, salt });

  return graphqlResponse({
    message: "Create User",
    data: { id, email, name },
    status: 201,
  });
};
