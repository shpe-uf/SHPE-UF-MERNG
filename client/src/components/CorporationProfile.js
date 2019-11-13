import React from "react";
import { Grid } from "semantic-ui-react";
import { GraphQLSkipDirective } from "graphql";

function CorporationProfile({corporation}) {
  console.log(corporation);
    return(
      <>
        <Grid columns={2}>
          <Grid.Row>
            <h3>{corporation.name}</h3>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={4}>
              <h3>Image</h3>
            </Grid.Column>
            <Grid.Column textAlign="left">
              <h3>Overview</h3>
              <p>Hello world</p>
              <h3>Mission</h3>
              <p>Hello World</p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </>
    );
}

export default CorporationProfile;