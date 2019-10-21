import React from "react";
import { Grid, Segment, Message, Table } from "semantic-ui-react";
import ReactDOM from "react-dom";
//import * as V from 'victory';
import { VictoryPie } from "victory";
import StatisticData from './StatisticsData';

function Statistic({ statData }) {
  if (statData) {
    var statArray = [];
    for (var i = 0; i < statData.length; i++) {
      var obj = { x: statData[i]._id, y: statData[i].value };
      statArray.push(obj);
    }
  }

  return (
    <Segment attached="bottom">
      <Grid stackable>
        <Grid.Row>

          <Grid.Column width={8}>
            {statArray && <VictoryPie colorScale={["tomato", "blue", "orange", "green"]} data={statArray} />}
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
    </Segment>
  );
}

export default Statistic;
