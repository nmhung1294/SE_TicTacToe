import gameStart from "./gameStartHandler.js";
import handleTick from "./tickHandler.js";

export default function emitJoinRoom(io, roomData, roomId, player1Socket, player2Socket, data1, data2) {
    roomData.set(roomId, {
        player1_username: data1.username,
        player2_username: data2.username,
        player1_side: "X",
        player2_side: "O",
        player1_timer: 0,
        player2_timer: 0,
    });

    player1Socket.emit('join room', {
        room_id: roomId,
        side: "X",
        opponent:  {
            username: data2.username,
            elo: data2.elo,
        }
    });

    player2Socket.emit('join room', {
        room_id: roomId,
        side: "O",
        opponent: {
            username: data1.username,
            elo: data1.elo,
        }
    });
    
    gameStart(player1Socket, io, roomData, roomId);
    handleTick(io, player1Socket, roomData)
    handleTick(io, player2Socket, roomData)
};

