import { Elysia } from "elysia";
import { yoga } from "@elysiajs/graphql-yoga";
import { GraphQLContext, createContext } from "~/context";
import { fetchUser, fetchUsers, createUser } from "./controller";
import { UserInputType, UserIdType } from "./validation";
import gqlTypeDefs from "./schema";

const UserResolver = {
  Query: {
    getUsers: (
      parent: unknown,
      args: {} | undefined | null,
      context: GraphQLContext
    ) => fetchUsers(context),
    getUser: (parent: unknown, args: UserIdType, context: GraphQLContext) =>
      fetchUser(args.id, context),
  },
  Mutation: {
    registerUser: (
      parent: unknown,
      args: UserInputType,
      context: GraphQLContext
    ) => createUser(args, context),
  },
};

// const UserResolver = new Elysia().use(
//   yoga({
//     typeDefs: gqlTypeDefs,
//     context: createContext,
//     useContext: (_) => {},
//     resolvers: resolversConfig,
//   })
// );

export default UserResolver;
