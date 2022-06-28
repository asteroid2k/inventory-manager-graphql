import rootPath from "app-root-path";
import envVariables from "./env";
import prisma from "./prisma";

export default { ...envVariables, rootPath, prisma };
