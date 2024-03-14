import "./Sidebar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, Routes, Route, BrowserRouter, Router } from "react-router-dom";
import { Nav, NavItem, NavLink } from "reactstrap";
import Home from "../Home/Home";
import Play from "../Play/Play";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/">
        <div className="logo"></div>
      </Link>
      <Link to="/play">
        <div className="nav-play sidebar-item"></div>
      </Link>
      <Link to="/leaderboards">
        <div className="nav-leaderboards sidebar-item"></div>
      </Link>
      <Link to="/account">
        <div className="nav-account sidebar-item"></div>
      </Link>
      <Link to="/settings">
        <div className="nav-settings sidebar-item"></div>
      </Link>
    </div>
  );
};

export default Sidebar;
