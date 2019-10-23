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
      id
      name
      code
      category
      points
      request
      attendance
      expiration
      semester
      createdAt
      users {
        firstName
        lastName
        username
        email
      }
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

export const FETCH_TASKS_QUERY = gql`
  {
    getTasks {
      id
      name
      startDate
      endDate
      description
      points
      attendance
      semester
      createdAt
      users {
        firstName
        lastName
        username
        email
      }
    }
  }
`;
