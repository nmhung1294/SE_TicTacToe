import { FormGroup, Input, FormText, Button } from "reactstrap";

function ChangeAvatar() {
  return (
    <div>
      <FormGroup>
        <Input id="File" name="file" type="file" />
        <FormText>Upload your new avatar</FormText>
      </FormGroup>
      <Button>Submit</Button>
    </div>
  );
}
export default ChangeAvatar;
