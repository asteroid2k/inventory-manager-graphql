import { object } from "zod";
import validators from "src/utils/validators";

const { requiredString, email } = validators;

export const createUserSchema = object({
  name: requiredString("First Name"),
  email,
  password: requiredString("Password", 8),
});
