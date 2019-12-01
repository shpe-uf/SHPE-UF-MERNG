<<<<<<< HEAD
import React, { useContext } from "react";
import { Container, Grid, Card, Button, Tab, Segment, Image, Icon } from "semantic-ui-react";
import { useQuery, useMutation } from "@apollo/react-hooks";
=======
import React, { useContext, useState } from "react";
import { Button, Container, Grid, Card, Icon, Tab, Segment } from "semantic-ui-react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import imageDataURI from 'image-data-uri';
import gql from "graphql-tag";
import { useForm } from "../util/hooks";
import { AuthContext } from "../context/auth";
import Title from "../components/Title";
>>>>>>> bookmark

import { AuthContext } from "../context/auth";

import gql from "graphql-tag";
import {FETCH_CORPORATIONS_QUERY} from "../util/graphql";

import Title from "../components/Title";

function Corporations(props) {

<<<<<<< HEAD
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
=======
  var { user: { id, username } } = useContext(AuthContext);

  var user = useQuery(FETCH_USER_QUERY, {
    variables: {
      userId: id
    }
  }).data.getUser;

  console.log(user);

  var corporations = useQuery(FETCH_CORPORATIONS_QUERY).data.getCorporations;

  const [bookmark] = useMutation(BOOKMARK_MUTATION);
  const [deleteBookmark] = useMutation(DELETE_BOOKMARK_MUTATION);
>>>>>>> bookmark

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
<<<<<<< HEAD
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
=======
                  extra={
                          <>
                            <a>
                              <Icon name='plus square' />
                              View Profile
                            </a>
                            {user && user.bookmarks.find(function(bookmarked){
                              return bookmarked === corporation.name;
                            }) ? (
                             <Button onClick={() => {deleteBookmark({variables: {
                              company: corporation.name,
                              username: username
                              }});
                              user.bookmarks.splice(user.bookmarks.indexOf(corporation.name), 1); 
                              }}
                              floated='right' icon='book' color='red' />
                            ) : (
                              <Button onClick={() => {bookmark({variables: {
                                company: corporation.name,
                                username: username
                              }});
                              user.bookmarks.push(corporation.name);
                              }} 
                              floated='right' icon='book' />
                            )
                          }
                          </>
                        }
                />
>>>>>>> bookmark
              </Grid.Column>
            ))}
          </Grid.Row>
        </Grid>
      </Container>
    </Tab.Pane>
  }

  var bookmarksPane = {
    menuItem: {content:'Bookmarks', icon:'sticky note outline'},
<<<<<<< HEAD
    render: () => 
    <Tab.Pane loading={!corporations}>
=======
    render: () => <Tab.Pane loading={!user.bookmarks}>
>>>>>>> bookmark
      <Container>
        <Grid stackable columns={4}>
          <Grid.Row className="sponsor-padding">
            {
<<<<<<< HEAD
            corporations &&
            corporations.filter(function (corporation) {
              return bookmarks.includes(corporation.name);
            }).map((corporation, index) => (
=======
            user.bookmarks &&
            user.bookmarks.map((corporation, index) => (
>>>>>>> bookmark
              <Grid.Column className="card-team" key={index}>
                <Card
                  fluid
                  raised
<<<<<<< HEAD
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
=======
                  header={corporation}
                />
              </Grid.Column>
            ))}
>>>>>>> bookmark
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
<<<<<<< HEAD
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
=======
      username
      bookmarks
    }
  }
`;

const BOOKMARK_MUTATION = gql`
  mutation bookmark(
    $company: String!,
    $username: String!
  ) {
    bookmark(
      company: $company
      username: $username
    ) {
      bookmarks
    }
  }
`;

const DELETE_BOOKMARK_MUTATION = gql`
  mutation deleteBookmark(
    $company: String!,
    $username: String!
  ) {
    deleteBookmark(
      company: $company
      username: $username
    ) {
      bookmarks
>>>>>>> bookmark
    }
  }
`;

export default Corporations;