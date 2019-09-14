import React, { useContext, useState } from "react";
import { Grid, Form, Button, Container } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { AuthContext } from "../context/auth";
import { useForm } from "../util/hooks";

function Login(props) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    username: "",
    password: ""
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(
      _,
      {
        data: { login: userData }
      }
    ) {
      context.login(userData);
      props.history.push("/points");
    },

    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },

    variables: values
  });

  function loginUserCallback() {
    loginUser();
  }

  return (
    <div className="login">
      <div className="overlay-login">
        <Container>
          <Grid>
            <Grid.Row>
              <Grid.Column>
                <div className="title-bg-accent-1">
                  <h1 className="text-white">Login</h1>
                </div>
                <div className="jumbotron-login">
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
                      type="password"
                      label="Password"
                      placeholder="Password..."
                      name="password"
                      value={values.password}
                      error={errors.password ? true : false}
                      onChange={onChange}
                    />
                    <Button type="submit">Login</Button>
                  </Form>
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    </div>
  );
}

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Login;
