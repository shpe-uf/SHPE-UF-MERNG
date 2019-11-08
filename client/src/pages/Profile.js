import React, { useContext } from "react";
import gql from "graphql-tag";
import { Container } from "semantic-ui-react";
import { useQuery } from "@apollo/react-hooks";
import { AuthContext } from "../context/auth";

import Title from "../components/Title";
import UserProfile from "../components/UserProfile";

function Profile() {
  var {
    user: { id }
  } = useContext(AuthContext);

  var user = useQuery(FETCH_USER_QUERY, {
    variables: {
      userId: id
    }
  }).data.getUser;

  return (
    <div className="body">
      <Title title="My Profile" />
      <Container>
        <UserProfile user={user} />
      </Container>
    </div>
  );
}

const FETCH_USER_QUERY = gql`
  query getUser($userId: ID!) {
    getUser(userId: $userId) {
      firstName
      lastName
      username
      email
      major
      year
      graduating
      country
      ethnicity
      sex
      createdAt
      permission
    }
  }
`;

export default Profile;
