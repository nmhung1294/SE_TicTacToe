import { useState } from "react";
import { Form, FormGroup, Label, Col, Input, Button } from "reactstrap";

function Info() {
  const player = { username: "dfsda", email: "adfasd", elo: 34 };

  return (
    <Form>
      <FormGroup row>
        <Label sm={2}>
          Username
        </Label>
        <Col sm={10}>
          <Input
            disabled
            name="email"
            type="text"
            placeholder={player.username}
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label sm={2}>
          Email
        </Label>
        <Col sm={10}>
          <Input disabled name="email" placeholder={player.email} type="text" />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label sm={2}>
          Elo
        </Label>
        <Col sm={10}>{player.elo}</Col>
      </FormGroup>
      <FormGroup row>
        <Label sm={2}>
          Total game
        </Label>
        <Col sm={10}>{player.elo}</Col>
      </FormGroup>
      <FormGroup row>
        <Label sm={2}>
          Win
        </Label>
        <Col sm={10}>{player.elo}</Col>
      </FormGroup>
    </Form>
  );
}

export default Info;
