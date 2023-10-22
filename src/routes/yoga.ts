import { mergeResolvers } from "@graphql-tools/merge";
import UserResolver from "./users/route";
import UserGqlTypeDefs from "./users/schema";
import WorkspaceResolver from "./workspaces/route";
import WorkspacesGqlTypeDefs from "./workspaces/schema";
import WorkflowResolver from "./workflow/route";
import WorkflowGqlTypeDefs from "./workflow/schema";

import AuthResolver from "./auth/route";
import AuthGqlTypeDefs from "./auth/schema";

// This is hacky method as @elysiajs/graphql-yoga and mobius does not have support for schema stitching
// Oh well it still work. This just a playground
// TODO:: I want to move from SDL to code first approach
const combineTypeDefs = (...typeDefs: string[]) => typeDefs.join("\n");
export const mergedTypeDefs = combineTypeDefs(
  // UserGqlTypeDefs,
  // WorkspacesGqlTypeDefs,
  // WorkflowGqlTypeDefs,
  AuthGqlTypeDefs
);

export const mergedResolvers = mergeResolvers([
  // UserResolver,
  // WorkspaceResolver,
  // WorkflowResolver,
  AuthResolver,
]);
