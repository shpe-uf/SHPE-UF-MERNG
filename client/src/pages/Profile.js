import React, { useContext } from "react";
import gql from "graphql-tag";
import { Grid, Container, Table, Image } from "semantic-ui-react";
import { useQuery } from "@apollo/react-hooks";
import moment from "moment";

import { AuthContext } from "../context/auth";

import placeholder from "../assets/images/placeholder.png";

function Profile() {
  var {
    user: { id }
  } = useContext(AuthContext);

  var {
    data: { getUser }
  } = useQuery(FETCH_USER_QUERY, {
    variables: {
      userId: id
    }
  });

  return (
    <div className="body">
      <div className="masthead masthead-application">
        <Container>
          <Grid stackable>
            <Grid.Row className="no-padding">
              <Grid.Column>
                <h1 className="text-white">My Profile</h1>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
      <Container>
        <Grid stackable>
          <Grid.Row>
            <Grid.Column width={8}>
              <Image
                fluid
                rounded
                src={placeholder}
                className="image-profile"
              />
            </Grid.Column>
            <Grid.Column width={8}>
              <Table striped selectable singleLine>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>
                      <p>Name:</p>
                    </Table.Cell>
                    <Table.Cell>
                      {getUser ? (
                        <p>
                          {getUser.firstName} {getUser.lastName}
                        </p>
                      ) : (
                        <p>Loading</p>
                      )}
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <p>Username:</p>
                    </Table.Cell>
                    <Table.Cell>
                      {getUser ? <p>{getUser.username}</p> : <p>Loading</p>}
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <p>Email:</p>
                    </Table.Cell>
                    <Table.Cell>
                      {getUser ? <p>{getUser.email}</p> : <p>Loading</p>}
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <p>Major:</p>
                    </Table.Cell>
                    <Table.Cell>
                      {getUser ? <p>{getUser.major}</p> : <p>Loading</p>}
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <p>Year:</p>
                    </Table.Cell>
                    <Table.Cell>
                      {getUser ? <p>{getUser.year}</p> : <p>Loading</p>}
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <p>Graduating:</p>
                    </Table.Cell>
                    <Table.Cell>
                      {getUser ? <p>{getUser.graduating}</p> : <p>Loading</p>}
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <p>Country:</p>
                    </Table.Cell>
                    <Table.Cell>
                      {getUser ? <p>{getUser.country}</p> : <p>Loading</p>}
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <p>Ethnicity:</p>
                    </Table.Cell>
                    <Table.Cell>
                      {getUser ? <p>{getUser.ethnicity}</p> : <p>Loading</p>}
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <p>Sex:</p>
                    </Table.Cell>
                    <Table.Cell>
                      {getUser ? <p>{getUser.sex}</p> : <p>Loading</p>}
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <p>Member Since:</p>
                    </Table.Cell>
                    <Table.Cell>
                      {getUser ? (
                        <p>
                          {moment(getUser.createdAt)
                            .local()
                            .format("MM/DD/YYYY")}
                        </p>
                      ) : (
                        <p>Loading</p>
                      )}
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <p>Permission:</p>
                    </Table.Cell>
                    <Table.Cell>
                      {getUser ? <p>{getUser.permission}</p> : <p>Loading</p>}
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </div>
  );
}

const FETCH_USER_QUERY = gql`
  query getUser($userId: ID!) {
    getUser(userId: $userId) {
      firstName
      lastName
      username
      email
      major
      year
      graduating
      country
      ethnicity
      sex
      createdAt
      permission
    }
  }
`;

export default Profile;
