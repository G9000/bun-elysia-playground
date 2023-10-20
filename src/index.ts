import { Elysia, t } from "elysia";
import { PrismaClient } from "@prisma/client";
import { swagger } from "@elysiajs/swagger";
import { yoga } from "@elysiajs/graphql-yoga";
import { createContext } from "./context";
import { UserResolver } from "./resources/users/route";

const db = new PrismaClient();

// const schema = new Elysia().use(
//   yoga({
//     typeDefs: /* GraphQL */ `
//       type Query {
//         hi: String
//         testingoo: String
//       }
//     `,
//     context: createContext,
//     useContext(_) {},
//     resolvers: {
//       Query: {
//         hi: async (parent, args, context) => context.prisma.use,
//         testingoo: () => 1,
//       },
//     },
//   })
// );

const app = new Elysia()
  .use(
    swagger({
      documentation: {
        info: {
          title: "Chonk Documentation",
          version: "0.0.0",
        },
      },
    })
  )
  .use(UserResolver)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
