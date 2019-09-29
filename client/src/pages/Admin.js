import React, { useState } from "react";
import gql from "graphql-tag";
import {
  Grid,
  Container,
  Table,
  Tab,
  Modal,
  Button,
  Form,
  Icon
} from "semantic-ui-react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { useForm } from "../util/hooks";

import {
  FETCH_USERS_QUERY,
  FETCH_EVENTS_QUERY,
  FETCH_REQUESTS_QUERY
} from "../util/graphql";
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

  const {
    data: { getRequests }
  } = useQuery(FETCH_REQUESTS_QUERY);

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
      values.points = "";
      values.expiration = "";
      setErrors(false);
      setCreateEventModal(false);
    }
  };

  const { values, onChange, onSubmit } = useForm(createEventCallback, {
    name: "",
    code: "",
    category: "",
    expiration: "",
    points: "",
    request: "false"
  });

  const [createEvent, { loading }] = useMutation(CREATE_EVENT_MUTATION, {
    update(
      _,
      {
        data: { createEvent: eventData }
      }
    ) {
      values.name = "";
      values.code = "";
      values.category = "";
      values.points = "";
      values.expiration = "";
      setErrors(false);
      setCreateEventModal(false);
      getEvents.push(eventData);
    },

    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },

    variables: values
  });

  function createEventCallback() {
    createEvent();
  }

  console.log(errors);

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
                    Request
                  </Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">
                    Attendance
                  </Table.HeaderCell>
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
                          <Icon name="check" />
                        ) : (
                          <Icon name="x" />
                        )}
                      </Table.Cell>
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
                  getUsers.map((user, index) => (
                    <Table.Row key={index}>
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
    },
    {
      menuItem: { key: "requests", icon: "exclamation", content: "Requests" },
      render: () => (
        <Tab.Pane>
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
                      <Table.Cell textAlign="center">
                        {request.points}
                      </Table.Cell>
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
      <div className="masthead masthead-application">
        <Container>
          <Grid stackable>
            <Grid.Row className="no-padding">
              <Grid.Column>
                <h1 className="text-white">Admin Tools</h1>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
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
                  {categoryOptions.map(category =>
                    category.points === 0 ? (
                      <option value={category.value} key={category.key}>
                        {category.value}
                      </option>
                    ) : (
                      <option value={category.value} key={category.key}>
                        {category.value} ({category.points})
                      </option>
                    )
                  )}
                </Form.Field>
                {values.category === "Miscellaneous" ? (
                  <Form.Input
                    type="text"
                    label="Points"
                    name="points"
                    value={values.category === "Miscellaneous" ? values.points : "0"}
                    error={errors.points ? true : false}
                    onChange={onChange}
                  />
                ) : (
                  <></>
                )}
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
                <Form.Field>
                  <div className="ui toggle checkbox">
                    <input
                      type="checkbox"
                      name="request"
                      value={values.request === "true" ? false : true}
                      onChange={onChange}
                    />
                    <label>Request?</label>
                  </div>
                </Form.Field>
                <Button
                  type="reset"
                  color="grey"
                  onClick={() => closeModal("createEvent")}
                >
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
    $points: String!
    $expiration: String!
    $request: String!
  ) {
    createEvent(
      createEventInput: {
        name: $name
        code: $code
        category: $category
        points: $points
        expiration: $expiration
        request: $request
      }
    ) {
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

export default Admin;
