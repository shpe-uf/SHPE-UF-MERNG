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
    password: String!
    createdAt: String!
    points: Int!
    fallPoints: Int!
    springPoints: Int!
    summerPoints: Int!
    permission: String!
    listServ: Boolean!
    events: [Event]!
    token: String!
    message: String!
    fallPercentile: Int!
    springPercentile: Int!
    summerPercentile: Int!
  }

  type Event {
    id: ID!
    name: String!
    code: String!
    category: String!
    points: Int!
    attendance: Int!
    expiration: String!
    request: Boolean!
    semester: String!
    createdAt: String!
    users: [User]!
  }

  type Request {
    id: ID!
    eventName: String!
    category: String!
    points: String!
    firstName: String!
    lastName: String!
    username: String!
    createdAt: String!
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
    points: String!
    expiration: String!
    request: String!
  }

  input RedeemPointsInput {
    code: String!
    username: String!
  }

  input ApproveRejectRequestInput {
    username: String!
    eventName: String!
  }

  input ManualInputInput {
    username: String!
    eventName: String!
  }

  type Query {
    getUsers: [User]
    getUser(userId: ID!): User
    getEvents: [Event]
    getRequests: [Request]
  }

  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!, remember: String!): User!
    createEvent(createEventInput: CreateEventInput): Event!
    redeemPoints(redeemPointsInput: RedeemPointsInput): User!
    approveRequest(approveRejectRequestInput: ApproveRejectRequestInput): [Request]
    rejectRequest(approveRejectRequestInput: ApproveRejectRequestInput): [Request]
    manualInput(manualInputInput: ManualInputInput): User!
  }
`;
