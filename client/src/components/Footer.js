import React from "react";
import { Container, Grid } from "semantic-ui-react";

function Footer() {
  return (
    <div className="footer">
      <Container>
        <Grid columns={2}>
          <Grid.Row className="footer-padding">
            <Grid.Column width={8}>
            </Grid.Column>
            <Grid.Column width={8} textAlign="right">
              <p>
                Made with <span className="heart">&#9829;</span> @ UF
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </div>
  );
}

export default Footer;
