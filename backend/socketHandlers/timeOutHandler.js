import endGame from "./endGameHandler.js";

export default function handleTimeOut(socket, io, roomData) {
    socket.on("time out", (data) => {
        let { room_id, time_out_player } = data;
        console.log("-> time out is handled");
        let room = roomData.get(room_id);
        if (room) {
            console.log("time_out_player: ", time_out_player)
            console.log('player 1: ', room.player1_username)
            console.log('player 2: ', room.player2_username)
            let winner = 
                time_out_player === room.player1_username
                ? room.player2_username
                    : room.player1_username;
            console.log("winner: ", winner)
            endGame(socket, io, roomData, room_id, winner);
        }
    });
}

//Hàm này xử lý khi một người chơi hết thời gian
// Gọi function endGame để xử lý kết thúc game
