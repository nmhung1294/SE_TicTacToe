import { useState } from "react";
import {
  Form,
  FormGroup,
  Label,
  Col,
  Input,
  Button,
  UncontrolledAlert,
} from "reactstrap";
import Warning from "../Components/Warning";

function Password() {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);

  const Submitting = () => {
    console.log(newPassword);
    console.log(rePassword);
    if (newPassword != "" && newPassword === rePassword) {
      console.log("changed");
      setNewPassword("");
      setRePassword("");
      setPassword("");
      setSuccess(true);
    } else {
      setFailed(true);
    }
  };

  return (
    <div>
      <Warning
        color="success"
        content="Password changed successfully"
        visible={success}
        setVisible={() => setSuccess(false)}
      ></Warning>
      <Warning
        color="danger"
        content="Wrong password or new password does not match the confirm password"
        visible={failed}
        setVisible={() => setFailed(false)}
      ></Warning>
      <FormGroup row>
        <Label sm={2}>Current password</Label>
        <Col sm={10}>
          <Input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label sm={2}>New password</Label>
        <Col sm={10}>
          <Input
            type="password"
            onChange={(e) => setNewPassword(e.target.value)}
            value={newPassword}
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label sm={2}>Confirm new password</Label>
        <Col sm={10}>
          <Input
            type="password"
            onChange={(e) => setRePassword(e.target.value)}
            value={rePassword}
          />
        </Col>
      </FormGroup>
      <Button type="submit" onClick={Submitting}>
        Submit
      </Button>
    </div>
  );
}
export default Password;
