import React from "react";
import { Container, Grid, Card, Icon } from "semantic-ui-react";

import president from "../images/eboard/president.png";
import graduate from "../images/eboard/graduate.jpg";
import secretary from "../images/eboard/secretary.jpg";
import treasurer from "../images/eboard/treasurer.jpg";
import marketing from "../images/eboard/marketing.jpg";
import corporate from "../images/eboard/corporate.jpg";
import technology from "../images/eboard/technology.jpg";
import external from "../images/eboard/external.png";
import internal from "../images/eboard/internal.png";

function email(email) {
  return (
    <a href={"mailto:" + email} className="link-email">
      <Icon name="mail" />
      {email}
    </a>
  );
}

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
                image={president}
                header="Jose Luis Alegria"
                meta="President"
                extra={email("president.shpeuf@gmail.com")}
              />
            </Grid.Column>
            <Grid.Column className="card-team">
              <Card
                fluid
                image={graduate}
                header="Nicholas Abuid"
                meta="Graduate Coordinator"
                extra={email("graduate.shpeuf@gmail.com")}
              />
            </Grid.Column>
            <Grid.Column className="card-team">
              <Card
                fluid
                image={secretary}
                header="Isabella Campbell"
                meta="Secretary"
                extra={email("secretary.shpeuf@gmail.com")}
              />
            </Grid.Column>
            <Grid.Column className="card-team">
              <Card
                fluid
                image={treasurer}
                header="Anthony Moreno"
                meta="Treasurer"
                extra={email("treasurer.shpeuf@gmail.com")}
              />
            </Grid.Column>
            <Grid.Column className="card-team">
              <Card
                fluid
                image={marketing}
                header="Jonathan Morales"
                meta="Vice President of Marketing"
                extra={email("marketing.shpeuf@gmail.com")}
              />
            </Grid.Column>
            <Grid.Column className="card-team">
              <Card
                fluid
                image={corporate}
                header="Jonathan Medina"
                meta="Vice President of Corporate Affairs"
                extra={email("corporate.shpeuf@gmail.com")}
              />
            </Grid.Column>
            <Grid.Column className="card-team">
              <Card
                fluid
                image={technology}
                header="Rodrigo Lobo"
                meta="Vice President of Technology"
                extra={email("vptech.shpeuf@gmail.com")}
              />
            </Grid.Column>
            <Grid.Column className="card-team">
              <Card
                fluid
                image={external}
                header="Domingo Alegria"
                meta="Vice President of External Affairs"
                extra={email("vpexternal.shpeuf@gmail.com")}
              />
            </Grid.Column>
            <Grid.Column className="card-team">
              <Card
                fluid
                image={internal}
                header="Duncan Ross"
                meta="Vice President of Internal Affairs"
                extra={email("vpinternal.shpeuf@gmail.com")}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </div>
  );
}

export default EBoard;
