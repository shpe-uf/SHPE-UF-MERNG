import React from "react";
import { Container, Grid } from "semantic-ui-react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer">
      <Container>
        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column width={8}>
              <p>Meet the team</p>
            </Grid.Column>
            <Grid.Column width={8} textAlign="right">
              <p>Made with <span className="heart">&#9829;</span> @ UF</p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </div>
  );
}

export default Footer;
