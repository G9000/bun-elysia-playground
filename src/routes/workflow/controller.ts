import { typeid } from "typeid-js";
import { handleErrors } from "~/utils/error-utils";
import { GraphQLContext } from "~/context";
import { WorkflowCreationPayload, WorkflowFetchParams } from "./validation";

export async function registerWorkflow(
  args: WorkflowCreationPayload,
  context: GraphQLContext
) {
  try {
    return await context.prisma.workflow.create({
      data: {
        id: typeid("workflow").toString(),
        name: args.name,
        description: args.description,
        workspaceId: args.workspaceId,
      },
    });
  } catch (error) {
    handleErrors(error, "Failed to create workspace");
  }
}

export async function fetchWorkflow(
  args: WorkflowFetchParams,
  context: GraphQLContext
) {
  try {
    const result = await context.prisma.workflow.findFirst({
      where: {
        id: args.id,
      },
    });
    return result || undefined;
  } catch (error) {
    handleErrors(error, "Failed to fetch workspaces");
  }
}
