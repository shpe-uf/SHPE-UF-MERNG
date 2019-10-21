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
    academia: "No",
    govContractor: "No",
    nonProfit: "No",
    visaSponsor: "No",
    shpeSponsor: "No",
    industryPartnership: "No",
    fallBBQ: "No",
    springBBQ: "No",
    nationalConvention: "No"
  })

  const [addCorporation, { loading }] = useMutation(CREATE_CORPORATION, {
    update(
      _,
      {
        data: { createCorporation: corporationData }
      }
    ) {
      console.log('HERES THE DATA')
      console.log(corporationData)
    },
    onError(err) {
      console.log(err.message)
      console.log(err.graphQLErrors)
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },

    variables: values
  },console.log('useMutation method'));

  function createCorporation() {
    console.log('create corporation method')
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
                  label="Slogan"
                  name="slogan"
                  value={values.slogan}
                  error={errors.slogan ? true : false}
                  onChange={onChange}
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Dropdown
                    label="Majors"
                    control="select"
                    name="majors"
                    value={values.majors}
                    error={errors.majors ? true : false}
                    onChange={onChange}
                    multiple={true}
                  >
                    {majorOptions.map(major => (
                      <option value={major.value} key={major.key}>
                        {major.value}
                      </option>
                    ))}
                </Form.Dropdown>
                <Form.Dropdown
                    label="Industries"
                    control="select"
                    name="industries"
                    value={values.industries}
                    error={errors.industries ? true : false}
                    onChange={onChange}
                    multiple={true}
                  >
                    {industryOptions.map(industry => (
                      <option value={industry.value} key={industry.key}>
                        {industry.value}
                      </option>
                    ))}
                </Form.Dropdown>
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Input
                  type="text"
                  label="Overview"
                  name="overview"
                  value={values.overview}
                  error={errors.overview ? true : false}
                  onChange={onChange}
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Input
                  type="text"
                  label="Mission"
                  name="mission"
                  value={values.mission}
                  error={errors.mission ? true : false}
                  onChange={onChange}
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Input
                  type="text"
                  label="Goals"
                  name="goals"
                  value={values.goals}
                  error={errors.goals ? true : false}
                  onChange={onChange}
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Input
                  type="text"
                  label="Business Model/Operations Highlights"
                  name="businessModel"
                  value={values.businessModel}
                  error={errors.businessModel ? true : false}
                  onChange={onChange}
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Input
                  type="text"
                  label="News Link"
                  name="newsLink"
                  value={values.newsLink}
                  error={errors.newsLink ? true : false}
                  onChange={onChange}
                />
                <Form.Input
                  type="text"
                  label="Apply Link"
                  name="applyLink"
                  value={values.applyLink}
                  error={errors.applyLink ? true : false}
                  onChange={onChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Dropdown
                  label="Academia"
                  control="select"
                  name="academia"
                  value={values.academia}
                  error={errors.academia ? true : false}
                  onChange={onChange}
                >
                  <option>
                    {"Yes"}
                  </option>
                  <option>
                    {"No"}
                  </option>
                </Form.Dropdown>
              </Form.Group>
              <Form.Group>
                <Form.Dropdown
                  label="Government Contractor"
                  control="select"
                  name="govContractor"
                  value={values.govContractor}
                  error={errors.govContractor ? true : false}
                  onChange={onChange}
                >
                  <option>
                    {"Yes"}
                  </option>
                  <option>
                    {"No"}
                  </option>
                </Form.Dropdown>
              </Form.Group>
              <Form.Group>
                <Form.Dropdown
                  label="Non Profit"
                  control="select"
                  name="nonProfit"
                  value={values.nonProfit}
                  error={errors.nonProfit ? true : false}
                  onChange={onChange}
                >
                  <option>
                    {"Yes"}
                  </option>
                  <option>
                    {"No"}
                  </option>
                </Form.Dropdown>
              </Form.Group>
              <Form.Group>
                <Form.Dropdown
                  label="Visa Sponsorship"
                  control="select"
                  name="visaSponsor"
                  value={values.visaSponsor}
                  error={errors.visaSponsor ? true : false}
                  onChange={onChange}
                >
                  <option>
                    {"Yes"}
                  </option>
                  <option>
                    {"No"}
                  </option>
                </Form.Dropdown>
              </Form.Group>
              <Form.Group>
                <Form.Dropdown
                  label="SHPE Sponsor"
                  control="select"
                  name="shpeSponsor"
                  value={values.shpeSponsor}
                  error={errors.shpeSponsor ? true : false}
                  onChange={onChange}
                >
                  <option>
                    {"Yes"}
                  </option>
                  <option>
                    {"No"}
                  </option>
                </Form.Dropdown>
              </Form.Group>
              <Form.Group>
                <Form.Dropdown
                  label="Industry Partnership"
                  control="select"
                  name="industryPartnership"
                  value={values.industryPartnership}
                  error={errors.industryPartnership ? true : false}
                  onChange={onChange}
                >
                  {console.log("ERRORS", errors.industryPartnership)}
                  <option>
                    {"Yes"}
                  </option>
                  <option>
                    {"No"}
                  </option>
                </Form.Dropdown>
              </Form.Group>
              <Form.Group>
                <Form.Dropdown
                  label="Attending Fall SHPE BBQ"
                  control="select"
                  name="fallBBQ"
                  value={values.fallBBQ}
                  error={errors.fallBBQ ? true : false}
                  onChange={onChange}
                >
                  <option>
                    {"Yes"}
                  </option>
                  <option>
                    {"No"}
                  </option>
                </Form.Dropdown>
              </Form.Group>
              <Form.Group>
                <Form.Dropdown
                  label="Attending Spring BBQ"
                  control="select"
                  name="springBBQ"
                  value={values.springBBQ}
                  error={errors.springBBQ ? true : false}
                  onChange={onChange}
                >
                  <option>
                    {"Yes"}
                  </option>
                  <option>
                    {"No"}
                  </option>
                </Form.Dropdown>
              </Form.Group>
              <Form.Group>
                <Form.Dropdown
                  label="Attending SHPE National Convention"
                  control="select"
                  name="nationalConvention"
                  value={values.nationalConvention}
                  error={errors.nationalConvention ? true : false}
                  onChange={onChange}
                >
                  <option>
                    {"Yes"}
                  </option>
                  <option>
                    {"No"}
                  </option>
                </Form.Dropdown>
              </Form.Group>
              <Button type="submit">Add Corporation</Button>
            </Form>
          </Segment>
        </Segment.Group>
      </Container>
    </div>
  )
}

const CREATE_CORPORATION = gql`
  mutation createCorporation(
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
    createCorporation(
      createCorporationInput: {
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
    ) {
      id
      createdAt
    }
  }
`;

export default CorporateDatabase;