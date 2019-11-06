import React, { useContext, useState } from "react";
import { Segment, Header, Grid, Container, Button, Modal, Form, List } from "semantic-ui-react";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import ReactDOM from "react-dom";

import placeholder from "../assets/images/team/placeholder.png";
import { useForm } from "../util/hooks";
import { AuthContext } from "../context/auth";

import Title from "../components/Title";

function ClassSharing() {

    var {
        user: { username }
      } = useContext(AuthContext)
      
    const [addClassModal, setAddClassModal] = useState(false);
    const [displayClassModal, setDisplayClassModal] = useState(false);

    const openModal = name => {
        if (name === "addClass") {
          setAddClassModal(true);
        }
        if (name === "displayClass") {
            setDisplayClassModal(true);
          }
      };
    
      const closeModal = name => {
        if (name === "addClass") {
          setAddClassModal(false);
        }
        if (name === "displayClass") {
            setDisplayClassModal(false);
          }
      };  

      const { values, onChange, onSubmit } = useForm(addClassCallback, {
        code: "",
        username: username
      });

      const [addClass, { loading }] = useMutation(ADD_CLASS_MUTATION, {
        update(
          _,
          {
            data: { addClass: classData }
          }
        ) {
          setAddClassModal(false);
        },
        variables: values
      });

      var getClasses = [];
      var getMatches = [];

    var { data } = useQuery(GET_CLASSES_QUERY, {
      variables: {username}
    });

    if (data.getClasses) {
        getClasses = data.getClasses;
    }

    // var { data: dataM } = useQuery(GET_MATCHES_QUERY, {
    //     variables: {username}
    // });

    // if (dataM.getMatches) {
    //     getMatches = dataM.getMatches;
    // }
    getMatches = ["sofie", "kjdnf", "sdkjn"];

      function addClassCallback() {
        addClass();
      }

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
                icon="plus"
                labelPosition="left"
                onClick={() => openModal("addClass")}
              />
              <List selection verticalAlign='middle'>
                {getClasses && getClasses.map((classTemp) => (
                    <List.Item>
                    <List.Content onClick={() => openModal("displayClass")}> 
                      <List.Header>{classTemp}</List.Header>
                    </List.Content>
                  </List.Item>
                )
                )}
                </List>
              </Grid.Column>
              <Grid.Column width={8}>
              <Container style={{ margin: 20 }}>
              <Segment attached="top">
                <Header as="h2" content="My Matches" />
                </Segment>
                <Segment attached="bottom">
                
                </Segment>
                    </Container>
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
          <Form
              onSubmit={onSubmit}
              noValidate
              className={loading ? "loading" : ""}
            >
                <Form.Input
                type="text"
                label="Course Code"
                name="code"
                value={values.code}
                onChange={onChange}
              />
                <Button
                type="reset"
                color="grey"
                onClick={() => closeModal("addClass")}
              >
                Cancel
              </Button>
              <Button type="submit" floated="right">
                Add
              </Button>
                </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>

      {/* <Modal open={displayClassModal} size="tiny">
        <Modal.Header>
          <h2>{this.state.classCode}</h2>
        </Modal.Header>
        <Modal.Content>
          <Modal.Description>
          <Form
              onSubmit={onSubmit}
              noValidate
              className={loading ? "loading" : ""}
            >
                <Form.Input
                type="text"
                label="Course Code"
                name="code"
                value={values.code}
                onChange={onChange}
              />
                <Button
                type="reset"
                color="grey"
                onClick={() => closeModal("displayClass")}
              >
                Cancel
              </Button>
              <Button type="submit" floated="right">
                Add
              </Button>
                </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal> */}
    </div>

    
     
  );
}

const ADD_CLASS_MUTATION = gql`
  mutation createClass($code: String!, $username: String!) {
    createClass(createClassInput: { code: $code, username: $username }) {
      code
      users {
        firstName
        lastName
        email
        username
      }
    }
  }
`;

const GET_CLASSES_QUERY = gql`
  query getClasses($username: String!) {
    getClasses(username: $username)
    }
`;

const GET_MATCHES_QUERY = gql`
  query getMatches($username: String!) {
    getMatches(username: $username)
    }
`;

export default ClassSharing;
