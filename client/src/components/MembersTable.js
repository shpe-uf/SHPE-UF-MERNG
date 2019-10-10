import React from "react";
import { Table, Dimmer, Loader } from "semantic-ui-react";
import { useQuery } from "@apollo/react-hooks";

import { FETCH_USERS_QUERY } from "../util/graphql";

function MembersTable() {
  var getUsers = "";

  var { data } = useQuery(FETCH_USERS_QUERY);

  if (data.getUsers) {
    getUsers = data.getUsers;
  }

  return (
    <div className="table-responsive">
      <Dimmer active={getUsers ? false : true} inverted>
        <Loader />
      </Dimmer>
      <Table striped selectable unstackable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Username</Table.HeaderCell>
            <Table.HeaderCell>E-mail</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Fall Points</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">
              Spring Points
            </Table.HeaderCell>
            <Table.HeaderCell textAlign="center">
              Summer Points
            </Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Total Points</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {getUsers &&
            getUsers.map((member, index) => (
              <Table.Row key={index}>
                <Table.Cell>
                  {member.lastName}, {member.firstName}
                </Table.Cell>
                <Table.Cell>{member.username}</Table.Cell>
                <Table.Cell>{member.email}</Table.Cell>
                <Table.Cell textAlign="center">{member.fallPoints}</Table.Cell>
                <Table.Cell textAlign="center">
                  {member.springPoints}
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {member.summerPoints}
                </Table.Cell>
                <Table.Cell textAlign="center">{member.points}</Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
    </div>
  );
}

export default MembersTable;
