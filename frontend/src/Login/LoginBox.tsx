import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useState } from "react";
import { Link } from "react-router-dom";

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
      <Link to='/'>
        <Button style={{backgroundColor: "#0090AB", border: "none"}} children="Log in"></Button>
      </Link>
      <a href="#" onClick={changeForm} style={{marginLeft: "10px"}}>
          Sign up
      </a>
    </Form>
  );
}

export default LoginBox;
