import React, { useState } from "react";
import { Form, Button, Container, Segment } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

import { useForm } from "../util/hooks";

function ForgotPassword(props){

  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(resetCallback, {
    email: ""
  });


  const [resetUser, { loading }] = useMutation(RESET_PASSWORD, {
    onComplete(_, {
      data: { login: userData }
    } ) {
      console.log(userData);
      //setToken();
    },

    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },

    variables: values
  });

  function resetCallback() {
    resetUser();
  }



  return (
    <div className="reset">
      <div className="overlay-reset">
        <Container>
          <Segment.Group>
          <Segment className="title-bg-accent-1">
            <h1 className="text-white">Reset Password</h1>
          </Segment>
          <Segment>
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
            >
              <Form.Input
                type="text"
                label="Email"
                name="email"
                value={values.email}
                onChange={onChange}
              />
              <span>
                <Button type="submit">Reset Password</Button>
                <p style={{display : 'inline-block', marginTop: 12, marginLeft: 10}}>
                  or <a href="/login">Log In</a>
                </p>
              </span>
            </Form>
          </Segment>
          </Segment.Group>
        </Container>
      </div>
    </div>
  );
}

const RESET_PASSWORD = gql`
  mutation resetPassword($email: String!) {
    resetPassword(email: $email) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default ForgotPassword;
