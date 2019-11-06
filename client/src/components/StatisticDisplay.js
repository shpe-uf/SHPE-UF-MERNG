import React from "react";
import {
  Grid,
  Segment,
  Message,
  Table,
  Dimmer,
  Loader,
  Placeholder
} from "semantic-ui-react";
import ReactDOM from "react-dom";
import { VictoryPie, VictoryTooltip } from "victory";
import palette from "google-palette";

function Statistic({ statData }) {
  if (statData) {
    var statArray = [];
    for (var i = 0; i < statData.length; i++) {
      var obj = {
        x: statData[i]._id,
        y: statData[i].value,
        label: statData[i]._id + ": " + statData[i].value
      };
      statArray.push(obj);
    }

    var paletteScale = palette("tol-rainbow", statData.length);

    for (var i = 0; i < paletteScale.length; i++) {
      paletteScale[i] = "#" + paletteScale[i];
    }
  }

  return (
    <Segment attached="bottom">
      {statData ? (
        <Grid stackable>
          <Grid.Row>
            <Grid.Column width={8}>
              {statArray && (
                <VictoryPie
                  colorScale={paletteScale}
                  data={statArray}
                  labelComponent={
                    <VictoryTooltip cornerRadius={4} constrainToVisibleArea />
                  }
                />
              )}
            </Grid.Column>

            <Grid.Column width={8}>
              <div className="table-responsive">
                <Table striped selectable unstackable>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Name</Table.HeaderCell>
                      <Table.HeaderCell>Value</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {statData &&
                      statData.map(stat => (
                        <Table.Row key={stat._id}>
                          <Table.Cell>{stat._id}</Table.Cell>
                          <Table.Cell>{stat.value}</Table.Cell>
                        </Table.Row>
                      ))}
                  </Table.Body>
                </Table>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      ) : (
        <>
          <Dimmer active inverted>
            <Loader />
          </Dimmer>
          <Placeholder fluid>
            <Placeholder.Paragraph>
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
            </Placeholder.Paragraph>
          </Placeholder>
        </>
      )}
    </Segment>
  );
}

export default Statistic;
