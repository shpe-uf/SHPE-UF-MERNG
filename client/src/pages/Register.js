import React, { useContext, useState } from "react";
import {
  Grid,
  Form,
  Button,
  Container,
  Checkbox,
  Dropdown
} from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { AuthContext } from "../context/auth";
import { useForm } from "../util/hooks";

function Register(props) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(registerUser, {
    firstName: "",
    lastName: "",
    major: "",
    ethnicity: "",
    graduating: "",
    country: "",
    year: "",
    sex: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    listServ: ""
  });

  console.log(values);

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

  const majorOptions = [
    {
      key: "AE",
      value: "Aerospace Engineering",
      text: "Aerospace Engineering"
    },
    {
      key: "ABE",
      value: "Agricultural & Biological Engineering",
      text: "Agricultural & Biological Engineering"
    },
    {
      key: "BE",
      value: "Biomedical Engineering",
      text: "Biomedical Engineering"
    },
    { key: "ChE", value: "Chemical Engineering", text: "Chemical Engineering" },
    { key: "CivE", value: "Civil Engineering", text: "Civil Engineering" },
    {
      key: "COE",
      value: "Coastal & Oceanographic Engineering",
      text: "Coastal & Oceanographic Engineering"
    },
    { key: "CE", value: "Computer Engineering", text: "Computer Engineering" },
    { key: "CS", value: "Computer Science", text: "Computer Science" },
    {
      key: "DAS",
      value: "Digital Arts & Sciences",
      text: "Digital Arts & Sciences"
    },
    {
      key: "EE",
      value: "Electrical Engineering",
      text: "Electrical Engineering"
    },
    {
      key: "EES",
      value: "Environmental Engineering Sciences",
      text: "Environmental Engineering Sciences"
    },
    {
      key: "HCC",
      value: "Human-Centered Computing",
      text: "Human-Centered Computing"
    },
    {
      key: "ISE",
      value: "Industrial & Systems Engineering",
      text: "Industrial & Systems Engineering"
    },
    {
      key: "MSE",
      value: "Materials Science & Engineering",
      text: "Materials Science & Engineering"
    },
    {
      key: "ME",
      value: "Mechanical Engineering",
      text: "Mechanical Engineering"
    },
    { key: "NE", value: "Nuclear Engineering", text: "Nuclear Engineering" },
    { key: "O", value: "Other", text: "Other" }
  ];

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
                    <Form.Group widths="equal">
                      <Form.Input
                        type="text"
                        label="First Name"
                        name="firstName"
                        value={values.firstName}
                        error={errors.firstName ? true : false}
                        onChange={onChange}
                      />
                      <Form.Input
                        type="text"
                        label="Last Name"
                        name="lastName"
                        value={values.lastName}
                        error={errors.lastName ? true : false}
                        onChange={onChange}
                      />
                    </Form.Group>
                    <Form.Group widths="equal">
                      <Form.Select
                        fluid
                        options={majorOptions}
                        label="Year"
                        name="year"
                        value={values.year}
                        error={errors.year ? true : false}
                        onChange={onChange}
                      />
                      <Form.Select
                        fluid
                        options={majorOptions}
                        label="Graduating"
                        name="graduating"
                        value={values.graduating}
                        error={errors.graduating ? true : false}
                        onChange={onChange}
                      />
                    </Form.Group>
                    <Form.Group widths="equal">
                      <Form.Select
                        fluid
                        options={majorOptions}
                        label="Country of Origin"
                        name="country"
                        value={values.country}
                        error={errors.country ? true : false}
                        onChange={onChange}
                      />
                      <Form.Select
                        fluid
                        options={majorOptions}
                        label="Ethnicity"
                        name="ethnicity"
                        value={values.ethnicity}
                        error={errors.ethnicity ? true : false}
                        onChange={onChange}
                      />
                      <Form.Select
                        fluid
                        options={majorOptions}
                        label="Sex"
                        name="sex"
                        value={values.sex}
                        error={errors.sex ? true : false}
                        onChange={onChange}
                      />
                    </Form.Group>
                    <Form.Group widths="equal">
                      <Form.Input
                        type="text"
                        label="Username"
                        name="username"
                        value={values.username}
                        error={errors.username ? true : false}
                        onChange={onChange}
                      />
                      <Form.Input
                        type="text"
                        label="Email"
                        name="email"
                        value={values.email}
                        error={errors.email ? true : false}
                        onChange={onChange}
                      />
                    </Form.Group>
                    <Form.Group widths="equal">
                      <Form.Input
                        type="password"
                        label="Password"
                        name="password"
                        value={values.password}
                        error={errors.password ? true : false}
                        onChange={onChange}
                      />
                      <Form.Input
                        type="password"
                        label="Confirm Password"
                        name="confirmPassword"
                        value={values.confirmPassword}
                        error={errors.confirmPassword ? true : false}
                        onChange={onChange}
                      />
                    </Form.Group>
                    <Form.Field>
                      <Checkbox
                        toggle
                        label="Would you like to be added to the listserv to receive weekly emails?"
                        value={values.listServ}
                        onChange={onChange}
                      />
                    </Form.Field>
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
    $firstName: String!
    $lastName: String!
    $major: String!
    $year: String!
    $graduating: String!
    $country: String!
    $ethnicity: String!
    $sex: String!
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
    $listServ: Boolean!
  ) {
    register(
      registerInput: {
        firstName: $firstName
        lastName: $lastName
        major: $major
        year: $year
        graduating: $graduating
        country: $country
        ethnicity: $ethnicity
        sex: $sex
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
        listServ: $listServ
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
