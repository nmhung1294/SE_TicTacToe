import "./account.css";
import Sidebar from "../Components/Sidebar";
import SignOut from "../Components/SignOut";
import Info from "./Info";
import Edit from "./Edit";
import Avatar from "./Avatar";
import { useState } from "react";
import {
  Button,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
  Nav,
  NavItem,
  NavLink,
  Col,
} from "reactstrap";

function Account() {
  const [state, setState] = useState(0);
  const toInfo = () => {
    setState(0);
  };
  const toEdit = () => {
    setState(1);
  };
  const toChangeAva = () => {
    setState(2);
  };
  const toChangePassword = () => {
    setState(3);
  };

  const ChangeAvatar = () => {
    return (
      <Form>
        <FormGroup>
          <Input id="File" name="file" type="file" />
          <FormText>Upload your new avatar</FormText>
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    );
  };

  const ChangePassword = () => {
    return (
      <Form>
        <FormGroup row>
          <Label sm={2}>Current password</Label>
          <Col sm={10}>
            <Input type="password" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>New password</Label>
          <Col sm={10}>
            <Input type="password" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>Confirm password</Label>
          <Col sm={10}>
            <Input type="password" />
          </Col>
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    );
  };

  return (
    <div className="account-page">
      <Sidebar></Sidebar>
      <div className="main-content">
        <SignOut></SignOut>
        <div style={{ alignSelf: "center", paddingTop: "40px" }}>
          <Avatar></Avatar>
          <div style={{ paddingTop: "20px" }}>
            <Nav tabs>
              <NavItem>
                <NavLink active={state === 0} onClick={toInfo}>
                  Information
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink active={state === 1} onClick={toEdit}>
                  Edit
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink active={state === 2} onClick={toChangeAva}>
                  Change Avatar
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink active={state === 3} onClick={toChangePassword}>
                  Change Password
                </NavLink>
              </NavItem>
            </Nav>
            <div
              style={{
                backgroundColor: "white",
                padding: "20px",
                borderBottomRightRadius: "20px",
                borderBottomLeftRadius: "20px",
              }}
            >
              {state === 0 ? (
                <Info />
              ) : state === 1 ? (
                <Edit />
              ) : state === 2 ? (
                <ChangeAvatar></ChangeAvatar>
              ) : (
                <ChangePassword></ChangePassword>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
