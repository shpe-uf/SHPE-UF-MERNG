import React, { useContext } from "react";
import { Container, Grid } from "semantic-ui-react";
import { useQuery } from "@apollo/react-hooks";

import Title from "../components/Title";
import AlumniTable from "../components/AlumniTable";

import {FETCH_ALUMNIS_QUERY} from "../util/graphql";

function AlumniDirectory() {
  var alumnis = useQuery(FETCH_ALUMNIS_QUERY).data.getAlumnis;

  return (
    <div className="body">
      <Title title="Alumni Directory" />
      <Container className="body">
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <AlumniTable alumnis={alumnis}/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </div>
  );
}

export default AlumniDirectory;
