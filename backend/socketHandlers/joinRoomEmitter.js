import gameStart from "./gameStartHandler.js";

export default function emitJoinRoom(socket, io, roomData, roomId, player1Id, player2Id, userName1, userName2) {
    roomData.set(roomId, {
        player1_username: userName1,
        player2_username: userName2,
        player1_side: "X",
        player2_side: "O",
        player1_timer: 0,
        player2_timer: 0,
    });

    io.to(player1Id).emit('join room', {
        room_id: roomId,
        side: "X",
        opponent:  {
            username: userName2,
            elo: 2000,
        }
    });

    io.to(player2Id).emit('join room', {
        room_id: roomId,
        side: "O",
        opponent: {
            username: userName1,
            elo: 1000,
        }
    });
    gameStart(socket,io,roomData, roomId);
    handleTick(socket,io, roomData, roomId);
};

