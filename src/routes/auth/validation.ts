import { t } from "elysia";
import { Static } from "@sinclair/typebox";

export const CreateUserInfoInput = t.Object({
  email: t.String(),
  password: t.String(),
});

export type CreateUserInfoPayload = Static<typeof CreateUserInfoInput>;

const authResponseT = t.Object({
  success: t.Boolean(),
  message: t.Optional(t.String()),
});
export type authResponse = Static<typeof authResponseT>;
