import React from "react";
import { Grid, Table} from "semantic-ui-react";

import moment from "moment";

function PointsTable({ user }) {
  return (
    <Grid.Row>
      <Grid.Column>
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
                  <Table.Row key={event.id}>
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
      </Grid.Column>
    </Grid.Row>
  );
}

export default PointsTable;
