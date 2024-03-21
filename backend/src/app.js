import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();


const PORT = 8000;
const app = express();
const server = createServer(app);
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(cookieParser())
app.use(express.json());
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});


//Import routers
import loginRouter from "../routes/loginRouter.js";
import signupRouter from "../routes/signupRouter.js";
import profileRouter from "../routes/profileRouter.js";
import leaderBoardRouter from "../routes/leaderBoardRouter.js";

//Import socket handlers
import handleHandshake from "../socketHandlers/handShakeHandler.js";
import handleMakeMove from "../socketHandlers/makeMoveHandler.js";
import handleDisconnection from "../socketHandlers/disconnectionHandler.js";
import handleNewChat from "../socketHandlers/chatHandler.js";
import handleGameInvitation from "../socketHandlers/gameInvitationHandler.js";
import handleFriendInvitation from "../socketHandlers/friendInvitationHandler.js";
import authenticateMiddleware from "../middleware/authenticate.js";

//Intialization map waitingPlayer
const waitingPlayer = new Map();

//Socket handlers
io.on("connection", (socket) => {
  handleHandshake(socket, io, waitingPlayer);
  handleMakeMove(socket, io);
  handleDisconnection(socket, io);
  handleNewChat(socket, io);
  handleGameInvitation(socket, io);
  handleFriendInvitation(socket, io);
});

//use routers

app.use("/login", loginRouter);
app.use("/signup", signupRouter);
app.use(authenticateMiddleware);
app.use("/profile", profileRouter);
app.use("/leaderboard", leaderBoardRouter);

server.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});

export {waitingPlayer}