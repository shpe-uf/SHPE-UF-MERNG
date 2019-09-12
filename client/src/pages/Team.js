import React from "react";
import { Grid, Container, Card } from "semantic-ui-react";

import cesar from "../images/team/2019-2020/cesar.jpg";
import eduardo from "../images/team/2019-2020/eduardo.jpg";
import alejandro from "../images/team/2019-2020/alejandro.jpg";
import david from "../images/team/2019-2020/david.jpg";
import diego from "../images/team/2019-2020/diego.jpg";
import isabel from "../images/team/2019-2020/isabel.jpg";
import joseph from "../images/team/2019-2020/joseph.jpg";
import juan from "../images/team/2019-2020/juan.jpg";
import scott from "../images/team/2019-2020/scott.jpg";
import sofia from "../images/team/2019-2020/sofia.jpg";
import valentina from "../images/team/2019-2020/valentina.jpg";
import placeholder from "../images/team/placeholder.png";

function Team() {
  return (
    <div>
      <Grid>
        <Grid.Row className="no-padding">
          <Grid.Column>
            <div className="masthead masthead-team">
              <div className="overlay-blue">
                <Container>
                  <h1 className="masthead-title text-white">Meet the team</h1>
                </Container>
              </div>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Container>
        <h1>Fall 2019 - Spring 2020</h1>
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
                image={alejandro}
                header="Alejandro Alonso"
                meta="Software Engineer"
              />
            </Grid.Column>
            <Grid.Column className="card-team">
              <Card
                fluid
                image={joseph}
                header="Joseph Bensabat"
                meta="Software Engineer"
              />
            </Grid.Column>
            <Grid.Column className="card-team">
              <Card
                fluid
                image={valentina}
                header="Valentina Casteline"
                meta="Software Engineer"
              />
            </Grid.Column>
            <Grid.Column className="card-team">
              <Card
                fluid
                image={diego}
                header="Diego Coviella"
                meta="Software Engineer"
              />
            </Grid.Column>
            <Grid.Column className="card-team">
              <Card
                fluid
                image={david}
                header="David Espantoso"
                meta="Software Engineer"
              />
            </Grid.Column>
            <Grid.Column className="card-team">
              <Card
                fluid
                image={sofia}
                header="Sofia Harmon"
                meta="Software Engineer"
              />
            </Grid.Column>
            <Grid.Column className="card-team">
              <Card
                fluid
                image={scott}
                header="Scott Lagler"
                meta="Software Engineer"
              />
            </Grid.Column>
            <Grid.Column className="card-team">
              <Card
                fluid
                image={isabel}
                header="Isabel Mitre"
                meta="Software Engineer"
              />
            </Grid.Column>
            <Grid.Column className="card-team">
              <Card
                fluid
                image={placeholder}
                header="Roberto Profeta"
                meta="Software Engineer"
              />
            </Grid.Column>
            <Grid.Column className="card-team">
              <Card
                fluid
                image={placeholder}
                header="Gabriel Rodriguez Torres"
                meta="Software Engineer"
              />
            </Grid.Column>
            <Grid.Column className="card-team">
              <Card
                fluid
                image={juan}
                header="Juan Suhr"
                meta="Software Engineer"
              />
            </Grid.Column>
            <Grid.Column className="card-team">
              <Card
                fluid
                image={placeholder}
                header="Mariana Torres Torres"
                meta="Software Engineer"
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </div>
  );
}

export default Team;
