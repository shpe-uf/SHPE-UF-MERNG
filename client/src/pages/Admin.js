import React, { useState } from "react";
import {
  Grid,
  Container,
  Menu,
  Segment
} from "semantic-ui-react";

import Title from "../components/Title";
import Events from "../components/Events";
import MembersTable from "../components/MembersTable";
import RequestsTable from "../components/RequestsTable";

function Admin() {
  const [activeItem, setActiveItem] = useState("Events");

  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
  };

  return (
    <div className="body">
      <Title title="Admin Tools" />
      <Container>
        <Menu attached="top" tabular>
          <Menu.Item
            name="Events"
            active={activeItem === "Events"}
            onClick={handleItemClick}
          />
          <Menu.Item
            name="Members"
            active={activeItem === "Members"}
            onClick={handleItemClick}
          />
          <Menu.Item
            name="Requests"
            active={activeItem === "Requests"}
            onClick={handleItemClick}
          />
        </Menu>

        {activeItem === "Events" && (
          <Segment attached="bottom">
            <Grid>
              <Grid.Row>
                <Grid.Column>
                  <Events />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        )}
        {activeItem === "Members" && (
          <Segment attached="bottom">
            <Grid>
              <Grid.Row>
                <Grid.Column>
                  <MembersTable />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        )}
        {activeItem === "Requests" && (
          <Segment attached="bottom">
            <Grid>
              <Grid.Row>
                <Grid.Column>
                  <RequestsTable />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        )}
      </Container>
    </div>
  );
}

export default Admin;
