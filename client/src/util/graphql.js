import gql from "graphql-tag";

export const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

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
