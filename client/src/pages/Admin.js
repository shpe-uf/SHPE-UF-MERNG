import React from "react";
import { Grid, Container, Table, Tab } from "semantic-ui-react";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_USERS_QUERY } from "../util/graphql";

function Admin() {
  const {
    data: { getUsers }
  } = useQuery(FETCH_USERS_QUERY);

  const panes = [
    {
      menuItem: "Requests",
      render: () => <Tab.Pane>Requests go here</Tab.Pane>
    },
    {
      menuItem: "Members",
      render: () => (
        <Tab.Pane>
          <Table striped selectable unstackable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Last Name</Table.HeaderCell>
                <Table.HeaderCell>First Name</Table.HeaderCell>
                <Table.HeaderCell>Username</Table.HeaderCell>
                <Table.HeaderCell>E-mail</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">
                  Fall Points
                </Table.HeaderCell>
                <Table.HeaderCell textAlign="center">
                  Spring Points
                </Table.HeaderCell>
                <Table.HeaderCell textAlign="center">
                  Summer Points
                </Table.HeaderCell>
                <Table.HeaderCell textAlign="center">
                  Total Points
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {getUsers.map(user => (
                <Table.Row key={user.username}>
                  <Table.Cell>{user.lastName}</Table.Cell>
                  <Table.Cell>{user.firstName}</Table.Cell>
                  <Table.Cell>{user.username}</Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell textAlign="center">{user.fallPoints}</Table.Cell>
                  <Table.Cell textAlign="center">{user.springPoints}</Table.Cell>
                  <Table.Cell textAlign="center">{user.summerPoints}</Table.Cell>
                  <Table.Cell textAlign="center">{user.points}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Tab.Pane>
      )
    },
    {
      menuItem: "Events",
      render: () => <Tab.Pane>Events go heret</Tab.Pane>
    }
  ];

  return (
    <div className="body">
      <Grid>
        <Grid.Row className="no-padding">
          <Grid.Column>
            <div className="masthead masthead-application">
              <Container>
                <h1 className="text-white">Admin Panel</h1>
              </Container>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Container>
        <Tab panes={panes} />
      </Container>
    </div>
  );
}

export default Admin;
