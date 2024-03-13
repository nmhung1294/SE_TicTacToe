import {
  CardGroup,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
} from "reactstrap";

interface Player {
  username: string;
  match: number;
  win: number;
  points: number;
  ava: string;
}

interface TopPlayerProps {
  players: Player[];
}

function TopPlayer({ players }: TopPlayerProps) {
  while (players.length < 3)
    players.push({ ava: "", username: "", match: 0, win: 0, points: 0 });

  return (
    <div className="cards-holder">
      <Card className="card">
        <CardImg src={players[1].ava} className="card-player-ava" alt="top2"/>
        <CardBody>
          <CardTitle tag="h5">Top 2</CardTitle>
          <CardText> {players[1].username} </CardText>
        </CardBody>
      </Card>
      <Card className="card top1">
        <CardImg src={players[0].ava} className="card-player-ava" alt="top1" />
        <CardBody>
          <CardTitle tag="h5">Top 1</CardTitle>
          <CardText> {players[0].username} </CardText>
        </CardBody>
      </Card>
      <Card className="card">
        <CardImg src={players[2].ava} className="card-player-ava" alt="top3" />
        <CardBody>
          <CardTitle tag="h5">Top 3</CardTitle>
          <CardText> {players[2].username} </CardText>
        </CardBody>
      </Card>
    </div>
  );
}

export default TopPlayer;
