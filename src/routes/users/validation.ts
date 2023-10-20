import { t } from "elysia";
import { Static } from "@sinclair/typebox";

export const UserInput = t.Object({
  email: t.String(),
  username: t.Optional(t.String()),
});

export type UserInputType = Static<typeof UserInput>;
export type UserIdType = { id: string };
