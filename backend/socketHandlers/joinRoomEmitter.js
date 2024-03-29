import gameStart from "./gameStartHandler.js";

export default function emitJoinRoom(socket, io, roomData, roomId, player1Id, player2Id, data1, data2) {
    roomData.set(roomId, {
        player1_username: data1.username,
        player2_username: data2.username,
        player1_side: "X",
        player2_side: "O",
        player1_timer: 0,
        player2_timer: 0,
    });

    io.to(player1Id).emit('join room', {
        room_id: roomId,
        side: "X",
        opponent:  {
            username: data2.username,
            elo: data2.elo,
        }
    });

    io.to(player2Id).emit('join room', {
        room_id: roomId,
        side: "O",
        opponent: {
            username: data1.username,
            elo: data1.elo,
        }
    });
    gameStart(socket,io,roomData, roomId);
    handleTick(socket,io, roomData, roomId);
};

