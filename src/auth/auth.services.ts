import { User } from "@prisma/client";
import { UserInputError } from "apollo-server-core";
import { comparePassword, generateJwt } from "src/utils/helpers/auth";

/**
 * verifies user password and generates jwt token
 * @param {User} user - user object
 * @param {string} password - plain password
 * @returns {string} - jwt token
 */
const authenticate = async (user: User, password: string): Promise<string> => {
  const { password: hashed, salt } = user;
  const match = await comparePassword(password, salt, hashed);
  if (!match) {
    throw new UserInputError("Invalid credentials");
  }
  const token = generateJwt(user, "accessTokenKey", { expiresIn: "12h" });
  return token;
};

export { authenticate };
