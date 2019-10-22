import React, { useState } from "react";
import { Table, Dimmer, Loader, Icon, Button, Modal } from "semantic-ui-react";

function MembersTable({ users }) {
  const [userInfoModal, setUserInfoModal] = useState(false);

  const openModal = name => {
    if (name === "userInfo") {
      setUserInfoModal(true);
    }
  };

  const closeModal = name => {
    if (name === "userInfo") {
      setUserInfoModal(false);
    }
  };

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
            <Table.HeaderCell textAlign="center">Fall Points</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">
              Spring Points
            </Table.HeaderCell>
            <Table.HeaderCell textAlign="center">
              Summer Points
            </Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Total Points</Table.HeaderCell>
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
                  <Button icon onClick={() => {
                    openModal("userInfo");
                  }}>
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
      size="small"
      closeOnEscape={true}
      closeOnDimmerClick={false}
    >
      <Modal.Header>
        <h2>User Information</h2>
      </Modal.Header>
      <Modal.Content>
        <Modal.Description>
        <Button
          type="reset"
          color="grey"
          onClick={() => closeModal("userInfo")}
        >
          Cancel
        </Button>
        </Modal.Description>
      </Modal.Content>
    </Modal>
    </>
  );
}

export default MembersTable;
