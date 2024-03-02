import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useState } from "react";

interface Props {
  changeForm: () => void;
}

function LoginBox({ changeForm }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const changeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const changePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = () => {
    console.log(email, password);
  };

  return (
    <Form>
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
      <Button color="primary" children="Log in"></Button>
      <a href="#" onClick={changeForm}>
        Sign up
      </a>
    </Form>
  );
}

export default LoginBox;
