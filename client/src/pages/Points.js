import React, { useContext, useState } from "react";
import gql from "graphql-tag";
import {
  Grid,
  Container,
  Card,
  Table,
  Button,
  Modal,
  Form,
  Icon
} from "semantic-ui-react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import moment from "moment";

import { useForm } from "../util/hooks";
import { AuthContext } from "../context/auth";

function Points() {
  const [errors, setErrors] = useState({});

  var {
    user: { id, username }
  } = useContext(AuthContext);

  var {
    data: { getUser }
  } = useQuery(FETCH_USER_QUERY, {
    variables: {
      userId: id
    }
  });

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
    getUser.fallPoints = userData.fallPoints;
    getUser.springPoints = userData.springPoints;
    getUser.summerPoints = userData.summerPoints;
    getUser.events = userData.events;
  }

  return (
    <div className="body">
      <div className="masthead masthead-application">
        <Container>
          <Grid stackable columns={2}>
            <Grid.Row className="no-padding">
              <Grid.Column>
                <h1 className="text-white">Points System</h1>
              </Grid.Column>
              <Grid.Column>
                <Button
                  secondary
                  icon
                  floated="right"
                  onClick={() => openModal("redeemPoints")}
                >
                  <Icon name="plus" />
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
      <Container>
        <Grid stackable columns={3}>
          <Grid.Row>
            <Grid.Column className="card-points">
              <Card fluid className="fall">
                <Card.Content>
                  <p className="points-header">Fall Points</p>
                  <p className="points-number">
                    {getUser ? getUser.fallPoints : "0"}
                  </p>
                  <p className="points-header">0 Percentile</p>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column className="card-points">
              <Card fluid className="spring">
                <Card.Content>
                  <p className="points-header">Spring Points</p>
                  <p className="points-number">
                    {getUser ? getUser.springPoints : "0"}
                  </p>
                  <p className="points-header">0 Percentile</p>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column className="card-points">
              <Card fluid className="summer">
                <Card.Content>
                  <p className="points-header">Summer Points</p>
                  <p className="points-number">
                    {getUser ? getUser.summerPoints : "0"}
                  </p>
                  <p className="points-header">0 Percentile</p>
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <div className="table-responsive">
          <Table striped selectable unstackable singleLine>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Event</Table.HeaderCell>
                <Table.HeaderCell>Category</Table.HeaderCell>
                <Table.HeaderCell>Date</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">Points</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {getUser &&
                getUser.events.map(event => (
                  <Table.Row key={event.id}>
                    <Table.Cell>{event.name}</Table.Cell>
                    <Table.Cell>{event.category}</Table.Cell>
                    <Table.Cell>
                      {moment(event.createdAt)
                        .local()
                        .format("MM/DD/YYYY")}
                    </Table.Cell>
                    <Table.Cell textAlign="center">{event.points}</Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table>
        </div>

        <Modal open={redeemPointsModal} size="tiny">
          <Modal.Header>
            <h2>Redeem Points</h2>
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
        id
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
