import { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import Warning from "../Components/Warning";
import Password from "../Account/Password";

interface Props {
  changeForm: () => void;
}

function SignUp({ changeForm }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [warning1, setWarning1] = useState(false);
  const [warning2, setWarning2] = useState(false);

  const changeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const changePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const changeConfirmPassword = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(event.target.value);
  };
  const handleSubmit = () => {
    if (password !== confirmPassword) {
      setWarning1(true);
      return;
    }
  };

  return (
    <Form>
      <Warning
        color="success"
        content="Signed up succesfully"
        visible={success}
        setVisible={() => setSuccess(false)}
      ></Warning>
      <Warning
        color="danger"
        content="Passwords do not match"
        visible={warning1}
        setVisible={() => setWarning1(false)}
      ></Warning>
      <Warning
        color="danger"
        content="Invalid email"
        visible={warning2}
        setVisible={() => setWarning2(false)}
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
      <FormGroup className="form-group">
        <Label className="label">Confirm password</Label>
        <Input
          type="password"
          className="input"
          value={confirmPassword}
          onChange={changeConfirmPassword}
        />
      </FormGroup>
      <Button
        style={{ backgroundColor: "#0090AB", border: "none" }}
        children="Sign up"
        onClick={handleSubmit}
        type="submit"
      ></Button>
      <a href="#" onClick={changeForm} style={{ marginLeft: "10px" }}>
        Log in
      </a>
    </Form>
  );
}

export default SignUp;
