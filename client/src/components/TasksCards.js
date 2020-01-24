import React, { useContext, useState } from "react";
import { Dimmer, Loader, Segment, Header, Grid, Card, Button } from "semantic-ui-react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";


import { AuthContext } from "../context/auth";

import { FETCH_TASKS_QUERY } from "../util/graphql";

function TasksCards({ user }) {
  const [errors, setErrors] = useState({});
  var tasks = useQuery(FETCH_TASKS_QUERY).data.getTasks;

  var {
    user: { username }
  } = useContext(AuthContext);

  const [redeemTasksPoints] = useMutation(REDEEM_TASK_POINTS_MUTATION, {
    update(
      _,
      {
        data: { redeemTasksPoints: userData }
      }
    ) {
      console.log(userData);

    },

    onError(err) {
      toast.error(err.graphQLErrors[0].extensions.exception.errors.general, {
        position: toast.POSITION.BOTTOM_CENTER
      });
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
      console.log(err);
    }

  });

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
          <Card.Group style={{paddingTop:"20px", paddingLeft:"15px"}}>
            {tasks &&
              tasks.map((task, index) => (
                <Card color="blue" key={index}>
                  <Card.Content>
                    <h5 style={{float:"left"}}>{task.name}</h5>
                    <b><p style={{float:"right"}}>{task.points}</p></b>
                    <Card.Meta style={{clear:"left"}}>{task.startDate} - {task.endDate}</Card.Meta>
                  </Card.Content>
                  <Card.Content>{task.description}</Card.Content>
                  <Card.Content>
                    <Button fluid basic color="green"
                      onClick={() => {
                        redeemTasksPoints({
                          variables: {
                            name: task.name,
                            username: username
                          }
                        });
                      }}
                    >
                      Request
                    </Button>
                  </Card.Content>
                </Card>
              ))}
          </Card.Group>
        )}
    </>
  );
}

const REDEEM_TASK_POINTS_MUTATION = gql`
  mutation redeemTasksPoints($name:String!, $username: String!){
    redeemTasksPoints(
      redeemTasksPointsInput: {name: $name, username: $username}
    ) {
      firstName
      lastName
    }
  }
`;

export default TasksCards;
