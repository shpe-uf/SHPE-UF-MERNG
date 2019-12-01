import React, { useContext } from "react";
import { Container, Grid, Card, Button, Tab, Segment, Image, Icon } from "semantic-ui-react";
import { useQuery, useMutation } from "@apollo/react-hooks";

import { AuthContext } from "../context/auth";

import gql from "graphql-tag";
import {FETCH_CORPORATIONS_QUERY} from "../util/graphql";

import Title from "../components/Title";

function Corporations(props) {

  var {
    user: { id, username }
  } = useContext(AuthContext);

  var user = useQuery(FETCH_USER_QUERY, {
    variables: {
      userId: id
    }
  }).data.getUser;
  console.log(user)

  const bookmarks = ['Computers', 'Big LLC']

  var corporations = useQuery(FETCH_CORPORATIONS_QUERY).data.getCorporations;

  var corporationPane = {
    menuItem: {content:'Corporations', icon:'building outline'},
    render: () => 
    <Tab.Pane loading={!corporations}>
      <Container>
        <Grid stackable columns={4}>
          <Grid.Row className="sponsor-padding">
            {
            corporations &&
            corporations.map((corporation, index) => (
              <Grid.Column className="card-team" key={index}>
                <Card
                  fluid
                  raised
                  image={corporation.logo}
                  header={corporation.name}
                >
                  <Image
                    src={corporation.logo}
                    fluid
                    rounded
                  />
                  <Button
                    color="linkedin"
                    fluid
                  >
                    <Icon name="plus square"/> View Profile
                  </Button>
                </Card>
              </Grid.Column>
            ))}
          </Grid.Row>
        </Grid>
      </Container>
    </Tab.Pane>
  }

  var bookmarksPane = {
    menuItem: {content:'Bookmarks', icon:'sticky note outline'},
    render: () => 
    <Tab.Pane loading={!corporations}>
      <Container>
        <Grid stackable columns={4}>
          <Grid.Row className="sponsor-padding">
            {
            corporations &&
            corporations.filter(function (corporation) {
              return bookmarks.includes(corporation.name);
            }).map((corporation, index) => (
              <Grid.Column className="card-team" key={index}>
                <Card
                  fluid
                  raised
                >
                  <Card.Content>
                    <Image
                      src={corporation.logo}
                      rounded
                      inline
                    />
                    <Card.Header>
                      {corporation.name}
                    </Card.Header>
                    <Button
                      color="linkedin"
                      fluid
                    >
                      <Icon name="plus square"/> View Profile
                    </Button>
                  </Card.Content>
                </Card>
              </Grid.Column>
            ))
            }
          </Grid.Row>
        </Grid>
      </Container>
    </Tab.Pane>
  }

  return (
    <div className="body">
      <Title title="Corporate Database" />
      <Segment basic>
        <Tab 
          panes={[corporationPane, bookmarksPane]}
        />
      </Segment>
      
    </div>
  );
}

const FETCH_USER_QUERY = gql`
  query getUser($userId: ID!) {
    getUser(userId: $userId) {
      firstName
      lastName
      points
      fallPoints
      springPoints
      summerPoints
      fallPercentile
      springPercentile
      summerPercentile
      events {
        name
        category
        createdAt
        points
      }
    }
  }
`;

export default Corporations;