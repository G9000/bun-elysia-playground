import { t } from "elysia";
import { Static } from "@sinclair/typebox";

const WorkflowCreationInput = t.Object({
  name: t.String(),
  description: t.Optional(t.String()),
  workspaceId: t.String(),
});

export type WorkflowCreationPayload = Static<typeof WorkflowCreationInput>;

const WorkflowFetchInput = t.Object({
  id: t.String(),
});

export type WorkflowFetchParams = Static<typeof WorkflowFetchInput>;
