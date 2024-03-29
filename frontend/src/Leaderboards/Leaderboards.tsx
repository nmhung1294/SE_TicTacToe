import Sidebar from "../Components/Sidebar";
import TopPlayer from "./TopPlayer";
import "./Leaderboards.css";
import PlayerBoard from "./PlayerBoard";
import Signout from "../Components/Signout";
function Leaderboard() {
  const allPlayers = [
    {
      username: "abc",
      match: 6,
      win: 2,
      points: 1235555555,
      ava: "https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg",
    },
  ];
  return (
    <div className="leaderboard">
      <Sidebar></Sidebar>
      <Signout></Signout>
      <div className="main-content-leaderboard">
        <TopPlayer players={allPlayers.slice(0, 3)}></TopPlayer>
        <PlayerBoard allPlayers={allPlayers}></PlayerBoard>
      </div>
    </div>
  );
}

export default Leaderboard;
