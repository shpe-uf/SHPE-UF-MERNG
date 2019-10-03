import React from "react";
import { Grid, Card } from "semantic-ui-react";

function PointsBar({ user }) {
  return (
    <Grid.Row columns={3}>
      <Grid.Column>
        <Card fluid className="fall">
          <Card.Content>
            <p className="points-header">Fall Points</p>
            <p className="points-number">
              {user ? user.fallPoints : "0"}
            </p>
            <p className="points-header">0 Percentile</p>
          </Card.Content>
        </Card>
      </Grid.Column>
      <Grid.Column>
        <Card fluid className="spring">
          <Card.Content>
            <p className="points-header">Spring Points</p>
            <p className="points-number">
              {user ? user.springPoints : "0"}
            </p>
            <p className="points-header">0 Percentile</p>
          </Card.Content>
        </Card>
      </Grid.Column>
      <Grid.Column>
        <Card fluid className="summer">
          <Card.Content>
            <p className="points-header">Summer Points</p>
            <p className="points-number">
              {user ? user.summerPoints : "0"}
            </p>
            <p className="points-header">0 Percentile</p>
          </Card.Content>
        </Card>
      </Grid.Column>
    </Grid.Row>
  );
}

export default PointsBar;