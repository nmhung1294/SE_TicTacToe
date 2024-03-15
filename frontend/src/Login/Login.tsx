import React from "react";
import "./Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginBox from "./LoginBox";
import SignUp from "./SignUp";
import { useState } from "react";

function Login() {
  const [state, changeState] = useState("/login");
  const toLogin = () => changeState("/login");
  const toSignUp = () => changeState("/signup");

  return (
    <div className="login-page">
      <div className="header"></div>
      {state === "/login" ? (
        <div className="login">
          <LoginBox changeForm={toSignUp}></LoginBox>
        </div>
      ) : (
        <div className="sign-up">
          <SignUp changeForm={toLogin}></SignUp>
        </div>
      )}
    </div>
  );
}

export default Login;
