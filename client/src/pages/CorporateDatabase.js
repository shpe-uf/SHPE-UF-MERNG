import React, { useContext, useState } from "react";
import { Grid, Container, Button, Modal, Form, Segment } from "semantic-ui-react";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";

import { useForm } from "../util/hooks";
import { AuthContext } from "../context/auth";

import majorOptions from "../assets/options/major.json";
import industryOptions from "../assets/options/industry.json";

import Title from "../components/Title";

function CorporateDatabase() {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(createCorporation, {
    name: "",
    slogan: "",
    majors: [],
    industries: [],
    overview: "",
    mission: "",
    goals: "",
    businessModel: "",
    newsLink: "",
    applyLink: "",
    otherInformation: {
      academia: "false",
      govContractor: "false",
      nonProfit: "false",
      visaSponsor: "false",
      shpeSponsor: "false",
      industryPartnership: "false",
      fallBBQ: "false",
      springBBQ: "false",
      nationalConvention: "false"
    }
  })

  const [addCorporation, { loading }] = useMutation(CREATE_CORPORATION, {
    update(
      _,
      {
        data: { register: corporationData }
      }
    ) {},

    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },

    variables: values
  });

  function createCorporation() {
    addCorporation();
  }

  return (
    <div className ="body">
      <Title title="Corporate Database" />

      <Container>
        <Segment.Group className="segment-spacing">
          <Segment className="title-bg-accent-1">
            <h1 className="text-white">Create a corporation</h1>
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
              className={loading ? "loading" : ""}
            >
              <Form.Group widths="equal">
                <Form.Input
                  type="text"
                  label="Company Name"
                  name="name"
                  value={values.name}
                  error={errors.name ? true : false}
                  onChange={onChange}
                />
                <Form.Input
                  type="text"
                  label="Company Name"
                  name="name"
                  value={values.name}
                  error={errors.name ? true : false}
                  onChange={onChange}
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Dropdown
                    label="Majors"
                    control="select"
                    name="majors"
                    value={values.major}
                    error={errors.major ? true : false}
                    onChange={onChange}
                    multiple={true}
                  >
                    {majorOptions.map(major => (
                      <option value={major.value} key={major.key}>
                        {major.value}
                      </option>
                    ))}
                  </Form.Dropdown>
                  
              </Form.Group>
            </Form>
          </Segment>
        </Segment.Group>
      </Container>
    </div>
  )
}

const CREATE_CORPORATION = gql`
  mutation create(
    $name: String!
    $slogan: String!
    $majors: [String!]
    $industries: [String!]
    $overview: String!
    $mission: String!
    $goals: String!
    $businessModel: String!
    $newsLink: String!
    $applyLink: String!
    $academia: String!
    $govContractor: String!
    $nonProfit: String!
    $visaSponsor: String!
    $shpeSponsor: String!
    $industryPartnership: String!
    $fallBBQ: String!
    $springBBQ: String!
    $nationalConvention: String!
  ) {
    create(
      createInput: {
        name: $name
        slogan: $slogan
        majors: $majors
        industries: $industries
        overview: $overview
        mission: $mission
        goals: $goals
        businessModel: $businessModel
        newsLink: $newsLink
        applyLink: $applyLink
        otherInformation: {
          academia: $academia
          govContractor: $govContractor
          nonProfit: $nonProfit
          visaSponsor: $visaSponsor
          shpeSponsor: $shpeSponsor
          industryPartnership: $industryPartnership
          fallBBQ: $fallBBQ
          springBBQ: $springBBQ
          nationalConvention: $nationalConvention
        }
      }
    ) {
      id
      createdAt
      token
    }
  }
`;

export default CorporateDatabase;