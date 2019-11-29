import React, { useContext, useState } from "react";
import { Button, Container, Grid, Card, Icon, Tab, Segment } from "semantic-ui-react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import imageDataURI from 'image-data-uri';
import gql from "graphql-tag";
import { useForm } from "../util/hooks";
import { AuthContext } from "../context/auth";
import Title from "../components/Title";

import {FETCH_CORPORATIONS_QUERY} from "../util/graphql";

import placeholder from "../assets/images/placeholder.png"

function Corporations(props) {

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
              </Grid.Column>
            ))}
          </Grid.Row>
        </Grid>
      </Container>
    </Tab.Pane>
  }

  var bookmarksPane = {
    menuItem: {content:'Bookmarks', icon:'sticky note outline'},
    render: () => <Tab.Pane loading={!user.bookmarks}>
      <Container>
        <Grid stackable columns={4}>
          <Grid.Row className="sponsor-padding">
            {
            user.bookmarks &&
            user.bookmarks.map((corporation, index) => (
              <Grid.Column className="card-team" key={index}>
                <Card
                  fluid
                  raised
                  header={corporation}
                />
              </Grid.Column>
            ))}
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
    }
  }
`;

export default Corporations;