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

function AlumniTable({ alumnis }) {
  const [alumniProfileModal, setAlumniProfileModal] = useState(false);
  const [alumniProfile, setAlumniProfile] = useState({});

  const openModal = name => {
    if (name === "alumniProfile") {
      setAlumniProfileModal(true);
    }
  };

  const closeModal = name => {
    if (name === "alumniProfile") {
      setAlumniProfile({});
      setAlumniProfileModal(false);
    }
  };

  function getAlumniProfile(alumniProfile) {
    setAlumniProfile(alumniProfile);
  }

  return (
    <>
      <div className="table-responsive">
        <Dimmer active={alumnis ? false : true} inverted>
          <Loader />
        </Dimmer>
        <Table striped selectable unstackable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Undergrad. Major</Table.HeaderCell>
              <Table.HeaderCell>Grad. Major</Table.HeaderCell>
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell>Employer</Table.HeaderCell>
              <Table.HeaderCell>Position</Table.HeaderCell>
              <Table.HeaderCell>Location</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">LinkedIn</Table.HeaderCell>
              {/*
              <Table.HeaderCell textAlign="center">Profile</Table.HeaderCell>
              */}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {alumnis &&
              alumnis.map((alumni, index) => (
                <Table.Row key={index}>
                  <Table.Cell>
                    {alumni.lastName}, {alumni.firstName}
                  </Table.Cell>
                  <Table.Cell>{alumni.undergrad.major}</Table.Cell>
                  <Table.Cell>{alumni.grad.major}</Table.Cell>
                  <Table.Cell>{alumni.email}</Table.Cell>
                  <Table.Cell>{alumni.employer}</Table.Cell>
                  <Table.Cell>{alumni.position}</Table.Cell>
                  <Table.Cell>
                    {alumni.location.city}, {alumni.location.state}
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    <Button icon href={alumni.linkedin} target="_blank">
                      <Icon name="linkedin square" />
                    </Button>
                  </Table.Cell>
                  {/*
                  <Table.Cell textAlign="center">
                    <Button
                      icon
                      onClick={() => {
                        getAlumniProfile(alumni);
                        openModal("alumniProfile");
                      }}
                    >
                      <Icon name="info" />
                    </Button>
                  </Table.Cell>
                  */}
                </Table.Row>
              ))}
          </Table.Body>
        </Table>
      </div>

      <Modal
        open={alumniProfileModal}
        size="large"
        closeOnEscape={true}
        closeOnDimmerClick={false}
      >
        <Modal.Header>
          <h2>Alumni Profile</h2>
        </Modal.Header>
        <Modal.Content>
          <Grid>
            <Grid.Row>
              <Grid.Column>
                <Button
                  type="reset"
                  color="grey"
                  onClick={() => closeModal("alumniProfile")}
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

export default AlumniTable;
