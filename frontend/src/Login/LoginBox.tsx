import React from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useState, useEffect } from "react";
import Warning from "../Components/Warning";
import axios from "axios";
import Cookies from "js-cookie";
import { BACKEND_URL } from "../../constants";

interface Props {
  changeForm: () => void;
}

function LoginBox({ changeForm }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [failure, setFailure] = useState(false);


  const changeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };
  const changePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async () => {
      axios
        .post(`${BACKEND_URL}/login`, {
          username: username,
          password: password,
        })
        .then((res) => {
          if (res.status === 200) {
            Cookies.set("token", res.data.token);
            window.location.href = "/";
          }
          else {
            window.location.href = "/login";  
          }
        })
        .catch((error) => {
          Cookies.remove("token");
          setFailure(true);
          console.error(error);
        });
  };

  return (
    <Form>
      <Warning
        color="danger"
        content="Invalid email or password"
        visible={failure}
        setVisible={() => setFailure(false)}
      ></Warning>
      <FormGroup className="form-group">
        <Label className="label">Username</Label>
        <Input
          type="text"
          className="input"
          value={username}
          onChange={changeUsername}
        />
      </FormGroup>
      <FormGroup className="form-group">
        <Label className="label">Password</Label>
        <Input
          type="password"
          className="input"
          value={password}
          onChange={changePassword}
        />
      </FormGroup>
      <Button
        style={{ backgroundColor: "#0090AB", border: "none" }}
        children="Log in"
        onClick={handleSubmit}
      ></Button>
      <a href="#" onClick={changeForm} style={{ marginLeft: "10px" }}>
        Sign up
      </a>
    </Form>
  );
}

export default LoginBox;
