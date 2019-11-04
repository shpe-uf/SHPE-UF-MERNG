import React from "react";
import { Grid, Card } from "semantic-ui-react";
import { useQuery, useMutation } from "@apollo/react-hooks";

import { FETCH_TASKS_QUERY } from "../util/graphql";

function TasksCards({ user }) {
  var tasks = useQuery(FETCH_TASKS_QUERY).data.getTasks;

  return (
    <Card.Group itemsPerRow={3}>
      {tasks &&
        tasks.map((task, index) => (
          <Card color="blue">
            <Card.Content>
              <Grid.Row itemsPerRow={2}>
                <Grid.Column>
                  <Card.Header>{task.name}</Card.Header>
                </Grid.Column>
                <Grid.Column>
                  <Card.Header textAlign="right">{task.points}</Card.Header>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Card.Meta>
                  {task.startDate} - {task.endDate}
                </Card.Meta>
                <Card.Description>{task.description}</Card.Description>
              </Grid.Row>
            </Card.Content>
          </Card>
        ))}
    </Card.Group>
  );
}

export default TasksCards;
