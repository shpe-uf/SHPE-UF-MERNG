import React from "react";
import { Table, Icon, Button } from "semantic-ui-react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import moment from "moment";
import gql from "graphql-tag";

import { FETCH_REQUESTS_QUERY } from "../util/graphql";

function RequestsTable() {
  const {
    data: { getRequests }
  } = useQuery(FETCH_REQUESTS_QUERY);

  return (
    <div className="table-responsive">
      <Table striped selectable unstackable singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Username</Table.HeaderCell>
            <Table.HeaderCell>Event</Table.HeaderCell>
            <Table.HeaderCell>Category</Table.HeaderCell>
            <Table.HeaderCell>Date</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Points</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Approve</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Reject</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {getRequests &&
            getRequests.map((request, index) => (
              <Table.Row key={index}>
                <Table.Cell>
                  {request.lastName}, {request.firstName}
                </Table.Cell>
                <Table.Cell>{request.username}</Table.Cell>
                <Table.Cell>{request.eventName}</Table.Cell>
                <Table.Cell>{request.category}</Table.Cell>
                <Table.Cell>
                  {moment(request.createdAt)
                    .local()
                    .format("MM/DD/YYYY @ hh:mm A")}
                </Table.Cell>
                <Table.Cell textAlign="center">{request.points}</Table.Cell>
                <Table.Cell textAlign="center">
                  <Button icon color="green">
                    <Icon name="check" />
                  </Button>
                </Table.Cell>
                <Table.Cell textAlign="center">
                  <Button icon color="red">
                    <Icon name="x" />
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
    </div>
  );
}

const REJECT_REQUEST_MUTATION = gql`
  mutation rejectRequest($username: String!, $name: String!) {
    rejectRequest(rejectRequestInput: { username: $username, name: $name }) {
      name
      code
      category
      expiration
      request
      semester
      points
      createdAt
      attendance
    }
  }
`;
export default RequestsTable;
