import endGame from './endGameHandler.js';


export default function handleTimeOut(socket, io, roomData) {
    socket.on('timeOut', (player_timeOut, roomCode) => {
        let room = roomData.get(roomCode);
        if (room) {
            let winner = player_timeOut === room.player1_username ? room.player2_username : room.player1_username;
            endGame(socket, io, roomData, roomCode, winner);
        }
    });
}