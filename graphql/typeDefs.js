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
    tasks: [Task]!
    token: String!
    message: String!
    confirmed: Boolean!
    fallPercentile: Int!
    springPercentile: Int!
    summerPercentile: Int!
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

  type Task {
    id: ID!
    name: String!
    startDate: String!
    endDate: String!
    description: String!
    points: Int!
    attendance: Int!
    semester: String!
    createdAt: String!
    users: [User]!
  }

  type Request {
    id: ID!
    name: String!
    type: String!
    points: String!
    firstName: String!
    lastName: String!
    username: String!
    createdAt: String!
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

  input CreateTaskInput {
    name: String!
    startDate: String!
    endDate: String!
    description: String!
    points: String!
  }

  input RedeemPointsInput {
    code: String!
    username: String!
  }

  input RedeemTasksPointsInput{
    name: String!
    username: String!
  }

  input ApproveRejectRequestInput {
    username: String!
    name: String!
  }

  input ManualInputInput {
    username: String!
    name: String!
  }

  input ManualTaskInputInput {
    username: String!
    taskName: String!
  }

  type Query {
    getUsers: [User]
    getUser(userId: ID!): User
    getEvents: [Event]
    getTasks: [Task]
    getRequests: [Request]
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
    createTask(createTaskInput: CreateTaskInput): [Task]
    redeemPoints(redeemPointsInput: RedeemPointsInput): User!
    redeemTasksPoints(redeemTasksPointsInput: RedeemTasksPointsInput): User!
    approveRequest(approveRejectRequestInput: ApproveRejectRequestInput): [Request]
    rejectRequest(approveRejectRequestInput: ApproveRejectRequestInput): [Request]
    manualInput(manualInputInput: ManualInputInput): [Event]
    manualTaskInput(manualTaskInputInput: ManualTaskInputInput): [Task]
    forgotPassword(email: String!): User!
    resetPassword(password: String!, confirmPassword: String!, token: String!): Token!
    confirmUser(id: String!): User!
  }
`;
