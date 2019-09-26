import React, { useState } from "react";
import gql from "graphql-tag";
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
import { useForm } from "../util/hooks";

import { FETCH_USERS_QUERY, FETCH_EVENTS_QUERY } from "../util/graphql";
import moment from "moment";

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
      values.name = "";
      values.code = "";
      values.category = "";
      values.expiration = "";
      setErrors(false);
      setCreateEventModal(false);
    }
  };

  const { values, onChange, onSubmit } = useForm(createEventCallback, {
    name: "",
    code: "",
    category: "",
    expiration: ""
  });

  const [createEvent, { loading }] = useMutation(CREATE_EVENT_MUTATION, {
    update(
      _,
      {
        data: { createEvent: eventData }
      }
    ) {
      getEvents.push(eventData);
      values.name = "";
      values.code = "";
      values.category = "";
      values.expiration = "";
      setCreateEventModal(false);
    },

    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
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
          <Grid>
            <Grid.Row>
              <Grid.Column>
                <Button
                  floated="right"
                  onClick={() => openModal("createEvent")}
                >
                  Create Event
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <div className="table-responsive">
            <Table striped selectable unstackable singleLine>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell>Code</Table.HeaderCell>
                  <Table.HeaderCell>Category</Table.HeaderCell>
                  <Table.HeaderCell>Expiration</Table.HeaderCell>
                  <Table.HeaderCell>Semester</Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">
                    Attendance
                  </Table.HeaderCell>
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
                      <Table.Cell textAlign="center">
                        {event.attendance}
                      </Table.Cell>
                      <Table.Cell textAlign="center">{event.points}</Table.Cell>
                    </Table.Row>
                  ))}
              </Table.Body>
            </Table>
          </div>
        </Tab.Pane>
      )
    },
    {
      menuItem: { key: "members", icon: "users", content: "Members" },
      render: () => (
        <Tab.Pane>
          <div className="table-responsive">
            <Table striped selectable unstackable singleLine>
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
          </div>
        </Tab.Pane>
      )
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

        <Modal
          open={createEventModal}
          size="tiny"
          closeOnEscape={true}
          closeOnDimmerClick={false}
        >
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
              <Form
                onSubmit={onSubmit}
                noValidate
                className={loading ? "loading" : ""}
              >
                <Form.Input
                  type="text"
                  label="Name"
                  name="name"
                  value={values.name}
                  error={errors.name ? true : false}
                  onChange={onChange}
                />
                <Form.Input
                  type="text"
                  label="Code"
                  name="code"
                  value={values.code}
                  error={errors.code ? true : false}
                  onChange={onChange}
                />
                <Form.Field
                  control="select"
                  label="Category"
                  name="category"
                  value={values.category}
                  error={errors.category ? true : false}
                  onChange={onChange}
                >
                  {categoryOptions.map(category => (
                    <option value={category.value} key={category.key}>
                      {category.value} ({category.points})
                    </option>
                  ))}
                </Form.Field>
                <Form.Field
                  control="select"
                  label="Expires in"
                  name="expiration"
                  value={values.expiration}
                  error={errors.expiration ? true : false}
                  onChange={onChange}
                >
                  {expirationOptions.map(expiration => (
                    <option value={expiration.value} key={expiration.key}>
                      {expiration.key}
                    </option>
                  ))}
                </Form.Field>
                <Button type="reset" color="grey" onClick={() => closeModal("createEvent")}>
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
  mutation createEvent(
    $name: String!
    $code: String!
    $category: String!
    $expiration: String!
  ) {
    createEvent(
      createEventInput: {
        name: $name
        code: $code
        category: $category
        expiration: $expiration
      }
    ) {
      name
      code
      category
      expiration
      semester
      points
      createdAt
      attendance
    }
  }
`;

export default Admin;
