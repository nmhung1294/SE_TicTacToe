import "./Signout.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, Routes, Route, BrowserRouter, Router } from "react-router-dom";
import { Nav, NavItem, NavLink } from 'reactstrap';
import Home from "../Home/Home";
import Play from "../Play/Play";

const Signout = () => {
  return (
    
    <Link to="/login">
        <div className="sign-out"></div>
    </Link>
  );
};

export default Signout;