import { v4 as uuidv4 } from 'uuid';
export default function handleConnection(socket, io, waitingPlayer) {
  console.log("A user connected! ");
  console.log("socket id: " + socket.id);
  waitingPlayer.push(socket.id);

  if(waitingPlayer.length >= 2){
    const player1Id = waitingPlayer.shift();
    const player2Id = waitingPlayer.shift();

    const roomId = uuidv4();

    socket.join(roomId);
    io.to(player1Id).emit('join room', roomId);
    io.to(player2Id).emit('join room', roomId);

    console.log(`Room ${roomId} created. Players ${player1Id} and ${player2Id} joined.`);

  } else {
    console.log("Waiting for more players...");
  }
};



