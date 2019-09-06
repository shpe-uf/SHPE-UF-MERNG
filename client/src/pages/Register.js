import React, { useContext, useState } from "react";
import { Grid, Form, Button, Container } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { AuthContext } from "../context/auth";
import { useForm } from "../util/hooks";

function Register(props) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(registerUser, {
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(
      _,
      {
        data: { register: userData }
      }
    ) {
      context.login(userData);
      props.history.push("/");
    },

    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },

    variables: values
  });

  function registerUser() {
    addUser();
  }

  return (
    <div className="register">
      <div className="overlay-register">
        <Container>
          <Grid>
            <Grid.Row>
              <Grid.Column>
                <div className="title-bg-accent-1">
                  <h1 className="text-white">Register</h1>
                </div>
                <div className="jumbotron-register">
                  <Form
                    onSubmit={onSubmit}
                    noValidate
                    className={loading ? "loading" : ""}
                  >
                    <Form.Input
                      type="text"
                      label="Username"
                      placeholder="Username..."
                      name="username"
                      value={values.username}
                      error={errors.username ? true : false}
                      onChange={onChange}
                    />
                    <Form.Input
                      type="text"
                      label="Email"
                      placeholder="Email..."
                      name="email"
                      value={values.email}
                      error={errors.email ? true : false}
                      onChange={onChange}
                    />
                    <Form.Input
                      type="password"
                      label="Password"
                      placeholder="Password..."
                      name="password"
                      value={values.password}
                      error={errors.password ? true : false}
                      onChange={onChange}
                    />
                    <Form.Input
                      type="password"
                      label="Confirm Password"
                      placeholder="Confirm Password..."
                      name="confirmPassword"
                      value={values.confirmPassword}
                      error={errors.confirmPassword ? true : false}
                      onChange={onChange}
                    />
                    <Button type="submit" color="teal">
                      Register
                    </Button>
                  </Form>
                </div>
                {Object.keys(errors).length > 0 && (
                  <div className="ui error message">
                    <ul className="list">
                      {Object.values(errors).map(value => (
                        <li key={value}>{value}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    </div>
  );
}

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Register;
