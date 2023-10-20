import { makeExecutableSchema } from "@graphql-tools/schema";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";

import UserResolver from "./users/route";
import UserGqlTypeDefs from "./users/schema";
import WorkspaceResolver from "./workspaces/route";
import WorkspacesGqlTypeDefs from "./workspaces/schema";

const mergedTypeDefs = mergeTypeDefs([UserGqlTypeDefs, WorkspacesGqlTypeDefs]);
const mergedResolvers = mergeResolvers([UserResolver, WorkspaceResolver]);

const schema = makeExecutableSchema({
  typeDefs: mergedTypeDefs,
  resolvers: mergedResolvers,
});

export default schema;
