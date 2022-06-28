import { object } from "zod";
import validators from "src/utils/validators";

const { requiredString, email } = validators;

export const signinSchema = object({
  email,
  password: requiredString("Password", 8),
});
