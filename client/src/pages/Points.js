import React, { useContext, useState } from "react";
import gql from "graphql-tag";
import { Grid, Container, Card, Table, Button, Modal } from "semantic-ui-react";
import { useQuery } from "@apollo/react-hooks";
import { AuthContext } from "../context/auth";

function Points() {
  const [errors, setErrors] = useState({});

  var {
    user: { id }
  } = useContext(AuthContext);

  const {
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
      setErrors(false);
      setRedeemPointsModal(false);
    }
  };

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
                  floated="right"
                  onClick={() => openModal("redeemPoints")}
                >
                  Redeem Points
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
              <Table.Row>
                <Table.Cell>Fall General Body Meeting 1</Table.Cell>
                <Table.Cell>General Body Meeting</Table.Cell>
                <Table.Cell>September 4, 2019</Table.Cell>
                <Table.Cell textAlign="center">1</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Fall General Body Meeting 1</Table.Cell>
                <Table.Cell>General Body Meeting</Table.Cell>
                <Table.Cell>September 4, 2019</Table.Cell>
                <Table.Cell textAlign="center">1</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Fall General Body Meeting 1</Table.Cell>
                <Table.Cell>General Body Meeting</Table.Cell>
                <Table.Cell>September 4, 2019</Table.Cell>
                <Table.Cell textAlign="center">1</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Fall General Body Meeting 1</Table.Cell>
                <Table.Cell>General Body Meeting</Table.Cell>
                <Table.Cell>September 4, 2019</Table.Cell>
                <Table.Cell textAlign="center">1</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Fall General Body Meeting 1</Table.Cell>
                <Table.Cell>General Body Meeting</Table.Cell>
                <Table.Cell>September 4, 2019</Table.Cell>
                <Table.Cell textAlign="center">1</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Fall General Body Meeting 1</Table.Cell>
                <Table.Cell>General Body Meeting</Table.Cell>
                <Table.Cell>September 4, 2019</Table.Cell>
                <Table.Cell textAlign="center">1</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Fall General Body Meeting 1</Table.Cell>
                <Table.Cell>General Body Meeting</Table.Cell>
                <Table.Cell>September 4, 2019</Table.Cell>
                <Table.Cell textAlign="center">1</Table.Cell>
              </Table.Row>
            </Table.Body>
            <Table.Footer>
              <Table.Row>
                <Table.HeaderCell>Total Points</Table.HeaderCell>
                <Table.HeaderCell />
                <Table.HeaderCell />
                <Table.HeaderCell textAlign="center">7</Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </Table>
        </div>

        <Modal open={redeemPointsModal} size="tiny">
          <Modal.Header>
            <h2>Redeem Points</h2>
          </Modal.Header>
          <Modal.Content scrolling>
            <Modal.Description>
              <Button color="grey" onClick={() => closeModal("redeemPoints")}>
                Cancel
              </Button>
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </Container>
    </div>
  );
}

const FETCH_USER_QUERY = gql`
  query getUserInfo($userId: ID!) {
    getUser(userId: $userId) {
      points
      fallPoints
      springPoints
      summerPoints
    }
  }
`;

export default Points;
