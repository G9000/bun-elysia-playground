import { PrismaClient } from "@prisma/client";
import { auth } from "./lib/lucia";

const prisma = new PrismaClient();

export type GraphQLContext = {
  auth: typeof auth;
  prisma: PrismaClient;
};

export function createContext(): GraphQLContext {
  return { auth, prisma };
}
