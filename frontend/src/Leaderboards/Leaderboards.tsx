import Sidebar from "../Components/Sidebar";
import TopPlayer from "./TopPlayer";
import "./Leaderboards.css";
import PlayerBoard from "./PlayerBoard";
import Signout from "../Components/Signout";
import axios from "axios";

let playerData: any[];
await axios.get("http://localhost:8000/leaderboard").then((res) => {
  playerData = res.data.data;
  console.log(playerData);
}).catch((err) => {
  console.log(err);
});

function Leaderboard() {
  let allPlayers = [{ username: "haha", match: 0, win: 0, points: 0, ava: "AVATAR" }];
  allPlayers.pop();
  playerData.forEach((player) => {
    allPlayers.push({
      username: player.username,
      match: player.number_of_games,
      win: player.win,
      points: player.elo,
      ava: "https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg",
    });
  });

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
