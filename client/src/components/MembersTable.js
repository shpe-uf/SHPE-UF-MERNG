import React, { useState } from "react";
import {
  Table,
  Dimmer,
  Loader,
  Icon,
  Button,
  Modal,
  Grid
} from "semantic-ui-react";

import UserProfile from "./UserProfile";
import UserEventsTable from "./UserEventsTable";

function MembersTable({ users }) {
  const [userInfoModal, setUserInfoModal] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  const openModal = name => {
    if (name === "userInfo") {
      setUserInfoModal(true);
    }
  };

  const closeModal = name => {
    if (name === "userInfo") {
      setUserInfoModal(false);
    }

    if (name === "userInfo") {
      setUserInfo({});
      setUserInfoModal(false);
    }
  };

  function getUserInfo(userInfo) {
    setUserInfo(userInfo);
  }

  return (
    <>
      <div className="table-responsive">
        <Dimmer active={users ? false : true} inverted>
          <Loader />
        </Dimmer>
        <Table striped selectable unstackable>
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
              <Table.HeaderCell textAlign="center">Info</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {users &&
              users.map((user, index) => (
                <Table.Row key={index}>
                  <Table.Cell>
                    {user.lastName}, {user.firstName}
                  </Table.Cell>
                  <Table.Cell>{user.username}</Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell textAlign="center">{user.fallPoints}</Table.Cell>
                  <Table.Cell textAlign="center">
                    {user.springPoints}
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    {user.summerPoints}
                  </Table.Cell>
                  <Table.Cell textAlign="center">{user.points}</Table.Cell>
                  <Table.Cell textAlign="center">
                    <Button
                      icon
                      onClick={() => {
                        getUserInfo(user);
                        openModal("userInfo");
                      }}
                    >
                      <Icon name="info" />
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
        </Table>
      </div>

      <Modal
        open={userInfoModal}
        size="large"
        closeOnEscape={true}
        closeOnDimmerClick={false}
      >
        <Modal.Header>
          <h2>Member Info</h2>
        </Modal.Header>
        <Modal.Content>
          {userInfo && (
            <>
              <UserProfile user={userInfo} />
              <UserEventsTable user={userInfo} />
            </>
          )}
          <Grid>
            <Grid.Row>
              <Grid.Column>
                <Button
                  type="reset"
                  color="grey"
                  onClick={() => closeModal("userInfo")}
                >
                  Close
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Modal.Content>
      </Modal>
    </>
  );
}

export default MembersTable;
