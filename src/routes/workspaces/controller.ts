import { typeid } from "typeid-js";
import {
  WorkspaceInfoInput,
  WorkspaceFetchParams,
  WorkspacesFetchAllParams,
} from "./validation";
import type { Workspace } from "@prisma/client";
import { GraphQLContext } from "../../context";
import { handleErrors } from "~/utils/error-utils";

export async function registerWorkspace(
  args: WorkspaceInfoInput,
  context: GraphQLContext
): Promise<Workspace | undefined> {
  try {
    return await context.prisma.workspace.create({
      data: {
        id: typeid("workspace").toString(),
        name: args.name,
        description: args.description,
        ownerId: args.ownerId,
      },
    });
  } catch (error) {
    handleErrors(error, "Failed to create workspace");
  }
}

export async function fetchWorkspace(
  args: WorkspaceFetchParams,
  context: GraphQLContext
): Promise<Workspace | undefined> {
  try {
    const result = await context.prisma.workspace.findFirst({
      where: {
        ownerId: args.ownerId,
      },
    });
    return result || undefined;
  } catch (error) {
    handleErrors(error, "Failed to fetch workspaces");
  }
}

export async function fetchAllWorkspaces(
  args: WorkspacesFetchAllParams,
  context: GraphQLContext
): Promise<Workspace[] | undefined> {
  try {
    const workspaces = await context.prisma.workspace.findMany({
      where: {
        ownerId: args.ownerId,
      },
    });
    return workspaces;
  } catch (error) {
    handleErrors(error, "Failed to fetch workspace");
  }
}
