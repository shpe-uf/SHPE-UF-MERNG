import React, { useState } from "react";
import {
  Grid,
  Container,
  Table,
  Tab,
  Modal,
  Button,
  Form
} from "semantic-ui-react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { FETCH_USERS_QUERY, FETCH_EVENTS_QUERY } from "../util/graphql";
import moment from "moment";

import { useForm } from "../util/hooks";

import categoryOptions from "../assets/options/category.json";
import expirationOptions from "../assets/options/expiration.json";

function Admin() {
  const [errors, setErrors] = useState({});

  const {
    data: { getUsers }
  } = useQuery(FETCH_USERS_QUERY);

  const {
    data: { getEvents }
  } = useQuery(FETCH_EVENTS_QUERY);

  const [createEventModal, setCreateEventModal] = useState(false);

  const openModal = name => {
    if (name === "createEvent") {
      setCreateEventModal(true);
    }
  };

  const closeModal = name => {
    if (name === "createEvent") {
      setCreateEventModal(false);
    }
  };

  const { values, onChange, onSubmit } = useForm(createEventCallback, {
    name: "",
    code: "",
    category: ""
  });

  const [createEvent, { error }] = useMutation(CREATE_EVENT_MUTATION, {
    update(
      _,
      {
        data: { createEvent: eventData }
      }
    ) {},

    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
      console.log(errors);
    },

    variables: values
  });

  function createEventCallback() {
    createEvent();
  }

  const panes = [
    {
      menuItem: {
        key: "events",
        icon: "calendar alternate",
        content: "Events"
      },
      render: () => (
        <Tab.Pane>
          <Button onClick={() => openModal("createEvent")}>Create Event</Button>
          <Table striped selectable unstackable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Code</Table.HeaderCell>
                <Table.HeaderCell>Category</Table.HeaderCell>
                <Table.HeaderCell>Expiration</Table.HeaderCell>
                <Table.HeaderCell>Semester</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">Points</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {getEvents &&
                getEvents.map(event => (
                  <Table.Row key={event.name}>
                    <Table.Cell>{event.name}</Table.Cell>
                    <Table.Cell>{event.code}</Table.Cell>
                    <Table.Cell>{event.category}</Table.Cell>
                    <Table.Cell>
                      {moment(event.expiration)
                        .local()
                        .format("MM/DD/YYYY @ hh:mm A")}
                    </Table.Cell>
                    <Table.Cell>{event.semester}</Table.Cell>
                    <Table.Cell textAlign="center">{event.points}</Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table>
        </Tab.Pane>
      )
    },
    {
      menuItem: { key: "members", icon: "users", content: "Members" },
      render: () => (
        <Tab.Pane>
          <Table striped selectable unstackable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
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
              {getUsers &&
                getUsers.map(user => (
                  <Table.Row key={user.username}>
                    <Table.Cell>
                      {user.lastName}, {user.firstName}
                    </Table.Cell>
                    <Table.Cell>{user.username}</Table.Cell>
                    <Table.Cell>{user.email}</Table.Cell>
                    <Table.Cell textAlign="center">
                      {user.fallPoints}
                    </Table.Cell>
                    <Table.Cell textAlign="center">
                      {user.springPoints}
                    </Table.Cell>
                    <Table.Cell textAlign="center">
                      {user.summerPoints}
                    </Table.Cell>
                    <Table.Cell textAlign="center">{user.points}</Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table>
        </Tab.Pane>
      )
    },
    {
      menuItem: {
        key: "requests",
        icon: "clipboard list",
        content: "Requests"
      },
      render: () => <Tab.Pane>Requests go here</Tab.Pane>
    }
  ];

  return (
    <div className="body">
      <Grid>
        <Grid.Row className="no-padding">
          <Grid.Column>
            <div className="masthead masthead-application">
              <Container>
                <h1 className="text-white">Admin Tools</h1>
              </Container>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Container>
        <Tab panes={panes} />

        <Modal open={createEventModal} dimmer="blurring" size="tiny">
          <Modal.Header>
            <h2>Create Event</h2>
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
              <Form onSubmit={onSubmit}>
                <Form.Input
                  type="text"
                  label="Name"
                  name="name"
                  value={values.name}
                  error={error ? true : false}
                  onChange={onChange}
                />
                <Form.Input
                  type="text"
                  label="Code"
                  name="code"
                  value={values.code}
                  error={error ? true : false}
                  onChange={onChange}
                />
                <Form.Field
                  label="Category"
                  control="select"
                  name="category"
                  value={values.category}
                  error={error ? true : false}
                  onChange={onChange}
                >
                  {categoryOptions.map(category => (
                    <option value={category.value} key={category.key}>
                      {category.value}
                    </option>
                  ))}
                </Form.Field>
                <Button color="grey" onClick={() => closeModal("createEvent")}>
                  Cancel
                </Button>
                <Button type="submit" floated="right">
                  Create
                </Button>
              </Form>
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </Container>
    </div>
  );
}

const CREATE_EVENT_MUTATION = gql`
  mutation createEvent($name: String!, $code: String!, $category: String!) {
    createEvent(
      createEventInput: { name: $name, code: $code, category: $category }
    ) {
      name
      code
      category
    }
  }
`;

export default Admin;
