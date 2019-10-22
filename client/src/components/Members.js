import React from "react";
import { Grid } from "semantic-ui-react";
import { useQuery } from "@apollo/react-hooks";

import MembersTable from "../components/MembersTable";

import { FETCH_USERS_QUERY } from "../util/graphql";

function Members() {
  var users = useQuery(FETCH_USERS_QUERY).data.getUsers;

  return (
    <Grid>
      <Grid.Column>
        <Grid.Row>
          <MembersTable users={users} />
        </Grid.Row>
      </Grid.Column>
    </Grid>
  );
}

export default Members;
