import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const PORT = 8000;
const app = express();
const server = createServer(app);
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
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

//Import socket handlers
import handleHandshake from "../socketHandlers/handShakeHandler.js";
import handleMakeMove from "../socketHandlers/nextMoveHandler.js";
// import handleCancelPlayOnline from "../socketHandlers/cancelPlayOnline.js";


//Intialization map waitingPlayer
const waitingPlayer = new Map();
//Intialization map roomData
const roomData = new Map();

//Socket handlers
io.on("connection", (socket) => {
  handleHandshake(socket, io, waitingPlayer);
  handleMakeMove(socket, io);
  // handleCancelPlayOnline(socket, io);
});
app.use(cors());
//use routers
app.use("/login", loginRouter);
app.use("/signup", signupRouter);
app.use("/profile", profileRouter);

server.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});


export {waitingPlayer, roomData}

