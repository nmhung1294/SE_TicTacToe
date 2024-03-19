export default function handleMakeMove(socket, io, roomData) {
    socket.on('nextMove', (player_in_turn, X_timeCount, O_timeCount, roomCode) => {
            let room = roomData.get(roomCode);
            if (room) {
                if (player_in_turn === room.player1_username) {
                    let time = X_timeCount;
                    room.player1_timer = time;
                    io.to(roomCode).emit('nextMove', {player_in_turn, time: time});

                }
                else {
                    let time = O_timeCount;
                    room.player2_timer = time;
                    io.to(roomCode).emit('nextMove', {player_in_turn, time: time});
                }
            }
    });
};