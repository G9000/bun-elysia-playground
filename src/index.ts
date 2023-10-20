import { Elysia } from "elysia";
import { yoga } from "@elysiajs/graphql-yoga";
import { createContext } from "~/context";
import { swagger } from "@elysiajs/swagger";
import schema from "./routes";

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
  .use(
    yoga({
      schema: schema,
      context: createContext,
      useContext: (_) => {},
    })
  )
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
