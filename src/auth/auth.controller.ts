import { Context } from "src/graphql/context";
import { successResponse } from "src/utils/helpers/response";
import { authenticate } from "./auth.services";

const signin = async (_, args, context: Context) => {
  const { user } = context;
  const token = await authenticate(user!, args.password);
  return successResponse({ message: "Authenticated", data: { user, token } });
};

export { signin };
