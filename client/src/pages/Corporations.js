import React, {useState} from "react";
import { Container, Grid, Card, Button,Modal, Tab, Segment } from "semantic-ui-react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import imageDataURI from 'image-data-uri';

import {FETCH_CORPORATIONS_QUERY} from "../util/graphql";
import CorporationProfile from "../components/CorporationProfile";

import placeholder from "../assets/images/placeholder.png"

function Corporations(props) {
  const [viewCorporationModal, setViewCorporationModal] = useState(false);
  
  var selectedCorporation = {};

  const openModal = (name, corporation) => {
    if (name === "viewCorporation") {
      setViewCorporationModal(true);
      selectedCorporation = corporation;
    }
  };

  const closeModal = name => {
    if (name === "viewCorporation") {
      selectedCorporation=null;
      setViewCorporationModal(false);
    }
  }

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
                  extra={<Button
                          icon="plus square"
                          color="red"
                          onClick={()=>openModal("viewCorporation", corporation)}
                          >
                          {/* <Icon name='plus square' /> */}
                          View Profile
                        </Button>}
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

      <Modal
    open={viewCorporationModal}
    size="small"
    closeOnEscape={true}
    closeOnDimmerClick={false}
    >
      <Modal.Header>
        <h2>Corporation</h2>
      </Modal.Header>
      <Modal.Content>
        <Grid>
          <Grid.Row>
            <Grid.Column>
            <CorporationProfile corporation={selectedCorporation}/>
              <Button 
                type="reset"
                color="red"
                floated="right"
                onClick={()=> closeModal("viewCorporation")}
              >Close</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Modal.Content>
    </Modal>
    </div>
  );
}

export default Corporations;