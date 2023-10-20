const UserGqlTypeDefs = /* GraphQL */ `
  type Query {
    getUsers: [User]
    getUser(id: String!): User
  }

  type User {
    id: String!
    email: String!
    username: String
  }

  type Mutation {
    registerUser(email: String!, username: String): User!
  }
`;

export default UserGqlTypeDefs;
