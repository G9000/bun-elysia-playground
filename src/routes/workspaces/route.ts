import { Elysia } from "elysia";
import { yoga } from "@elysiajs/graphql-yoga";
import type { Workspace } from "@prisma/client";
import { GraphQLContext, createContext } from "~/context";
import {
  registerWorkspace,
  fetchAllWorkspaces,
  fetchWorkspace,
} from "./controller";
import {
  WorkspaceInfoInput,
  WorkspaceFetchParams,
  WorkspacesFetchAllParams,
} from "./validation";
import gqlTypeDefs from "./schema";

const WorkspaceResolver = {
  Query: {
    getWorkspace: (
      parent: unknown,
      args: WorkspaceFetchParams,
      context: GraphQLContext
    ): Promise<Workspace | undefined> => fetchWorkspace(args, context),
    getAllWorkspaces: (
      parent: unknown,
      args: WorkspacesFetchAllParams,
      context: GraphQLContext
    ): Promise<Workspace[] | undefined> => fetchAllWorkspaces(args, context),
  },
  Mutation: {
    createWorkspace: (
      parent: unknown,
      args: WorkspaceInfoInput,
      context: GraphQLContext
    ): Promise<Workspace | undefined> => registerWorkspace(args, context),
  },
};

// const WorkspaceResolver = new Elysia().use(
//   yoga({
//     typeDefs: gqlTypeDefs,
//     context: createContext,
//     useContext: (_) => {},
//     resolvers: resolversConfig,
//   })
// );

export default WorkspaceResolver;
