const WorkspacesGqlTypeDefs = /* GraphQL */ `
  type Query {
    getWorkspace(id: String!, ownerId: String!): Workspace
    getAllWorkspaces(ownerId: String!): [Workspace]
  }

  type Workspace {
    id: String!
    name: String!
    description: String
  }

  type Mutation {
    createWorkspace(
      name: String!
      description: String
      ownerId: String!
    ): Workspace
  }
`;

export default WorkspacesGqlTypeDefs;
