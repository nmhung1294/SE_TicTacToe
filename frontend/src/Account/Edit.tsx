import { useState } from "react";
import { FormGroup, Label, Col, Input, Button } from "reactstrap";
import Warning from "../Components/Warning";
import axios from "axios";
import Cookies from "js-cookie";

let token = Cookies.get("token"); 
let player = { username: "a", email: "d" };
await axios
    .get("http://localhost:8000/profile", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    .then((res) => {
        player.email = res.data.data.email;
        player.username = res.data.data.username;
    })
    .catch((err) => {
        console.log(err);
    });

function Edit() {
  const [newUsername, changeUsername] = useState(player.username);
  const [newEmail, changeEmail] = useState(player.email);
  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);

  const Submitting = () => {
    console.log(newUsername);
    console.log(newEmail);
    setSuccess(true);
  };

  return (
    <div>
      <Warning
        color="success"
        content="Information changed successfully"
        visible={success}
        setVisible={() => setSuccess(false)}
      ></Warning>
      <Warning
        color="danger"
        content="Username or email is invalid"
        visible={failed}
        setVisible={() => setFailed(false)}
      ></Warning>
      <FormGroup row>
        <Label sm={2}>Username</Label>
        <Col sm={10}>
          <Input
            type="text"
            onChange={(e) => {
              changeUsername(e.target.value);
            }}
            value={newUsername}
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label sm={2}>Email</Label>
        <Col sm={10}>
          <Input
            type="email"
            onChange={(e) => {
              changeEmail(e.target.value);
            }}
            value={newEmail}
          />
        </Col>
      </FormGroup>
      <Button type="submit" onClick={Submitting}>
        Submit
      </Button>
    </div>
  );
}

export default Edit;
