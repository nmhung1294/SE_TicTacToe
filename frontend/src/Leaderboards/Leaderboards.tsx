import Sidebar from "../Components/Sidebar";
import TopPlayer from "./TopPlayer";
import "./Leaderboards.css";
import PlayerBoard from "./PlayerBoard";
import SignOut from "../Components/SignOut";

function Leaderboard() {
  return (
    <div className="leaderboard">
      <Sidebar></Sidebar>
      <div className="main-content">
        <SignOut></SignOut>
        <TopPlayer></TopPlayer>
        <PlayerBoard></PlayerBoard>
      </div>
    </div>
  );
}

export default Leaderboard;
