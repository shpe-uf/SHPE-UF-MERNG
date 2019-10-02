import React, { useState } from "react";
import { Table, Icon, Button, Dimmer, Loader } from "semantic-ui-react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import moment from "moment";
import gql from "graphql-tag";

import { FETCH_REQUESTS_QUERY } from "../util/graphql";

function RequestsTable() {
  const [errors, setErrors] = useState({});

  var values = {};

  var {
    data: { getRequests }
  } = useQuery(FETCH_REQUESTS_QUERY);

  // const [rejectRequest, { data }] = useMutation(REJECT_REQUEST_MUTATION);

  const [rejectRequest, { data }] = useMutation(REJECT_REQUEST_MUTATION, {
    update(
      _,
      {
        data: { rejectRequest: requestData }
      }
    ) {
      getRequests.map((request, index) => {
        var result = requestData.filter(student => (student.eventName === request.eventName) && (student.username === request.username));
        if (result.length === 0) {
          getRequests.splice(index, 1);
        }
      });
    },

    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    }
  });

  return (
    <div className="table-responsive">
      <Dimmer active={getRequests ? false : true} inverted>
        <Loader />
      </Dimmer>
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
                  <Button
                    icon
                    color="red"
                    onClick={() => {
                      rejectRequest({
                        variables: {
                          username: request.username,
                          eventName: request.eventName
                        }
                      });
                    }}
                  >
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
  mutation rejectRequest($username: String!, $eventName: String!) {
    rejectRequest(
      approveRejectRequestInput: { username: $username, eventName: $eventName }
    ) {
      eventName
      category
      points
      firstName
      lastName
      username
      createdAt
    }
  }
`;

export default RequestsTable;
