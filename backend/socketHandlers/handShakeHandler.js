import { v4 as uuidv4 } from "uuid";
import emitJoinRoom from "./joinRoomEmitter.js";
import handleDisconnection from "./disconnectionHandler.js";
import { roomData } from "../src/app.js";

export default function handleHandshake(socket, io, waitingPlayer) {
  socket.on("handshake", (data) => {
    //console.log(data)
    console.log(`-> handshake: user has connected!`);

    waitingPlayer.set(socket.id, data);

    function shiftFirstEntry(map) {
      const iterator = map.entries();
      const firstEntry = iterator.next().value;
      const firstKey = firstEntry[0];
      const firstValue = firstEntry[1];
      map.delete(firstKey);
      return {
        key: firstKey,
        value: firstValue,
      };
    }

    if (waitingPlayer.size >= 2) {
      const player1 = shiftFirstEntry(waitingPlayer);
      const player2 = shiftFirstEntry(waitingPlayer);

      const player1SocketId = player1.key;
      const player2SocketId = player2.key;

      const data1 = player1.value;
      const data2 = player2.value;

      const roomId = uuidv4();

      const player1Socket = io.sockets.sockets.get(player1SocketId);
      const player2Socket = io.sockets.sockets.get(player2SocketId);
      player1Socket.join(roomId);
      player2Socket.join(roomId);

      console.log(
        `Players ${data1.username} and ${data2.username} have connected`
      );

      //console.log(`Room ${roomId} created. Players ${player1SocketId} and ${player2SocketId} joined.`);

      emitJoinRoom(io, roomData, roomId, player1Socket, player2Socket, data1, data2);
      handleDisconnection(socket, io, player1, player2, roomData, waitingPlayer);
    } else {
      console.log("Waiting for more players...");
    }
  });
}
