import React, { useState } from "react";
import {
  Table,
  Icon,
  Dimmer,
  Loader,
  Segment,
  Header,
  Button,
  Modal,
  Form,
  Dropdown
} from "semantic-ui-react";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import moment from "moment";

import { FETCH_EVENTS_QUERY, FETCH_USERS_QUERY } from "../util/graphql";
import { useForm } from "../util/hooks";

function EventsTable() {
  const [errors, setErrors] = useState({});

  const {
    data: { getEvents }
  } = useQuery(FETCH_EVENTS_QUERY);

  var getUsers = [
    {
      username: "",
      firstName: "",
      lastName: ""
    }
  ];

  var userData = useQuery(FETCH_USERS_QUERY).data.getUsers;

  if (userData) {
    userData.map(user => {
      getUsers.push(user);
    });
  }

  const [manualInputModal, setManualInputModal] = useState(false);

  const openModal = name => {
    if (name === "manualInput") {
      setManualInputModal(true);
    }
  };

  const closeModal = name => {
    if (name === "manualInput") {
      values.username = "";
      values.eventName = "";
      setErrors(false);
      setManualInputModal(false);
    }
  };

  const { values, onChange, onSubmit } = useForm(manualInputCallback, {
    username: "",
    eventName: ""
  });

  const [manualInput, { loading }] = useMutation(MANUAL_INPUT_MUTATION, {
    update(
      _,
      {
        data: { manualInput: userData }
      }
    ) {
      values.username = "";
      values.eventName = "";
      setErrors(false);
      setManualInputModal(false);
    },

    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },

    variables: values
  });

  function manualInputCallback() {
    manualInput();
  }

  function setEventNameValue(eventName) {
    values.eventName = eventName;
  }

  return (
    <>
      <Dimmer active={getEvents ? false : true} inverted>
        <Loader />
      </Dimmer>
      {getEvents === undefined || getEvents.length === 0 ? (
        <Segment placeholder>
          <Header icon>
            <i className="fas fa-inbox"></i>
            <p>It seems like there are no events at this moment.</p>
          </Header>
        </Segment>
      ) : (
        <div className="table-responsive">
          <Table striped selectable unstackable singleLine>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Code</Table.HeaderCell>
                <Table.HeaderCell>Category</Table.HeaderCell>
                <Table.HeaderCell>Expiration</Table.HeaderCell>
                <Table.HeaderCell>Semester</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">Request</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">
                  Attendance
                </Table.HeaderCell>
                <Table.HeaderCell textAlign="center">Points</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">
                  Manual Input
                </Table.HeaderCell>
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
                    <Table.Cell textAlign="center">
                      {event.attendance}
                    </Table.Cell>
                    <Table.Cell textAlign="center">{event.points}</Table.Cell>
                    <Table.Cell textAlign="center">
                      <Button
                        icon
                        onClick={() => {
                          setEventNameValue(event.name);
                          openModal("manualInput");
                        }}
                      >
                        <Icon name="i cursor" />
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table>
        </div>
      )}
      <Modal
        open={manualInputModal}
        size="tiny"
        closeOnEscape={true}
        closeOnDimmerClick={false}
      >
        <Modal.Header>
          <h2>Manual Input</h2>
        </Modal.Header>
        <Modal.Content scrolling>
          <Modal.Description>
            {Object.keys(errors).length > 0 && (
              <div className="ui error message">
                <ul className="list">
                  {Object.values(errors).map(value => (
                    <li key={value}>{value}</li>
                  ))}
                </ul>
              </div>
            )}
            <Form
              onSubmit={onSubmit}
              noValidate
              className={loading ? "loading" : ""}
            >
              {/*
              <Form.Input
                type="text"
                label="Member's Username"
                name="username"
                value={values.username}
                error={errors.username ? true : false}
                onChange={onChange}
              />
              */}
              <Form.Field
                control="select"
                label="Member"
                name="username"
                value={values.username}
                error={errors.username ? true : false}
                onChange={onChange}
              >
                {getUsers &&
                  getUsers.map(user =>
                    user.username === "" ? (
                      <option value={user.username} key={user.username}>
                        {user.lastName + user.firstName}
                      </option>
                    ) : (
                      <option value={user.username} key={user.username}>
                        {user.lastName + ", " + user.firstName}
                      </option>
                    )
                  )}
              </Form.Field>
              <Button
                type="reset"
                color="grey"
                onClick={() => closeModal("manualInput")}
              >
                Cancel
              </Button>
              <Button type="submit" floated="right">
                Submit
              </Button>
            </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    </>
  );
}

const MANUAL_INPUT_MUTATION = gql`
  mutation manualInput($username: String!, $eventName: String!) {
    manualInput(
      manualInputInput: { username: $username, eventName: $eventName }
    ) {
      username
      firstName
      lastName
    }
  }
`;

export default EventsTable;
