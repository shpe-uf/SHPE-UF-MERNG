import React, { useState } from "react";
import {
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
                    <Table.Cell textAlign="center">{task.attendance}</Table.Cell>
                    <Table.Cell textAlign="center">{task.points}</Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table>
        </div>
      )}
    </>
  );
}

export default TasksTable;
