import React from "react";
import { Grid, Container, Card } from "semantic-ui-react";

import cesar from "../assets/images/team/2019-2020/cesar.jpg";
import eduardo from "../assets/images/team/2019-2020/eduardo.jpg";
import diego from "../assets/images/team/2019-2020/diego.jpg";
import placeholder from "../assets/images/team/placeholder.png";

function DevTeam() {
  return (
    <div className="body">
      <div className="masthead masthead-team">
        <div className="overlay-blue">
          <Container>
            <h1 className="masthead-title text-white">Development Team</h1>
          </Container>
        </div>
      </div>

      <Container>
        <h2>Fall 2019 - Spring 2020</h2>
        <Grid stackable columns={3}>
          <Grid.Row>
            <Grid.Column className="card-team">
              <Card
                fluid
                image={eduardo}
                header="Eduardo Graziano"
                meta="Project Manager"
              />
            </Grid.Column>
            <Grid.Column className="card-team">
              <Card
                fluid
                image={cesar}
                header="César González Peláez"
                meta="Scrum Master"
              />
            </Grid.Column>
            <Grid.Column className="card-team">
              <Card
                fluid
                image={diego}
                header="Diego Coviella"
                meta="Full-Stack Developer"
              />
            </Grid.Column>
            <Grid.Column className="card-team">
              <Card
                fluid
                image={placeholder}
                header="Gabriel Rodriguez Torres"
                meta="Full-Stack Developer"
              />
            </Grid.Column>
            <Grid.Column className="card-team">
              <Card
                fluid
                image={placeholder}
                header="Mariana Torres Torres"
                meta="Full-Stack Developer"
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </div>
  );
}

export default DevTeam;
