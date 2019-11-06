import React from "react";
import { Grid, Container } from "semantic-ui-react";

function Title({ title }) {
  return (
    <div className="masthead masthead-application">
      <Container>
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <h1 className="text-white">{title}</h1>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </div>
  );
}

export default Title;
