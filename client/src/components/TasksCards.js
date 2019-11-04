import React from "react";
import { Dimmer, Loader, Segment, Header, Grid, Card } from "semantic-ui-react";
import { useQuery, useMutation } from "@apollo/react-hooks";

import { FETCH_TASKS_QUERY } from "../util/graphql";

function TasksCards({ user }) {
  var tasks = useQuery(FETCH_TASKS_QUERY).data.getTasks;

  return (
    <>
      <Dimmer active={tasks ? false : true} inverted>
        <Loader />
      </Dimmer>
      {tasks === undefined || tasks.length === 0 ? (
        <Segment placeholder>
          <Header icon>
            <i className="fas fa-inbox"></i>
            <p>It seems like there are no tasks at this moment.</p>
          </Header>
        </Segment>
      ) : (
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
      )}
    </>
  );
}

export default TasksCards;
