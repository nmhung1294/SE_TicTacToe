const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const dotenv = require("dotenv");
const createRoomCode = require("../utils/createRoomCode.js");
dotenv.config();

const PORT = 8000;
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const handleConnection = require('../socketHandlers/connectionHandler');
const handleJoinRoom = require('../socketHandlers/joinRoomHandler');
const handleMakeMove = require('../socketHandlers/makeMoveHandler');

io.on("connection", (socket) => {
  handleConnection(socket);
  handleJoinRoom(socket);
  handleMakeMove(socket);
});

app.get("/login", (req, res) => {
  res.send("<h1>Welcome to the login page!</h1>");
});

app.get("/signup", (req, res) => {
  res.send("<h1>Welcome to the signup page!</h1>");
});

app.get("/", (req, res) => {
  res.send("<h1>Welcome to the homepage!</h1>");
});

app.use(cors(process.env.FRONTEND_URL));

server.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
