import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import { config } from "dotenv";
config();

const PORT = 8000;
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

import handleConnection from "../socketHandlers/connectionHandler.js";
import handleJoinRoom from "../socketHandlers/joinRoomHandler.js";
import handleMakeMove from "../socketHandlers/makeMoveHandler.js";
import handleDisconnection from "../socketHandlers/disconnectionHandler.js";
import handleNewChat from "../socketHandlers/chatHandler.js";
import handleGameInvitation from "../socketHandlers/gameInvitationHandler.js";
import handleFriendInvitation from "../socketHandlers/friendInvitationHandler.js";

io.on("connection", (socket) => {
  handleConnection(socket, io);
  handleJoinRoom(socket, io);
  handleMakeMove(socket, io);
  handleDisconnection(socket, io);
  handleNewChat(socket, io);
  handleGameInvitation(socket, io);
  handleFriendInvitation(socket, io);
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
