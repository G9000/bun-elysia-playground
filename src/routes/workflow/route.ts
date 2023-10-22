import { Workflow } from "@prisma/client";
import { GraphQLContext } from "~/context";
import { fetchWorkflow, registerWorkflow } from "./controller";
import { WorkflowFetchParams, WorkflowCreationPayload } from "./validation";

const WorkflowResolver = {
  Query: {
    getWorkflow: (
      parent: unknown,
      args: WorkflowFetchParams,
      context: GraphQLContext
    ): Promise<Workflow | undefined> => fetchWorkflow(args, context),
  },
  Mutation: {
    createWorkflow: (
      parent: unknown,
      args: WorkflowCreationPayload,
      context: GraphQLContext
    ): Promise<Workflow | undefined> => registerWorkflow(args, context),
  },
};

export default WorkflowResolver;
