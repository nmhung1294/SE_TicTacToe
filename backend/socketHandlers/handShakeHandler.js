import { v4 as uuidv4 } from 'uuid';
import emitJoinRoom from './joinRoomEmitter.js';

//Intialization map roomData
const roomData = new Map();

export default function handleHandshake(socket, io, waitingPlayer) {
  socket.on('handshake', (data) => {
  //console.log(data)
  console.log(`user has connected!`);
  //waitingPlayer.set(socket.id, "hiu");
  if (waitingPlayer.size === 0) {
    waitingPlayer.set(socket.id, data.username1);
  } else if (waitingPlayer.size === 1) {
    waitingPlayer.set(socket.id, data.username2);
  }

  function shiftFirstEntry(map){
    const iterator = map.entries();
    const firstEntry = iterator.next().value;
    const firstKey = firstEntry[0];
    const firstValue = firstEntry[1];
    map.delete(firstKey);
    return{
      key: firstKey, value: firstValue
    };
  }

  if(waitingPlayer.size >= 2){
    const player1 = shiftFirstEntry(waitingPlayer);
    const player2 = shiftFirstEntry(waitingPlayer);

    const player1Id = player1.key;
    const player2Id = player2.key;

    const roomId = uuidv4();

    socket.join(roomId);
    io.to(player1Id).emit('join room', roomId);
    io.to(player2Id).emit('join room', roomId);

    console.log(`Players ${player1.value} and ${player2.value} have connected`);

    //console.log(`Room ${roomId} created. Players ${player1Id} and ${player2Id} joined.`);

    emitJoinRoom(socket,io, roomData, roomId, player1Id, player2Id, data.username1, data.username2)
  } else {
    console.log("Waiting for more players...");
  }

});
};



