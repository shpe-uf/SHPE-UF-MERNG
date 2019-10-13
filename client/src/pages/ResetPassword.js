import React, { useEffect, useState } from "react";
import { Form, Button, Container, Segment } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

import { useForm } from "../util/hooks";

function ResetPassword(props){

  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(callback, {
    password: "",
    confirmPassword: ""
  });

  const [reset, { loading }] = useMutation(RESET_PASSWORD, {
    update(
      _,
      {
        data: { login: userData }
      }
    ) {
      //context.login(userData);
      props.history.push("/points");
    },

    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },

    variables: values
  });

  useEffect(() => {
  })

  function callback() {
    reset();
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
                type="password"
                label="Password"
                name="password"
                value={values.password}
                onChange={onChange}
              />
              <Form.Input
                type="password"
                label="Confirm Password"
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={onChange}
              />
              <span>
                <Button type="submit">Submit</Button>
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
  mutation reset($password: String!, $confirmPassword: String!) {
    reset(password: $password, confirmPassword: $confirmPassword) {
      token
    }
  }
`;

export default ResetPassword;
