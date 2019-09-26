import React from "react";
import { Grid, Container, Card } from "semantic-ui-react";

import cesar from "../assets/images/team/2019-2020/cesar.jpg";
import eduardo from "../assets/images/team/2019-2020/eduardo.jpg";
import alejandro from "../assets/images/team/2019-2020/alejandro.jpg";
import david from "../assets/images/team/2019-2020/david.jpg";
import diego from "../assets/images/team/2019-2020/diego.jpg";
import isabel from "../assets/images/team/2019-2020/isabel.jpg";
import joseph from "../assets/images/team/2019-2020/joseph.jpg";
import juan from "../assets/images/team/2019-2020/juan.jpg";
import scott from "../assets/images/team/2019-2020/scott.jpg";
import sofia from "../assets/images/team/2019-2020/sofia.jpg";
import valentina from "../assets/images/team/2019-2020/valentina.jpg";
import placeholder from "../assets/images/team/placeholder.png";

function DevTeam() {
  return (
    <div>
      <Grid>
        <Grid.Row className="no-padding">
          <Grid.Column>
            <div className="masthead masthead-team">
              <div className="overlay-blue">
                <Container>
                  <h1 className="masthead-title text-white">Development Team</h1>
                </Container>
              </div>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
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

export default DevTeam;