import React, { useState } from "react";
import { Container, Button, Form, Segment } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import ImageUploader from 'react-images-upload';

import { useForm } from "../util/hooks";

import majorOptions from "../assets/options/major.json";
import industryOptions from "../assets/options/industry.json";

import Title from "../components/Title";

function CorporateDatabase() {
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(createCorporation, {
    name: "",
    logo: {},
    slogan: "",
    majors: [],
    industries: [],
    overview: "",
    mission: "",
    goals: "",
    businessModel: "",
    newsLink: "",
    applyLink: "",
    academia: "false",
    govContractor: "false",
    nonProfit: "false",
    visaSponsor: "false",
    shpeSponsor: "false",
    industryPartnership: "false",
    fallBBQ: "false",
    springBBQ: "false",
    nationalConvention: "false"
  })

  const [addCorporation, { loading }] = useMutation(CREATE_CORPORATION, {
    update(
      _,
      {
        data: { createCorporation: corporationData }
      }
    ) {
      setErrors(false)
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },

    variables: values
  });

  function createCorporation() {
    addCorporation();
    console.log(values)
  }

  function addLogo(logo) {
    logo = logo[logo.length - 1]
    console.log(logo)
    //let dataBuffer = new Buffer(logo[0]);

    const mediaType = logo.name.substr(logo.name.length - 3).toUpperCase()
    console.log(mediaType)
    //logo = imageDataURI.encode(dataBuffer, mediaType)
    //values.logo = logo[0];
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
              <ImageUploader
                withIcon={true}
                name="logo"
                buttonText='Upload Logo'
                label={'5 MB maximum, jpg or png'}
                onChange={addLogo}
                imgExtension={['.jpg','.png']}
                singleImage={true}
                error={errors.logo ? true : false}
                maxFileSize={5242880}
              />
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
                  fluid multiple selection 
                  options={majorOptions}
                  onChange={(param, data) => {
                    values.majors = data.value;
                  }}
                  error={errors.majors ? true : false}
                >
                </Form.Dropdown>
                <Form.Dropdown
                  label="Industries"
                  fluid multiple selection 
                  options={industryOptions}
                  onChange={(param, data) => {
                    values.industries = data.value;
                  }}
                  error={errors.industries ? true : false}
                />
              </Form.Group>
              <Form.TextArea
                type="text"
                label="Overview"
                name="overview"
                value={values.overview}
                error={errors.overview ? true : false}
                onChange={onChange}
              />
              <Form.TextArea
                type="text"
                label="Mission"
                name="mission"
                value={values.mission}
                error={errors.mission ? true : false}
                onChange={onChange}
              />
              <Form.TextArea
                type="text"
                label="Goals"
                name="goals"
                value={values.goals}
                error={errors.goals ? true : false}
                onChange={onChange}
              />
              <Form.TextArea
                type="text"
                label="Business Model/Operations Highlights"
                name="businessModel"
                value={values.businessModel}
                error={errors.businessModel ? true : false}
                onChange={onChange}
              />
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
              <Form.Field>
                <div className="ui toggle checkbox">
                  <input
                    type="checkbox"
                    name="academia"
                    value={values.academia === "true" ? false : true}
                    onChange={onChange}
                  />
                  <label>
                    Academia?
                  </label>
                </div>
              </Form.Field>
              <Form.Field>
                <div className="ui toggle checkbox">
                  <input
                    type="checkbox"
                    name="govContractor"
                    value={values.govContractor === "true" ? false : true}
                    onChange={onChange}
                  />
                  <label>
                    Government Contractor?
                  </label>
                </div>
              </Form.Field>
              <Form.Field>
                <div className="ui toggle checkbox">
                  <input
                    type="checkbox"
                    name="nonProfit"
                    value={values.nonProfit === "true" ? false : true}
                    onChange={onChange}
                  />
                  <label>
                    Non profit?
                  </label>
                </div>
              </Form.Field>
              <Form.Field>
                <div className="ui toggle checkbox">
                  <input
                    type="checkbox"
                    name="visaSponsor"
                    value={values.visaSponsor === "true" ? false : true}
                    onChange={onChange}
                  />
                  <label>
                    Visa Sponsor?
                  </label>
                </div>
              </Form.Field>
              <Form.Field>
                <div className="ui toggle checkbox">
                  <input
                    type="checkbox"
                    name="shpeSponsor"
                    value={values.shpeSponsor === "true" ? false : true}
                    onChange={onChange}
                  />
                  <label>
                    SHPE UF Sponsor?
                  </label>
                </div>
              </Form.Field>
              <Form.Field>
                <div className="ui toggle checkbox">
                  <input
                    type="checkbox"
                    name="industryPartnership"
                    value={values.industryPartnership === "true" ? false : true}
                    onChange={onChange}
                  />
                  <label>
                    Industry Partner?
                  </label>
                </div>
              </Form.Field>
              <Form.Field>
                <div className="ui toggle checkbox">
                  <input
                    type="checkbox"
                    name="fallBBQ"
                    value={values.fallBBQ === "true" ? false : true}
                    onChange={onChange}
                  />
                  <label>
                    Attending Fall BBQ?
                  </label>
                </div>
              </Form.Field>
              <Form.Field>
                <div className="ui toggle checkbox">
                  <input
                    type="checkbox"
                    name="springBBQ"
                    value={values.springBBQ === "true" ? false : true}
                    onChange={onChange}
                  />
                  <label>
                    Attending Spring BBQ?
                  </label>
                </div>
              </Form.Field>
              <Form.Field>
                <div className="ui toggle checkbox">
                  <input
                    type="checkbox"
                    name="nationalConvention"
                    value={values.nationalConvention === "true" ? false : true}
                    onChange={onChange}
                  />
                  <label>
                    Attending SHPE National Convention?
                  </label>
                </div>
              </Form.Field>
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
    $majors: [String!]!
    $industries: [String!]!
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
      name
    }
  }
`;

export default CorporateDatabase;