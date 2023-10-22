import { t } from "elysia";
import { validator } from "~/utils/validator-util";

const secretsSchema = t.Object({
  // google: t.Object({
  //   clientId: t.String({ error: "Google client id is required in .env" }),
  //   clientSecret: t.String({
  //     error: "Google client secret is required in .env",
  //   }),
  //   redirectUrl: t.String({ error: "Google redirect url is required in .env" }),
  // }),
  resend: t.String({ error: "Resend key is required in .env" }),
});

export const secrets = validator(secretsSchema, {
  // google: {
  //   clientId: Bun.env.GOOGLE_CLIENT_ID,
  //   clientSecret: Bun.env.GOOGLE_CLIENT_SECRET,
  //   redirectUrl: Bun.env.GOOGLE_REDIRECT_URL,
  // },
  resend: Bun.env.RESEND_KEY,
});
