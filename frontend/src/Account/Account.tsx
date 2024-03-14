import "./account.css";
import Sidebar from "../Components/Sidebar";
import SignOut from "../Components/SignOut";
import Info from "./Info";
import Edit from "./Edit";
import Avatar from "./Avatar";
import Password from "./Password";
import { useState } from "react";
import { Nav, NavItem, NavLink } from "reactstrap";
import ChangeAvatar from "./ChangeAvatar";

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

  const Navi = () => {
    return (
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
            {Navi()}
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
                <ChangeAvatar />
              ) : (
                <Password />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
