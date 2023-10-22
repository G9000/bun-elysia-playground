import { GraphQLContext } from "~/context";
import { createUser, signIn } from "./controller";
import { CreateUserInfoPayload, authResponse } from "./validation";

const AuthResolver = {
  Mutation: {
    registerUser: (
      parent: unknown,
      args: CreateUserInfoPayload,
      context: GraphQLContext
    ): Promise<authResponse> => createUser(args, context),
    signIn: (
      parent: unknown,
      args: CreateUserInfoPayload,
      context: GraphQLContext
    ): Promise<authResponse> => signIn(args, context),
  },
};

export default AuthResolver;
