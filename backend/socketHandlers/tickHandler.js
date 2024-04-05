import handleEndGame from "./endGameHandler.js";

export default function handleTick(io, socket, roomData) {
    console.log("-> tick is handled");
    socket.on("tick", (data) => {
        // console.log(data);
        let { room_id, board, time_count, username, coordinate } = data;
        let opponent = "";

        console.log(roomData.get(room_id));
        //retransfer the event to room
        io.to(room_id).emit("tick", data);

        //Save time_count to map roomData
        if (username == roomData.get(room_id).player1_username) {
            roomData.get(room_id).player1_timer = time_count;
        } else {
            roomData.get(room_id).player2_timer = time_count;
        }
        //update opponent
        if (username == roomData.get(room_id).player1_username) {
            opponent = roomData.get(room_id).player2_username;
        } else {
            opponent = roomData.get(room_id).player1_username;
        }

        //Check win
        function checkWin(x, y, character, grid) {
            console.log("checkWin:");
            console.log("x: ", x);
            console.log("y: ", y);
            console.log("character: ", character);
            console.log("grid: ", grid);

            let directions = [
                [0, 1],
                [1, 0],
                [1, 1],
                [1, -1],
            ];
            for (let direction of directions) {
                let count = 1;
                for (let i = 1; i < 5; i++) {
                    let cor_x = x + direction[0] * i;
                    let cor_y = y + direction[1] * i;
                    if (
                        cor_x < 0 ||
                        cor_x >= grid.length ||
                        cor_y < 0 ||
                        cor_y >= grid[0].length ||
                        grid[cor_x][cor_y] !== character
                    ) {
                        break;
                    }
                    count++;
                }
                for (let i = 1; i < 5; i++) {
                    let cor_x = x - direction[0] * i;
                    let cor_y = y - direction[1] * i;
                    if (
                        cor_x < 0 ||
                        cor_x >= grid.length ||
                        cor_y < 0 ||
                        cor_y >= grid[0].length ||
                        grid[cor_x][cor_y] !== character
                    ) {
                        break;
                    }
                    count++;
                }
                if (count == 5) {
                    return { haveWinner: true, winner: username };
                }
            }
            return { haveWinner: false, winner: null };
        }

        let character = "";

        //Kiểm tra X hay Y
        if (username == roomData.get(room_id).player1_username) {
            character = "cell-x";
        } else {
            character = "cell-o";
        }

        let check = checkWin(coordinate.x, coordinate.y, character, board);

        console.log(check);
        if (check.haveWinner) {
            handleEndGame(socket, io, roomData, room_id, check.winner);
        } else {
            io.to(room_id).emit("next move", {
                player_in_turn: opponent,
                X_time_count: roomData.get(room_id).player1_timer,
                O_time_count: roomData.get(room_id).player2_timer,
            });
        }
    });
}
