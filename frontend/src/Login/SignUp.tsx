import { Form, FormGroup, Label, Input, Button } from "reactstrap";

function SignUp() {
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
        <FormGroup className="form-group">
          <Label className="label">Confirm password</Label>
          <Input type="password" className="input" />
        </FormGroup>
      </Form>
  );
}

export default SignUp;
