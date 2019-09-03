import React, { useContext, useState } from "react";
import { Grid, Header, Form, Button } from "semantic-ui-react";
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
    update(_, { data: { login: userData } }) {
      context.login(userData);
      props.history.push("/");
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
    <Grid>
      <Grid.Row>
        <Grid.Column>
          <Header as="h1" size="huge" color="teal">
            Login
          </Header>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
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
            <Button type="submit" color="teal">
              Login
            </Button>
          </Form>
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
