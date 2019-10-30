import React, { useContext, useState } from "react";
import {
  Grid,
  Container,
  Card,
  Menu,
  Segment,
  Button,
  Modal,
  Form
} from "semantic-ui-react";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";

import { useForm } from "../util/hooks";
import { AuthContext } from "../context/auth";

import Title from "../components/Title";
import PointsBar from "../components/PointsBar";
import UserEventsTable from "../components/UserEventsTable";

import { FETCH_TASKS_QUERY } from "../util/graphql";

function Points() {
  const [activeItem, setActiveItem] = useState("Your Points");

  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
  };

  const [errors, setErrors] = useState({});
  var {
    user: { id, username }
  } = useContext(AuthContext);

  var user = useQuery(FETCH_USER_QUERY, {
    variables: {
      userId: id
    }
  }).data.getUser;

  var tasks = useQuery(FETCH_TASKS_QUERY).data.getTasks;

  const [redeemPointsModal, setRedeemPointsModal] = useState(false);

  const openModal = name => {
    if (name === "redeemPoints") {
      setRedeemPointsModal(true);
    }
  };

  const closeModal = name => {
    if (name === "redeemPoints") {
      values.code = "";
      setErrors(false);
      setRedeemPointsModal(false);
    }
  };

  const { values, onChange, onSubmit } = useForm(redeemPointsCallback, {
    code: "",
    username: username
  });

  const [redeemPoints, { loading }] = useMutation(REDEEM_POINTS_MUTATION, {
    update(
      _,
      {
        data: { redeemPoints: userData }
      }
    ) {
      values.code = "";
      setErrors(false);
      setRedeemPointsModal(false);
      updateGetUser(userData);
    },

    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },

    variables: values
  });

  function redeemPointsCallback() {
    redeemPoints();
  }

  function updateGetUser(userData) {
    user.fallPoints = userData.fallPoints;
    user.springPoints = userData.springPoints;
    user.summerPoints = userData.summerPoints;
    user.events = userData.events;
    user.tasks = userData.tasks;
    user.message = userData.message;
  }

  return (
    <div className="body">
      <Title title="Points Program" />
      <Container>
        <Menu attached="top" tabular>
          <Menu.Item
            name="Your Points"
            active={activeItem === "Your Points"}
            onClick={handleItemClick}
          />
          <Menu.Item
            name="Tasks"
            active={activeItem === "Tasks"}
            onClick={handleItemClick}
          />
        </Menu>

        {activeItem === "Your Points" && (
          <Segment attached="bottom">
            <Grid stackable>
              {user && user.message && user.message !== undefined && (
                <Grid.Row>
                  <Grid.Column>
                    <div className="ui warning message">
                      <p>{user.message}</p>
                    </div>
                  </Grid.Column>
                </Grid.Row>
              )}
              <Grid.Row>
                <Grid.Column>
                  <Button
                    content="Redeem Code"
                    icon="font"
                    labelPosition="left"
                    floated="right"
                    onClick={() => openModal("redeemPoints")}
                  />
                </Grid.Column>
              </Grid.Row>
              {user && (
                <>
                  <PointsBar user={user} />
                  <UserEventsTable user={user} />
                </>
              )}
            </Grid>

            <Modal open={redeemPointsModal} size="tiny">
              <Modal.Header>
                <h2>Redeem Points</h2>
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
                      label="Event Code"
                      name="code"
                      value={values.code}
                      error={errors.code ? true : false}
                      onChange={onChange}
                    />
                    <Button
                      type="reset"
                      color="grey"
                      onClick={() => closeModal("redeemPoints")}
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
          </Segment>
        )}
        {activeItem === "Tasks" && (
          <Segment attached="bottom">
            <Grid stackable>
              {user && user.message && user.message !== undefined && (
                <Grid.Row>
                  <Grid.Column>
                    <div className="ui warning message">
                      <p>{user.message}</p>
                    </div>
                  </Grid.Column>
                </Grid.Row>
              )}
              <Card.Group itemsPerRow={3}>
                {tasks &&
                  tasks.map((task, index) => (
                    <Card color="blue">
                      <Card.Content>
                        <Grid.Row itemsPerRow={2}>
                          <Grid.Column width={13}>
                            <Card.Header>{task.name}</Card.Header>
                          </Grid.Column>
                          <Grid.Column width={3}>
                            <Card.Header floated="right">
                              {task.points}
                            </Card.Header>
                          </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                          <Card.Meta>
                            {task.startDate} - {task.endDate}
                          </Card.Meta>
                          <Card.Description>
                            {task.description}
                          </Card.Description>
                        </Grid.Row>
                      </Card.Content>
                    </Card>
                  ))}
              </Card.Group>
            </Grid>
          </Segment>
        )}
      </Container>
    </div>
  );
}

const FETCH_USER_QUERY = gql`
  query getUser($userId: ID!) {
    getUser(userId: $userId) {
      firstName
      lastName
      points
      fallPoints
      springPoints
      summerPoints
      events {
        name
        category
        createdAt
        points
      }
    }
  }
`;

const REDEEM_POINTS_MUTATION = gql`
  mutation redeemPoints($code: String!, $username: String!) {
    redeemPoints(redeemPointsInput: { code: $code, username: $username }) {
      points
      fallPoints
      springPoints
      summerPoints
      message
      events {
        id
        name
        category
        createdAt
        points
      }
    }
  }
`;

export default Points;
