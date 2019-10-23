import React, { useContext, useState } from "react";
import { Grid, Container, Button, Modal, Form, GridRow, GridColumn } from "semantic-ui-react";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";

import Title from "../components/Title";

function ClassSharing() {

    const [addClassModal, setAddClassModal] = useState(false);

    const openModal = name => {
        if (name === "addClass") {
          setAddClassModal(true);
        }
      };
    
      const closeModal = name => {
        if (name === "addClass") {
          setAddClassModal(false);
        }
      };  

  return (
    <div className="body">
      <Title title="Class Sharing" />
      <Container>
      <Grid>
          <Grid.Row>
              <Grid.Column width={8}>
                <h2>My Schedule</h2>
                <Button
                content="Add Class"
                icon="font"
                labelPosition="left"
                onClick={() => openModal("addClass")}
              />
              </Grid.Column>
              <Grid.Column width={8}>
                <h2>My Matches</h2>  
              </Grid.Column>
          </Grid.Row>
      </Grid>
      </Container>
      <Modal open={addClassModal} size="tiny">
        <Modal.Header>
          <h2>Add Class</h2>
        </Modal.Header>
        <Modal.Content>
          <Modal.Description>
              <Button
                type="reset"
                color="grey"
                onClick={() => closeModal("addClass")}
              >
                Cancel
              </Button>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    </div>

    
     
  );
}

export default ClassSharing;
