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
  Form,
  Grid
} from "semantic-ui-react";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { useForm } from "../util/hooks";
import moment from "moment";
import { CSVLink } from "react-csv";

import { FETCH_USERS_QUERY } from "../util/graphql";

function CorporationTable({ corporations }) {
  return (
    <>
      <Dimmer active={corporations ? false : true} inverted>
        <Loader/>
      </Dimmer>
      {corporations === undefined || corporations.length === 0 ? (
        <Segment placeholder>
          <Header icon>
            <i className="fa fa-inbox"/>
            <p>There are currently no corporations available</p>
          </Header>
        </Segment>
      ) : (
        <div className="table-responsive">
          <Table stripped selectable unstackable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">SHPE Sponsor</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">Industry Partner</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">Fall BBQ</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">Spring BBQ</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">National Convention</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">View/Edit</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">Delete</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {corporations &&
                corporations.map((corporation, index) => (
                  <Table.Row key={index}>
                    <Table.Cell textAlign="center">
                      {corporation.shpeSponsor === true ? (
                        <Icon className="request-true" name="check" />
                      ) : (
                        <Icon className="request-false" name="x" />
                      )}
                    </Table.Cell>
                    <Table.Cell textAlign="center">
                      {corporation.industryPartnership === true ? (
                        <Icon className="request-true" name="check" />
                      ) : (
                        <Icon className="request-false" name="x" />
                      )}
                    </Table.Cell>
                    <Table.Cell textAlign="center">
                      {corporation.fallBBQ === true ? (
                        <Icon className="request-true" name="check" />
                      ) : (
                        <Icon className="request-false" name="x" />
                      )}
                    </Table.Cell>
                    <Table.Cell textAlign="center">
                      {corporation.springBBQ === true ? (
                        <Icon className="request-true" name="check" />
                      ) : (
                        <Icon className="request-false" name="x" />
                      )}
                    </Table.Cell>
                    <Table.Cell textAlign="center">
                      {corporation.nationalConvention === true ? (
                        <Icon className="request-true" name="check" />
                      ) : (
                        <Icon className="request-false" name="x" />
                      )}
                    </Table.Cell>
                    <Table.Cell textAlign="center">
                      <Button
                        icon
                      >
                        <Icon name="info" />
                      </Button>
                    </Table.Cell>
                    <Table.Cell textAlign="center">
                      <Button
                        icon
                      >
                        <Icon name="x" />
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table>
        </div>
      )}
    </>
  )
}

export default CorporationTable;