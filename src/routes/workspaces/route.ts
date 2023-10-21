import { Workspace } from "@prisma/client";
import { GraphQLContext } from "~/context";
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

export default WorkspaceResolver;
