import "./Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginBox from "./LoginBox";
import SignUp from "./SignUp";
import { useState } from "react";

function Login() {
  let numState = 2;
  const [state, changeState] = useState(0);
  const handleClick = () => {
    changeState((state + 1) % numState);
  };

  return (
    <div className="login-page">
      <div className="header"></div>
      {state === 0 ? (
        <div className="login">
          <LoginBox changeForm={handleClick}></LoginBox>
        </div>
      ) : (
        <div className="sign-up">
          <SignUp changeForm={handleClick}></SignUp>
        </div>
      )}
    </div>
  );
}

export default Login;
