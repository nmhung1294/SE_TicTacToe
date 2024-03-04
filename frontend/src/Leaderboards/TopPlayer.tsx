import {
  CardGroup,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
} from "reactstrap";

function TopPlayer() {
  const players = [
    { ava: "https://picsum.photos/318/180", name: "a" },
    { ava: "https://picsum.photos/318/180", name: "a" },
  ];
  while (players.length < 3) players.push({ ava: "", name: "" });

  return (
    <div className="cards-holder">
      <Card className="card">
        <CardImg src={players[1].ava} className="card-player-ava" />
        <CardBody>
          <CardTitle tag="h5">Top 2</CardTitle>
          <CardText> {players[1].name} </CardText>
        </CardBody>
      </Card>
      <Card className="card top1">
        <CardImg src={players[0].ava} className="card-player-ava" />
        <CardBody>
          <CardTitle tag="h5">Top 1</CardTitle>
          <CardText> {players[0].name} </CardText>
        </CardBody>
      </Card>
      <Card className="card">
        <CardImg src={players[2].ava} className="card-player-ava" />
        <CardBody>
          <CardTitle tag="h5">Top 3</CardTitle>
          <CardText> {players[2].name} </CardText>
        </CardBody>
      </Card>
    </div>
  );
}

export default TopPlayer;
