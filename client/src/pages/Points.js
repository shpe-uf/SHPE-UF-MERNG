import React, { useContext } from "react";
import gql from "graphql-tag";
import { Grid, Container, Card, Table } from "semantic-ui-react";
import { useQuery } from "@apollo/react-hooks";
import { AuthContext } from "../context/auth";

function Points() {
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

  return (
    <div className="body">
      <Grid>
        <Grid.Row className="no-padding">
          <Grid.Column>
            <div className="masthead masthead-application">
              <Container>
                <h1 className="text-white">Points System</h1>
              </Container>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Container>
        <Grid stackable columns={3}>
          <Grid.Row>
            <Grid.Column className="card-points">
              <Card fluid className="fall">
                <Card.Content>
                  <p className="points-header">Fall Points</p>
                  <p className="points-number">
                    {getUser ? getUser.fallPoints : "00"}
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
                    {getUser ? getUser.springPoints : "00"}
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
                    {getUser ? getUser.summerPoints : "00"}
                  </p>
                  <p className="points-header">0 Percentile</p>
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Table striped selectable unstackable>
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
