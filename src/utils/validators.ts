import { string } from "zod";

export default {
  requiredString: (fieldName: string, min = 2, max = 100) =>
    string({
      required_error: `${fieldName} is required.`,
    })
      .max(max, {
        message: `${fieldName} must be ${max} or less characters long`,
      })
      .min(min, {
        message: `${fieldName} must be ${min} or more characters long`,
      }),
  email: string({ required_error: "Email is required." }).email(
    "Provide a valid email"
  ),
  phoneNumber: string({ required_error: "Phone number is required" }).regex(
    /^\d{10}$/,
    { message: "Invalid phone number" }
  ),
};
