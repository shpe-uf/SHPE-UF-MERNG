import React from "react";
import { Container, Grid, Image } from "semantic-ui-react";

import chevron from "../images/sponsors/chevron.jpg";
import exxon from "../images/sponsors/exxon.png";
import facebook from "../images/sponsors/facebook.png";
import google from "../images/sponsors/google.jpg";
import harris from "../images/sponsors/harris.png";
import micron from "../images/sponsors/micron.jpg";
import mosaic from "../images/sponsors/mosaic.png";
import png from "../images/sponsors/png.png";

function Sponsors() {
  return (
    <div>
      <Grid>
        <Grid.Row className="no-padding">
          <Grid.Column>
            <div className="masthead masthead-sponsors">
              <div className="overlay-blue">
                <Container>
                  <h1 className="masthead-title text-white">Sponsors</h1>
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
              <Image
                src={chevron}
                className="sponsor"
                fluid
              />
            </Grid.Column>
            <Grid.Column className="card-team">
              <Image
                src={exxon}
                className="sponsor"
                fluid
              />
            </Grid.Column>
            <Grid.Column className="card-team">
              <Image
                src={facebook}
                className="sponsor"
                fluid
              />
            </Grid.Column>
            <Grid.Column className="card-team">
              <Image
                src={google}
                className="sponsor"
                fluid
              />
            </Grid.Column>
            <Grid.Column className="card-team">
              <Image
                src={harris}
                className="sponsor"
                fluid
              />
            </Grid.Column>
            <Grid.Column className="card-team">
              <Image
                src={micron}
                className="sponsor"
                fluid
              />
            </Grid.Column>
            <Grid.Column className="card-team">
              <Image
                src={mosaic}
                className="sponsor"
                fluid
              />
            </Grid.Column>
            <Grid.Column className="card-team">
              <Image
                src={png}
                className="sponsor"
                fluid
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </div>
  );
}

export default Sponsors;
