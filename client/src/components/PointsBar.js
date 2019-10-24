import React from "react";
import { Grid, Responsive, Segment } from "semantic-ui-react";

function PointsBar({ user }) {
  return (
    <>
      <Responsive minWidth={768}>
        <Grid columns={3}>
          <Grid.Row>
            <Grid.Column className="no-padding">
              <div className="fall">
                <Segment vertical>
                  <p className="points-header">Fall Points</p>
                </Segment>
                <Segment vertical className="no-padding">
                  <p className="points-number">
                    {user ? user.fallPoints : "0"}
                  </p>
                </Segment>
                <Segment vertical>
                  <p className="points-header">0 Percentile</p>
                </Segment>
              </div>
            </Grid.Column>
            <Grid.Column className="no-padding">
              <div className="spring">
                <Segment vertical>
                  <p className="points-header">Spring Points</p>
                </Segment>
                <Segment vertical className="no-padding">
                  <p className="points-number">
                    {user ? user.springPoints : "0"}
                  </p>
                </Segment>
                <Segment vertical>
                  <p className="points-header">0 Percentile</p>
                </Segment>
              </div>
            </Grid.Column>
            <Grid.Column className="no-padding">
              <div className="summer">
                <Segment vertical>
                  <p className="points-header">Summer Points</p>
                </Segment>
                <Segment vertical className="no-padding">
                  <p className="points-number">
                    {user ? user.summerPoints : "0"}
                  </p>
                </Segment>
                <Segment vertical>
                  <p className="points-header">0 Percentile</p>
                </Segment>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Responsive>
      <Responsive maxWidth={767}>
        <Grid>
          <Grid.Row>
            <Grid.Column className="no-padding">
              <div className="fall">
                <Segment vertical>
                  <p className="points-header">Fall Points</p>
                </Segment>
                <Segment vertical className="no-padding">
                  <p className="points-number">
                    {user ? user.fallPoints : "0"}
                  </p>
                </Segment>
                <Segment vertical>
                  <p className="points-header">0 Percentile</p>
                </Segment>
              </div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column className="no-padding">
              <div className="spring">
                <Segment vertical>
                  <p className="points-header">Spring Points</p>
                </Segment>
                <Segment vertical className="no-padding">
                  <p className="points-number">
                    {user ? user.springPoints : "0"}
                  </p>
                </Segment>
                <Segment vertical>
                  <p className="points-header">0 Percentile</p>
                </Segment>
              </div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column className="no-padding">
              <div className="summer">
                <Segment vertical>
                  <p className="points-header">Summer Points</p>
                </Segment>
                <Segment vertical className="no-padding">
                  <p className="points-number">
                    {user ? user.summerPoints : "0"}
                  </p>
                </Segment>
                <Segment vertical>
                  <p className="points-header">0 Percentile</p>
                </Segment>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Responsive>
    </>
  );
}

export default PointsBar;
