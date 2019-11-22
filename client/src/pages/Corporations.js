import React from "react";
import { Button, Container, Grid, Card, Icon, Tab, Segment } from "semantic-ui-react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import imageDataURI from 'image-data-uri';
import gql from "graphql-tag";
import { useForm } from "../util/hooks";

import {FETCH_CORPORATIONS_QUERY} from "../util/graphql";

import placeholder from "../assets/images/placeholder.png"

function Corporations(props) {

  var corporations = useQuery(FETCH_CORPORATIONS_QUERY).data.getCorporations;

  const { values, onClick } = useForm(bookmarkCallback, {
    company: ""
  });

  const [bookmark, { loading }] = useMutation(BOOKMARK_MUTATION, {
    update(
      _
    ) {
      values.company = "";
    },

    variables: values
  });

  function bookmarkCallback() {
    bookmark();
  }

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
                            <Button floated='right' icon='book'/>
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
    render: () => <Tab.Pane loading></Tab.Pane>
  }

  return (
    <div className="body">
      <div className="masthead masthead-sponsors">
        <div className="overlay-blue">
          <Container>
            <h1 className="masthead-title text-white">Corporate Database</h1>
          </Container>
        </div>
      </div>
      <Segment basic>
        <Tab 
          panes={[corporationPane, bookmarksPane]}
        />
      </Segment>
      
    </div>
  );
}

const BOOKMARK_MUTATION = gql`
  mutation bookmark(
    $company: String!
  ) {
    bookmark(
      company: $company
    ) {
      username
      company
    }
  }
`;

export default Corporations;