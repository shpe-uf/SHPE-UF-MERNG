const gql = require("graphql-tag");

module.exports = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    major: String!
    year: String!
    graduating: String!
    country: String!
    ethnicity: String!
    sex: String!
    username: String!
    email: String!
    createdAt: String!
    points: Int!
    fallPoints: Int!
    springPoints: Int!
    summerPoints: Int!
    permission: String!
    listServ: Boolean!
    events: [Event]!
    bookmarks: [Company]!
    token: String!
  }

  type Event {
    id: ID!
    name: String!
    code: String!
    category: String!
    points: Int!
    attendance: Int!
    expiration: String!
    semester: String!
    attendees: [User]!
    createdAt: String!
  }

  type Company {
    id: ID!
    name: String!
  }

  input RegisterInput {
    firstName: String!
    lastName: String!
    major: String!
    year: String!
    graduating: String!
    country: String!
    ethnicity: String!
    sex: String!
    username: String!
    email: String!
    password: String!
    confirmPassword: String!
    listServ: String!
  }

  input CreateEventInput {
    name: String!
    code: String!
    category: String!
  }

  type Query {
    getUsers: [User]
    getUser(userId: ID!): User
    getEvents: [Event]
  }

  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createEvent(createEventInput: CreateEventInput): Event!
  }
`;
