import gql from "graphql-tag";

export const FETCH_USERS_QUERY = gql`
  {
    getUsers {
      firstName
      lastName
      major
      year
      graduating
      country
      ethnicity
      sex
      username
      email
      createdAt
      points
      fallPoints
      springPoints
      summerPoints
      permission
      listServ
    }
  }
`;

export const FETCH_EVENTS_QUERY = gql`
  {
    getEvents {
      name
      code
      category
      points
      request
      attendance
      expiration
      semester
      createdAt
    }
  }
`;

export const FETCH_REQUESTS_QUERY = gql`
{
  getRequests {
    eventName
    category
    points
    firstName
    lastName
    username
    createdAt
  }
}
`;
