import React, { useState, useEffect } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { Segment, Dimmer, Loader } from "semantic-ui-react";

function Confirm(props){
  const [confirming, setConfirming] = useState(true);
  const [loading, setLoading] = useState("active");


  const value  = {
    id: props.match.params.id
  };

  const [confirm] = useMutation(CONFIRM_USER, {

    onCompleted(){
      setConfirming(false);
    },
    variables: value
  });

  useEffect(() => {
    confirm();
  });

  return(
    <div className="loading">

        <Dimmer active={confirming} inverted>
          <Loader size='massive' disabled={!confirming}>Loading</Loader>
        </Dimmer>
        {!confirming && (
          <div>
            <h3>
              Your email is confirmed
            </h3>
          </div>
        )}
    </div>
  );

}

const CONFIRM_USER = gql`
  mutation confirmUser($id: String!) {
    confirmUser(id: $id) {
      id
      email
      username
      createdAt
    }
  }
`

export default Confirm
