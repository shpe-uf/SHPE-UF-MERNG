import React from "react";
import { Table, Icon, Dimmer, Loader } from "semantic-ui-react";
import { useQuery } from "@apollo/react-hooks";
import moment from "moment";

import { FETCH_EVENTS_QUERY } from "../util/graphql";

function EventsTable() {
  const {
    data: { getEvents }
  } = useQuery(FETCH_EVENTS_QUERY);

  return (
    <div className="table-responsive">
      <Dimmer active={getEvents ? false : true} inverted>
        <Loader />
      </Dimmer>
      <Table striped selectable unstackable singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Code</Table.HeaderCell>
            <Table.HeaderCell>Category</Table.HeaderCell>
            <Table.HeaderCell>Expiration</Table.HeaderCell>
            <Table.HeaderCell>Semester</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Request</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Attendance</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Points</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {getEvents &&
            getEvents.map((event, index) => (
              <Table.Row key={index}>
                <Table.Cell>{event.name}</Table.Cell>
                <Table.Cell>{event.code}</Table.Cell>
                <Table.Cell>{event.category}</Table.Cell>
                <Table.Cell>
                  {moment(event.expiration)
                    .local()
                    .format("MM/DD/YYYY @ hh:mm A")}
                </Table.Cell>
                <Table.Cell>{event.semester}</Table.Cell>
                <Table.Cell textAlign="center">
                  {event.request === true ? (
                    <Icon className="request-true" name="check" />
                  ) : (
                    <Icon className="request-false" name="x" />
                  )}
                </Table.Cell>
                <Table.Cell textAlign="center">{event.attendance}</Table.Cell>
                <Table.Cell textAlign="center">{event.points}</Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
    </div>
  );
}

export default EventsTable;
