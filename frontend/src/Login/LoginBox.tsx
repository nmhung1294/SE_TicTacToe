import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { Link } from "react-router-dom";

function LoginBox() {
  let state = 0;

  const handleSubmit = () => {};
  return (
      <Form onSubmit={handleSubmit}>
        <FormGroup className="form-group">
          <Label className="label">Email</Label>
          <Input type="email" className="input" />
        </FormGroup>
        <FormGroup className="form-group">
          <Label className="label">Password</Label>
          <Input type="password" className="input" />
        </FormGroup>
      </Form>
  );
}

export default LoginBox;
