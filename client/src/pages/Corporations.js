import React, { useContext } from "react";
import { Container, Grid, Card, Button, Tab, Segment, Image, Icon } from "semantic-ui-react";
import { useQuery, useMutation, useSubscription } from "@apollo/react-hooks";
import Title from "../components/Title";

import { AuthContext } from "../context/auth";

import gql from "graphql-tag";
import {FETCH_CORPORATIONS_QUERY} from "../util/graphql";

function Corporations(props) {

  var { user: { id, username } } = useContext(AuthContext);

  var user = useQuery(FETCH_USER_QUERY, {
    variables: {
      userId: id
    }
  }).data.getUser;

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
                            <Button
                              color="linkedin"
                            >
                              <Icon name="plus square"/> View Profile
                            </Button>
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
            corporations.filter(function (corporation) {
              return user.bookmarks.includes(corporation.name);
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