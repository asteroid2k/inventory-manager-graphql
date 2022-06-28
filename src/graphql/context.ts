import { User } from "@prisma/client";

export interface Context {
  user: User | null;
}

export const context: Context = {
  user: null,
};
