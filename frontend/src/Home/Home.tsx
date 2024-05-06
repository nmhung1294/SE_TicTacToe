import "./Home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "reactstrap";
import Sidebar from "../Components/Sidebar";
import Signout from "../Components/Signout";
import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="homepage">
            <Sidebar />
            <Signout />
            <div className="main-content-home">
                <div className="avatar-home content-home"></div>
                <div className="content-home">
                    <b className="username-home">USERNAME</b>
                </div>
                <div className="content-home">
                    <Link to='/play' state={{showDiv: true}}>
                        <Button className="play-now-home" children="PLAY NOW"></Button>
                    </Link>
                    
                </div>
                
            </div>
        </div>
    );
}
  
export default Home;