import { v4 as uuidv4 } from 'uuid';
import emitJoinRoom from './joinRoomEmitter.js';
import handleDisconnection from './disconnectionHandler.js';

//Intialization map roomData
const roomData = new Map();

export default function handleHandshake(socket, io, waitingPlayer) {
  socket.on('handshake', (data) => {
  //console.log(data)
  console.log(`user has connected!`);

  waitingPlayer.set(socket.id, data);


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
    
    const data1 = player1.value;
    const data2 = player2.value;

    const roomId = uuidv4();

    socket.join(roomId);
    io.to(player1Id).emit('join room', roomId);
    io.to(player2Id).emit('join room', roomId);

    console.log(`Players ${data1.username} and ${data2.username} have connected`);

    //console.log(`Room ${roomId} created. Players ${player1Id} and ${player2Id} joined.`);

    emitJoinRoom(socket,io, roomData, roomId, player1Id, player2Id, data1, data2);
    handleDisconnection(socket, io, player1, player2, roomData);
  } else {
    console.log("Waiting for more players...");
  }

});
};



