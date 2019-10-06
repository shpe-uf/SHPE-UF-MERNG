import React, { useState } from "react";
import {
  Grid,
  Container,
  Modal,
  Button,
  Form,
  Menu,
  Segment
} from "semantic-ui-react";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";

import { FETCH_EVENTS_QUERY } from "../util/graphql";
import { useForm } from "../util/hooks";

import Title from "../components/Title";
import EventsTable from "../components/EventsTable";
import MembersTable from "../components/MembersTable";
import RequestsTable from "../components/RequestsTable";

import categoryOptions from "../assets/options/category.json";
import expirationOptions from "../assets/options/expiration.json";

function Admin() {
  const [errors, setErrors] = useState({});

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
      values.points = "";
      values.expiration = "";
      values.request = "false";
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
      values.request = "false";
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

  const [activeItem, setActiveItem] = useState("Events");

  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
  };

  return (
    <div className="body">
      <Title title="Admin Tools" />
      <Container>
        <Menu attached="top" tabular>
          <Menu.Item
            name="Events"
            active={activeItem === "Events"}
            onClick={handleItemClick}
          />
          <Menu.Item
            name="Members"
            active={activeItem === "Members"}
            onClick={handleItemClick}
          />
          <Menu.Item
            name="Requests"
            active={activeItem === "Requests"}
            onClick={handleItemClick}
          />
        </Menu>

        {activeItem === "Events" && (
          <Segment attached="bottom">
            <Grid>
              <Grid.Row>
                <Grid.Column>
                  <Button
                    content="Create Event"
                    icon="pencil"
                    labelPosition="left"
                    onClick={() => openModal("createEvent")}
                    floated="right"
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <EventsTable />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        )}
        {activeItem === "Members" && (
          <Segment attached="bottom">
            <Grid>
              <Grid.Row>
                <Grid.Column>
                  <MembersTable />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        )}
        {activeItem === "Requests" && (
          <Segment attached="bottom">
            <Grid>
              <Grid.Row>
                <Grid.Column>
                  <RequestsTable />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        )}
      </Container>

      <Modal
        open={createEventModal}
        size="tiny"
        closeOnEscape={true}
        closeOnDimmerClick={false}
      >
        <Modal.Header>
          <h2>Create Event</h2>
        </Modal.Header>
        <Modal.Content>
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
                  value={
                    values.category === "Miscellaneous" ? values.points : "0"
                  }
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
