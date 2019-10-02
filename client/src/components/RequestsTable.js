import React, { useState } from "react";
import {
  Table,
  Icon,
  Button,
  Dimmer,
  Loader,
  Segment,
  Header
} from "semantic-ui-react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import moment from "moment";
import gql from "graphql-tag";

import { FETCH_REQUESTS_QUERY } from "../util/graphql";

function RequestsTable() {
  const [errors, setErrors] = useState({});
  const [disableButton, setDisableButton] = useState(false);

  var {
    data: { getRequests }
  } = useQuery(FETCH_REQUESTS_QUERY);

  const [rejectRequest] = useMutation(REJECT_REQUEST_MUTATION, {
    update(
      _,
      {
        data: { rejectRequest: requestData }
      }
    ) {
      getRequests.map((request, index) => {
        var result = requestData.filter(
          updatedRequests =>
            updatedRequests.eventName === request.eventName &&
            updatedRequests.username === request.username
        );
        if (result.length === 0) {
          getRequests.splice(index, 1);
        }
      });
      setDisableButton(false);
    },

    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    }
  });

  const [approveRequest] = useMutation(APPROVE_REQUEST_MUTATION, {
    update(
      _,
      {
        data: { approveRequest: requestData }
      }
    ) {
      getRequests.map((request, index) => {
        var result = requestData.filter(
          updatedRequests =>
            updatedRequests.eventName === request.eventName &&
            updatedRequests.username === request.username
        );
        if (result.length === 0) {
          getRequests.splice(index, 1);
        }
      });
      setDisableButton(false);
    },

    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    }
  });

  const disableButtonFunction = () => {
    setDisableButton(true);
  };

  return (
    <>
      <Dimmer active={getRequests ? false : true} inverted>
        <Loader />
      </Dimmer>
      {getRequests === undefined || getRequests.length === 0 ? (
        <Segment placeholder>
          <Header icon>
            <i className="fas fa-inbox"></i>
            <p>It seems like there are no requests at this moment.</p>
          </Header>
        </Segment>
      ) : (
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
                      <Button
                        icon
                        color="green"
                        disabled={disableButton}
                        onClick={() => {
                          disableButtonFunction();
                          approveRequest({
                            variables: {
                              username: request.username,
                              eventName: request.eventName
                            }
                          });
                        }}
                      >
                        <Icon name="check" />
                      </Button>
                    </Table.Cell>
                    <Table.Cell textAlign="center">
                      <Button
                        icon
                        color="red"
                        disabled={disableButton}
                        onClick={() => {
                          disableButtonFunction();
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
      )}
    </>
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

const APPROVE_REQUEST_MUTATION = gql`
  mutation approveRequest($username: String!, $eventName: String!) {
    approveRequest(
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
