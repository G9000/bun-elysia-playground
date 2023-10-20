import { Elysia, t } from "elysia";
import { yoga } from "@elysiajs/graphql-yoga";
import { Static } from "@sinclair/typebox";
import { GraphQLContext, createContext } from "~/context";
import { fetchUser, fetchUsers, createUser } from "./service";

export const UserInput = t.Object({
  email: t.String(),
  username: t.Optional(t.String()),
});
type UserInputType = Static<typeof UserInput>;
type UserIdType = { id: string };

const typeDefs = /* GraphQL */ `
  type Query {
    getUsers: [User]
    getUser(id: String!): User
  }

  type User {
    id: String!
    email: String!
    username: String
    createdAt: String!
    updatedAt: String!
  }

  type Mutation {
    registerUser(email: String!, username: String): User!
  }
`;

const resolversConfig = {
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

export const UserResolver = new Elysia().use(
  yoga({
    typeDefs: typeDefs,
    context: createContext,
    useContext: (_) => {},
    resolvers: resolversConfig,
  })
);
