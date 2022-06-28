import { skip } from "graphql-resolvers";
import { AnyZodObject } from "zod";

/**
 * validates request object with given schema
 * @param {AnyZodObject} schema - schema object to validate
 */
export const validateResourceSchema = (schema: AnyZodObject) => (_, args) => {
  schema.parse(args);
  skip;
};
