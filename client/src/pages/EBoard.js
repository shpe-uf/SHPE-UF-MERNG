import React from "react";
import { Container, Grid, Card, Icon } from "semantic-ui-react";

import president from "../assets/images/eboard/president-min.png";
import graduate from "../assets/images/eboard/graduate-min.jpg";
import secretary from "../assets/images/eboard/secretary-min.jpg";
import treasurer from "../assets/images/eboard/treasurer-min.jpg";
import marketing from "../assets/images/eboard/marketing-min.jpg";
import corporate from "../assets/images/eboard/corporate-min.jpg";
import technology from "../assets/images/eboard/technology-min.jpg";
import external from "../assets/images/eboard/external-min.png";
import internal from "../assets/images/eboard/internal-min.png";

function email(email) {
  return (
    <a href={"mailto:" + email} className="link-email">
      <Icon name="mail" />
      Contact me via email
    </a>
  );
}

function EBoard() {
  return (
    <div className="body">
      <div className="masthead masthead-eboard">
        <div className="overlay-blue">
          <Container>
            <h1 className="masthead-title text-white">Executive Board</h1>
          </Container>
        </div>
      </div>

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
