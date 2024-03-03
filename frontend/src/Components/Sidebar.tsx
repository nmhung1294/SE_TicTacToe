import "./Sidebar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Nav, NavItem, NavLink } from 'reactstrap';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">
      </div>
      <div className="nav-play sidebar-item">
      </div>
      <div className="nav-leaderboards sidebar-item">
      </div>
      <div className="nav-account sidebar-item">
      </div>
      <div className="nav-settings sidebar-item">
      </div>
    </div>
  );
};

export default Sidebar;