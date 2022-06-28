import { PrismaClient, User } from "@prisma/client";
import prisma from "src/config/prisma";
import { CreateUserData } from "src/types";

class Users {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly prisma: PrismaClient["user"]) {}

  /**
   * Creates new user
   * @param data - user details
   * @returns
   */
  async create(data: CreateUserData): Promise<User> {
    return this.prisma.create({ data });
  }
}

const UserModel = new Users(prisma.user);

export default UserModel;
