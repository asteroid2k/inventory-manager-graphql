import { User } from "@prisma/client";
import prisma from "src/config/prisma";

/**
 * Finds a user by email
 * @param email - user's email
 * @returns {Promise<User|null>}  - resolves to user object or null
 */
const getUserByEmail = (email: string): Promise<User | null> => {
  return prisma.user.findUnique({ where: { email } });
};
const getUsers = (): Promise<User[] | null> => {
  return prisma.user.findMany();
};

export { getUserByEmail, getUsers };
