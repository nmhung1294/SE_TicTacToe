import "./Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginBox from "./LoginBox";
import SignUp from "./SignUp";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";

function Login() {
  let numState = 2;
  const [state, changeState] = useState(0);
  const handleClick = () => {
    changeState((state + 1) % numState);
  };
  // const navigate = useNavigate();
 
  // const homePage = () => {
  //     navigate("/home")
  // }

  return (
    <div className="login-page">
      <div className="header"></div>
      {state === 0 ? (
        <div className="login">
          <LoginBox></LoginBox>
          <span>
            <Button style={{backgroundColor: "#0090AB", border: "none"}} children="Log in"></Button>
            <a href="#" onClick={handleClick} style={{marginLeft: "10px"}}>
               Sign up
            </a>
          </span>
        </div>
      ) : (
        <div className="sign-up">
          <SignUp></SignUp>
          <span>
            <Button style={{backgroundColor: "#0090AB", border: "none"}} children="Sign up"></Button>
            <a href="#" onClick={handleClick} style={{marginLeft: "10px"}}>
              Log in
            </a>
          </span>
        </div>
      )}
    </div>
  );
}

export default Login;
