const AuthGqlTypeDefs = /* GraphQL */ `
  type Query {
    _empty: String
  }

  type User {
    id: String!
    email: String!
  }

  type AuthResponse {
    success: Boolean!
    message: String
  }

  type Mutation {
    registerUser(email: String!, password: String!): AuthResponse!
    signIn(email: String!, password: String!): AuthResponse!
  }
`;

export default AuthGqlTypeDefs;
