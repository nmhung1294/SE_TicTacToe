import "./Home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "reactstrap";
import Sidebar from "../Components/Sidebar";

function Home() {
    return (
        <div className="homepage">
            <Sidebar />
            <div className="sign-out"></div>
            <div className="main-content">
                <div className="avatar content"></div>
                <div className="content">
                    <b className="username">USERNAME</b>
                </div>
                <div className="content">
                    <Button className="play-now content" children="PLAY NOW"></Button>
                </div>
                
            </div>
        </div>
    );
}
  
export default Home;