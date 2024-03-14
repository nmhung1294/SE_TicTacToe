import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useState } from "react";
import Warning from "../Components/Warning";

interface Props {
  changeForm: () => void;
}

function LoginBox({ changeForm }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [failure, setFailure] = useState(false);

  const changeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const changePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = () => {
    if (email === "admin" && password === "admin") {
      window.location.href = "/";
    } else {
      setFailure(true);
    }
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
        <Label className="label">Email</Label>
        <Input
          type="email"
          className="input"
          value={email}
          onChange={changeEmail}
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
