import React, { useContext, useState } from "react";
import { Grid, Container, Button, Modal, Form } from "semantic-ui-react";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";

import { useForm } from "../util/hooks";
import { AuthContext } from "../context/auth";

import Title from "../components/Title";
import PointsBar from "../components/PointsBar";
import PointsTable from "../components/PointsTable";

function Points() {
  const [errors, setErrors] = useState({});
  var getUser = "";

  var {
    user: { id, username }
  } = useContext(AuthContext);

  var { data } = useQuery(FETCH_USER_QUERY, {
    variables: {
      userId: id
    }
  });

  if (data.getUser) {
    getUser = data.getUser;
  }

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
    getUser.message = userData.message;
  }

  return (
    <div className="body">
      <Title title="Points Program" />

      <Container>
        <Grid stackable>
          {getUser && getUser.message && getUser.message !== undefined && (
            <Grid.Row>
              <Grid.Column>
                <div className="ui warning message">
                  <p>{getUser.message}</p>
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
          {getUser && (
            <>
              <Grid.Row>
                <PointsBar user={getUser} />
              </Grid.Row>
              <Grid.Row>
                <PointsTable user={getUser} />
              </Grid.Row>
            </>
          )}
        </Grid>
      </Container>

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
