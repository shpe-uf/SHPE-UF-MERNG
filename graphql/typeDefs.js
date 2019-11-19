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
    classes: [Class]!
    confirmed: Boolean!
    fallPercentile: Int!
    springPercentile: Int!
    summerPercentile: Int!
  }

  type Class {
    code: String!
    users: [User]!
  }
  
  type Token {
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

  type Match {
    firstName: String!
    lastName: String!
    username: String!
    email: String!
    major: String!
    year: String!
    score: Int!
  }
  type StatData{
    _id: String!
    value: Int!
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

  input CreateClassInput {
    code: String!
    username: String!
  }

  input DeleteClassInput {
    code: String!
    username: String!
  }

  type Query {
    getUsers: [User]
    getUser(userId: ID!): User
    getEvents: [Event]
    getRequests: [Request]
    getMatches(username: String!): [Match]
    getMajorStat: [StatData]
    getCountryStat: [StatData]
    getYearStat: [StatData]
    getSexStat: [StatData]
    getEthnicityStat: [StatData]
  }

  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!, remember: String!): User!
    createEvent(createEventInput: CreateEventInput): [Event]
    redeemPoints(redeemPointsInput: RedeemPointsInput): User!
    approveRequest(approveRejectRequestInput: ApproveRejectRequestInput): [Request]
    rejectRequest(approveRejectRequestInput: ApproveRejectRequestInput): [Request]
    manualInput(manualInputInput: ManualInputInput): [Event]
    createClass(createClassInput: CreateClassInput): [Class]
    deleteClass(deleteClassInput: DeleteClassInput): [Class]
    getClass(code: String!): Class!
    forgotPassword(email: String!): User!
    resetPassword(password: String!, confirmPassword: String!, token: String!): Token!
    confirmUser(id: String!): User!
  }
`;
