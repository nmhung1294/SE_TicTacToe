import { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

interface Props {
  changeForm: () => void;
}

function SignUp({ changeForm }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const changeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const changePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const handleSubmit = () => {};

  return (
    <Form onSubmit={handleSubmit}>
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
      <FormGroup className="form-group">
        <Label className="label">Confirm password</Label>
        <Input type="password" className="input" />
      </FormGroup>
      <Button color="primary" children="Sign up"></Button>
      <a href="#" onClick={changeForm}>
        Log in
      </a>
    </Form>
  );
}

export default SignUp;
