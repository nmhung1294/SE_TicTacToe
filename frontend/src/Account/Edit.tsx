import { useState } from "react";
import { Form, FormGroup, Label, Col, Input, Button } from "reactstrap";

function Edit() {
  const player = { username: "a", email: "d" };

  return (
    <Form>
      <FormGroup row>
        <Label sm={2}>
          Username
        </Label>
        <Col sm={10}>
          <Input name="email" placeholder={player.username} type="text" />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label sm={2}>
          Email
        </Label>
        <Col sm={10}>
          <Input name="email" placeholder={player.email} type="text" />
        </Col>
      </FormGroup>
      <Button>Submit</Button>
    </Form>
  );
}

export default Edit;
