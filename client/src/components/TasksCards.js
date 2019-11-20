import React from "react";
import { Dimmer, Loader, Segment, Header, Grid, Card, Button } from "semantic-ui-react";
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
          <Card.Group>
            {tasks &&
              tasks.map((task, index) => (
                <Card color="blue">
                  <Card.Content><h5>{task.name}</h5></Card.Content>
                  <Card.Content>
                    {task.points}
                  </Card.Content>
                  <Card.Content>
                    {task.startDate} - {task.endDate}
                  </Card.Content>
                  <Card.Content>{task.description}</Card.Content>
                  <Card.Content>
                    <Button fluid basic color='green'>
                          Request?
                        </Button>
                  </Card.Content>
                </Card>
              ))}
          </Card.Group>
        )}
    </>
  );
}

export default TasksCards;
