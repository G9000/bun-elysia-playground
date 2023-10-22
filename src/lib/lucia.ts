import { lucia } from "lucia";
import { elysia } from "lucia/middleware";
import { prisma } from "@lucia-auth/adapter-prisma";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();
export const auth = lucia({
  env:
    (process.env.ENV ?? process.env.NODE_ENV) === "production" ? "PROD" : "DEV",
  middleware: elysia(),
  adapter: prisma(client, {
    user: "user",
    key: "key",
    session: "session",
  }),

  sessionCookie: {
    expires: false,
  },

  getSessionAttributes: (databaseSession) => {
    return {
      createdAt: databaseSession.created_at,
    };
  },

  getUserAttributes(data) {
    return {
      username: data.username,
      email: data.email,
      emailVerified: data.email_verified,
    };
  },
});

// const googleAuth = google(auth, {
//   clientId: secrets.google.clientId,
//   clientSecret: secrets.google.clientSecret,
//   redirectUri: secrets.google.redirectUrl,
// });

// const session: Session = await auth.validateSession(sessionId);
// // `sessionId` etc are always included
// const { sessionId, createdAt } = session;
