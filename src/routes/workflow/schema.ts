const WorkflowGqlTypeDefs = /* GraphQL */ `
  type Query {
    getWorkflow(id: String!): Workflow
  }

  type Workflow {
    id: String!
    name: String!
    description: String
  }

  type Mutation {
    createWorkflow(
      name: String!
      description: String
      workspaceId: String!
    ): Workflow!
  }
`;

export default WorkflowGqlTypeDefs;
