import { GraphQLContext } from "~/context";
import { fetchUser, fetchUsers, createUser } from "./controller";
import { UserInputType, UserIdType } from "./validation";

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

export default UserResolver;
