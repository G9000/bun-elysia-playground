import { t } from "elysia";
import { Static } from "@sinclair/typebox";

export const WorkspaceInfoInput = t.Object({
  name: t.String(),
  description: t.Optional(t.String()),
  ownerId: t.String(),
});

export type WorkspaceInfoInput = Static<typeof WorkspaceInfoInput>;

export const WorkspaceFetchParams = t.Object({
  id: t.String(),
  ownerId: t.String(),
});

export type WorkspaceFetchParams = Static<typeof WorkspaceFetchParams>;

export const WorkspacesFetchAllParams = t.Object({
  ownerId: t.String(),
});

export type WorkspacesFetchAllParams = Static<typeof WorkspacesFetchAllParams>;
