import React, {useState} from "react";
import { Container, Grid, Card, Button,Modal, Tab, Segment } from "semantic-ui-react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import imageDataURI from 'image-data-uri';

import {FETCH_CORPORATIONS_QUERY} from "../util/graphql";
import CorporationProfile from "../components/CorporationProfile";

import placeholder from "../assets/images/placeholder.png"

function Corporations(props) {
  const [viewCorporationModal, setViewCorporationModal] = useState(false);
  
  //State to keep track of the current corporation selected
  const [corporationInfo, setCorporationInfo] = useState({});

  //Corporation information modals
  const openModal = name => {
    if (name === "viewCorporation") {
      setViewCorporationModal(true);
    }
  };

  const closeModal = name => {
    if (name === "viewCorporation") {
      setCorporationInfo({});
      setViewCorporationModal(false);
    }
  }

  //Setter function to update the state with the selected corporation
  function getCoroporationInfo(corporationInfo) {
    setCorporationInfo(corporationInfo);
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
                          onClick={()=>{
                              getCoroporationInfo(corporation);
                              openModal("viewCorporation");
                            }}
                          >
                            {/* <Icon name='plus square' /> */}
                            View Profile
                          </Button>
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
            <CorporationProfile corporation={corporationInfo}/>
              <Button 
                type="reset"
                color="grey"
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