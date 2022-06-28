import { ZodError } from "zod";
import { logger } from "../logger";
import { GraphQLError } from "graphql";
import { UserInputError } from "apollo-server-core";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import errorCodes from "./codes";

const errorHandler = (err: GraphQLError) => {
  const { originalError } = err;
  logger.error(originalError);

  // DB Errors
  if (originalError instanceof PrismaClientKnownRequestError) {
    if (originalError.code === "P2002") {
      const [model, field] = originalError.meta?.target.split("_");
      return new GraphQLError(`${model} with ${field} already exists`, {
        extensions: { code: errorCodes.UNIQUE_CONSTRAINT({ model, field }) },
      });
    }
  }

  //  Zod validation errors
  if (originalError instanceof ZodError) {
    const invalidInputs = originalError.issues.map((i) => ({
      path: i.path[0],
      message: i.message,
    }));
    return new UserInputError("Input validation failed", {
      invalidInputs,
    });
  }

  return err;
};

export default errorHandler;
