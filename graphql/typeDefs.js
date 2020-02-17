const gql = require("graphql-tag");


module.exports = gql`
  ### MAIN MODEL TYPES ###

  type User {
    id: ID!
    firstName: String!
    lastName: String!
    photo: String!
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
    bookmarks: [String]!
  }

  type Class {
    code: String!
    users: [User]!
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

  type Corporation {
    name: String!,
    logo: String!,
    slogan: String!,
    majors: [String!]!,
    industries: [String!]!,
    overview: String!,
    mission: String!,
    goals: String!,
    businessModel: String!,
    newsLink: String!,
    applyLink: String!,
    academia: Boolean!,
    govContractor: Boolean!,
    nonProfit: Boolean!,
    visaSponsor: Boolean!,
    shpeSponsor: Boolean!,
    industryPartnership: Boolean!,
    fallBBQ: Boolean!,
    springBBQ: Boolean!,
    nationalConvention: Boolean!
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

  type Alumni {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    undergrad: Undergrad!
    grad: Grad!
    employer: String!
    position: String!
    location: Location
    coordinates: Coordinates!
    linkedin: String!
  }

  ### AUXILIARY TYPES ###
  type StatData {
    _id: String!
    value: Int!
  }

  type Token {
    token: String!
  }

  type Undergrad {
    university: String!
    year: Int!
    major: String!
  }

  type Grad {
    university: String!
    year: Int!
    major: String!
  }

  type Location {
    city: String!
    state: String!
    country: String!
  }

  type Coordinates {
    latitude: Float!
    longitude: Float!
  }

  ### QUERY AND MUTATION INPUTS ###

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

  input CreateClassInput {
    code: String!
    username: String!
  }
  input DeleteClassInput {
    code: String!
    username: String!
  }

  input CreateCorporationInput {
    name: String!,
    logo: String!,
    slogan: String!,
    majors: [String!]!,
    industries: [String!]!,
    overview: String!,
    mission: String!,
    goals: String!,
    businessModel: String!,
    newsLink: String!,
    applyLink: String!,
    academia: String!,
    govContractor: String!,
    nonProfit: String!,
    visaSponsor: String!,
    shpeSponsor: String!,
    industryPartnership: String!,
    fallBBQ: String!,
    springBBQ: String!,
    nationalConvention: String!
  }

  input EditCorporationProfileInput {
    name: String!,
    slogan: String!,
    majors: [String!]!,
    industries: [String!]!,
    overview: String!,
    mission: String!,
    goals: String!,
    businessModel: String!,
    newsLink: String!,
    applyLink: String!,
    academia: String!,
    govContractor: String!,
    nonProfit: String!,
    visaSponsor: String!,
    shpeSponsor: String!,
    industryPartnership: String!,
    fallBBQ: String!,
    springBBQ: String!,
    nationalConvention: String!
  }

  input DeleteCorporationInput {
    name: String!
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

  input RegisterAlumniInput {
    firstName: String!
    lastName: String!
    email: String!
    undergrad: UndergradInput!
    grad: GradInput!
    employer: String!
    position: String!
    location: LocationInput!
    linkedin: String!
  }

  input EditUserProfileInput {
    email: String!
    firstName: String!
    lastName: String!
    photo: String!
    major: String!
    year: String!
    graduating: String!
    country: String!
    ethnicity: String!
    sex: String!
  }

  ### AUXILIARY INPUTS ###
  input UndergradInput {
    university: String!
    year: String!
    major: String!
  }

  input GradInput {
    university: String!
    year: String!
    major: String!
  }

  input LocationInput {
    city: String!
    state: String!
    country: String!
  }

  ### QUERIES LIST ###

  type Query {
    getUsers: [User]
    getUser(userId: ID!): User
    getEvents: [Event]
    getRequests: [Request]
    getMatches(username: String!): [User]
    getCorporations: [Corporation]
    getMajorStat: [StatData]
    getCountryStat: [StatData]
    getYearStat: [StatData]
    getSexStat: [StatData]
    getEthnicityStat: [StatData]
    getAlumnis: [Alumni]
  }

  ### MUTATIONS LIST ###

  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!, remember: String!): User!
    createCorporation(createCorporationInput: CreateCorporationInput): [Corporation]
    updateCorporation(editCorporationProfileInput: EditCorporationProfileInput): [Corporation]
    deleteCorporation(name: String!): Boolean!
    createEvent(createEventInput: CreateEventInput): [Event]
    redeemPoints(redeemPointsInput: RedeemPointsInput): User!
    approveRequest(
      approveRejectRequestInput: ApproveRejectRequestInput
    ): [Request]
    rejectRequest(
      approveRejectRequestInput: ApproveRejectRequestInput
    ): [Request]
    manualInput(manualInputInput: ManualInputInput): [Event]
    createClass(createClassInput: CreateClassInput): [Class]
    deleteClass(deleteClassInput: DeleteClassInput): [Class]
    getClass(code: String!): Class!
    forgotPassword(email: String!): User!
    resetPassword(
      password: String!
      confirmPassword: String!
      token: String!
    ): Token!
    confirmUser(id: String!): User!
    bookmark(company: String!, username: String!): User!
    deleteBookmark(company: String!, username: String!): User!
    registerAlumni(registerAlumniInput: RegisterAlumniInput): Alumni!
    changePermission(email: String!, currentEmail: String!, permission: String!): Boolean!
    editUserProfile(editUserProfileInput: EditUserProfileInput): User!
  }
`;
