import React from "react";
import { Container } from "semantic-ui-react";
import { useQuery } from "@apollo/react-hooks";

import MembersTable from "../components/MembersTable";

import { FETCH_USERS_QUERY } from "../util/graphql";

function Members() {
  var users = useQuery(FETCH_USERS_QUERY).data.getUsers;

  return (
    <Container>
      <MembersTable users={users} />
    </Container>
  );
}

export default Members;
