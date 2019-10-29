import React from "react";
import { Grid, Table, Segment, Header } from "semantic-ui-react";

import moment from "moment";

function PointsTable({ user }) {
  return (
    <Grid.Row>
      <Grid.Column width={8}>
        <h1>Events</h1>
        {user === undefined || user.events.length === 0 ? (
          <div style={{ paddingBottom: 16 }}>
            <Segment placeholder>
              <Header icon>
                <i className="far fa-frown"></i>
                <p>No events on record.</p>
              </Header>
            </Segment>
          </div>
        ) : (
          <div className="table-responsive">
            <Table striped selectable unstackable singleLine>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Event</Table.HeaderCell>
                  <Table.HeaderCell>Category</Table.HeaderCell>
                  <Table.HeaderCell>Date</Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">Points</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {user &&
                  user.events.map(event => (
                    <Table.Row key={event.name}>
                      <Table.Cell>{event.name}</Table.Cell>
                      <Table.Cell>{event.category}</Table.Cell>
                      <Table.Cell>
                        {moment(event.createdAt)
                          .local()
                          .format("MM/DD/YYYY")}
                      </Table.Cell>
                      <Table.Cell textAlign="center">{event.points}</Table.Cell>
                    </Table.Row>
                  ))}
              </Table.Body>
            </Table>
          </div>
        )}
      </Grid.Column>
      <Grid.Column width={8}>
        <h1>Tasks</h1>
        {user === undefined ||
        user.tasks === undefined ||
        user.tasks.length === 0 ? (
          <Segment placeholder>
            <Header icon>
              <i className="far fa-frown"></i>
              <p>It seems like you haven't completed any tasks.</p>
            </Header>
          </Segment>
        ) : (
          <div className="table-responsive">
            <Table striped selectable unstackable singleLine>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Task</Table.HeaderCell>
                  <Table.HeaderCell>Start Date</Table.HeaderCell>
                  <Table.HeaderCell>End Date</Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">Points</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {user &&
                  user.tasks.map(task => (
                    <Table.Row key={task.name}>
                      <Table.Cell>{task.name}</Table.Cell>
                      <Table.Cell>{task.startDate}</Table.Cell>
                      <Table.Cell>{task.endDate}</Table.Cell>
                      <Table.Cell textAlign="center">{task.points}</Table.Cell>
                    </Table.Row>
                  ))}
              </Table.Body>
            </Table>
          </div>
        )}
      </Grid.Column>
    </Grid.Row>
  );
}

export default PointsTable;
