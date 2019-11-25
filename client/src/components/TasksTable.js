import React, { useState } from "react";
import {
  Grid,
  Table,
  Icon,
  Dimmer,
  Loader,
  Segment,
  Header,
  Button,
  Modal,
  Form
} from "semantic-ui-react";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { useForm } from "../util/hooks";
import moment from "moment";
import { CSVLink } from "react-csv";

import { FETCH_USERS_QUERY } from "../util/graphql";

function TasksTable({ tasks }) {
  const [taskInfoModal, setTaskInfoModal] = useState(false);
  const [taskAttendance, setTaskAttendance] = useState({});

  const openModal = name => {
    if (name === "taskInfo") {
      setTaskInfoModal(true);
    }
  };

  const closeModal = name => {
    if (name === "taskInfo") {
      setTaskInfoModal(false);
    }
  };

  function getTaskAttendance(taskInfo) {
    setTaskAttendance(taskInfo);
  }
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
        <div className="table-responsive">
          <Table striped selectable unstackable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Start Date</Table.HeaderCell>
                <Table.HeaderCell>End Date</Table.HeaderCell>
                <Table.HeaderCell>Semester</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">
                  Attendance
                </Table.HeaderCell>
                <Table.HeaderCell textAlign="center">Points</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">Info</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {tasks &&
                tasks.map((task, index) => (
                  <Table.Row key={index}>
                    <Table.Cell>{task.name}</Table.Cell>
                    <Table.Cell>{task.startDate}</Table.Cell>
                    <Table.Cell>{task.endDate}</Table.Cell>
                    <Table.Cell>{task.semester}</Table.Cell>
                    <Table.Cell textAlign="center">
                      {task.attendance}
                    </Table.Cell>
                    <Table.Cell textAlign="center">{task.points}</Table.Cell>
                    <Table.Cell textAlign="center">
                      <Button
                        icon
                        onClick={() => {
                          getTaskAttendance(task);
                          openModal("taskInfo");
                        }}
                      >
                        <Icon name="info" />
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table>
        </div>
      )}
      <Modal
        open={taskInfoModal}
        size="small"
        closeOnEscape={true}
        closeOnDimmerClick={false}
      >
        <Modal.Header>
          <h2>Task Information</h2>
        </Modal.Header>
        <Modal.Content>
          <Grid>
            <Grid.Row>
              <Grid.Column>
                <h3>{taskAttendance.name}</h3>
                <p>{taskAttendance.description}</p>
                <p>Attendance: {taskAttendance.attendance}</p>
                {taskAttendance.attendance === 0 ? (
                  <Segment placeholder>
                    <Header icon>
                      <i className="fas fa-exclamation-circle"></i>
                      <p>This task has no attendance records.</p>
                    </Header>
                  </Segment>
                ) : (
                  <div
                    className="table-responsive"
                    style={{ marginBottom: 16 }}
                  >
                    <Table striped selectable unstackable>
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell>Name</Table.HeaderCell>
                          <Table.HeaderCell>Username</Table.HeaderCell>
                          <Table.HeaderCell>Email</Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        {taskAttendance.users &&
                          taskAttendance.users.map(member => (
                            <Table.Row key={member.username}>
                              <Table.Cell>
                                {member.lastName + "," + member.firstName}
                              </Table.Cell>
                              <Table.Cell>{member.username}</Table.Cell>
                              <Table.Cell>{member.email}</Table.Cell>
                            </Table.Row>
                          ))}
                      </Table.Body>
                    </Table>
                  </div>
                )}
                <Button
                  type="reset"
                  color="grey"
                  onClick={() => closeModal("taskInfo")}
                >
                  Cancel
                </Button>
                <CSVLink
                  data={taskAttendance.users}
                  filename={taskAttendance.name + ".csv"}
                >
                  <Button color="green" floated="right">
                    Download as CSV
                  </Button>
                </CSVLink>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Modal.Content>
      </Modal>
    </>
  );
}

export default TasksTable;
