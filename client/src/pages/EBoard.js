import React from "react";
import { Container, Grid, Card } from "semantic-ui-react";

import placeholder from "../images/eboard/placeholder.png";

function EBoard() {
  return (
    <div>
      <Grid>
        <Grid.Row className="no-padding">
          <Grid.Column>
            <div className="masthead masthead-eboard">
              <div className="overlay-blue">
                <Container>
                  <h1 className="masthead-title text-white">Executive Board</h1>
                </Container>
              </div>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Container>
        <Grid stackable columns={3}>
          <Grid.Row>
            <Grid.Column className="card-team">
              <Card
                fluid
                image={placeholder}
                header="Jose Luis Alegria"
                meta="President"
              />
            </Grid.Column>
            <Grid.Column className="card-team">
              <Card
                fluid
                image={placeholder}
                header="Nicholas Abuid"
                meta="Graduate Coordinator"
              />
            </Grid.Column>
            <Grid.Column className="card-team">
              <Card
                fluid
                image={placeholder}
                header="Isabella Campbell"
                meta="Secretary"
              />
            </Grid.Column>
            <Grid.Column className="card-team">
              <Card
                fluid
                image={placeholder}
                header="Anthony Moreno"
                meta="Treasurer"
              />
            </Grid.Column>
            <Grid.Column className="card-team">
              <Card
                fluid
                image={placeholder}
                header="Jonathan Morales"
                meta="Vice President of Marketing"
              />
            </Grid.Column>
            <Grid.Column className="card-team">
              <Card
                fluid
                image={placeholder}
                header="Jonathan Medina"
                meta="Vice President of Corporate Affairs"
              />
            </Grid.Column>
            <Grid.Column className="card-team">
              <Card
                fluid
                image={placeholder}
                header="Rodrigo Lobo"
                meta="Vice President of Technology"
              />
            </Grid.Column>
            <Grid.Column className="card-team">
              <Card
                fluid
                image={placeholder}
                header="Domingo Alegria"
                meta="Vice President of External Affairs"
              />
            </Grid.Column>
            <Grid.Column className="card-team">
              <Card
                fluid
                image={placeholder}
                header="Duncan Ross"
                meta="Vice President of Internal Affairs"
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </div>
  );
}

export default EBoard;
