import React from "react";
import { Grid, Image, Table } from "semantic-ui-react";
import moment from "moment";

import placeholder from "../assets/images/placeholder.png";

function UserProfile({ user }) {
  return (
    <Grid columns={2} doubling>
      <Grid.Row>
        <Grid.Column>
          {user ? (
            <Image fluid rounded src={user.photo} className="image-profile" />
          ) : (
            <Image fluid rounded src={placeholder} className="image-profile" />
          )}
        </Grid.Column>
        <Grid.Column>
          <div className="table-responsive">
            <Table striped selectable unstackable>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>
                    <p>Name:</p>
                  </Table.Cell>
                  <Table.Cell>
                    {user ? (
                      <p>
                        {user.firstName} {user.lastName}
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
                    {user ? <p>{user.username}</p> : <p>Loading</p>}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <p>Email:</p>
                  </Table.Cell>
                  <Table.Cell>
                    {user ? <p>{user.email}</p> : <p>Loading</p>}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <p>Major:</p>
                  </Table.Cell>
                  <Table.Cell>
                    {user ? <p>{user.major}</p> : <p>Loading</p>}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <p>Year:</p>
                  </Table.Cell>
                  <Table.Cell>
                    {user ? <p>{user.year}</p> : <p>Loading</p>}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <p>Graduating:</p>
                  </Table.Cell>
                  <Table.Cell>
                    {user ? <p>{user.graduating}</p> : <p>Loading</p>}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <p>Country:</p>
                  </Table.Cell>
                  <Table.Cell>
                    {user ? <p>{user.country}</p> : <p>Loading</p>}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <p>Ethnicity:</p>
                  </Table.Cell>
                  <Table.Cell>
                    {user ? <p>{user.ethnicity}</p> : <p>Loading</p>}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <p>Sex:</p>
                  </Table.Cell>
                  <Table.Cell>
                    {user ? <p>{user.sex}</p> : <p>Loading</p>}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <p>Member Since:</p>
                  </Table.Cell>
                  <Table.Cell>
                    {user ? (
                      <p>
                        {moment(user.createdAt)
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
                    {user ? <p>{user.permission}</p> : <p>Loading</p>}
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default UserProfile;
