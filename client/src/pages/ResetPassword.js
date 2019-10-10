import React from "react";
import { Form, Button, Container, Segment } from "semantic-ui-react";

import { useForm } from "../util/hooks";

function ResetPassword(props){

  const { onChange, onSubmit, values } = useForm(resetCallback, {
    email: ""
  });

  function resetCallback() {
    
  }

  return (
    <div className="reset">
      <div className="overlay-reset">
        <Container>
          <Segment.Group>
          <Segment className="title-bg-accent-1">
            <h1 className="text-white">Reset Password</h1>
          </Segment>
          <Segment>
            <Form
              onSubmit={onSubmit}
              noValidate
            >
              <Form.Input
                type="text"
                label="Email"
                name="email"
                value={values.email}
                onChange={onChange}
              />
              <span>
                <Button type="submit">Reset Password</Button>
                <p style={{display : 'inline-block', marginTop: 12, marginLeft: 10}}>
                  or <a href="/login">Log In</a>
                </p>
              </span>
            </Form>
          </Segment>
          </Segment.Group>
        </Container>
      </div>
    </div>
  );
}

export default ResetPassword;
