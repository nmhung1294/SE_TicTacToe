export default function handleTick(io, socket, roomData) {
  console.log("-> tick is handled");
  socket.on("tick", (data) => {
    console.log(data);
    let { room_id, board, time_count, username, coordinate } = data;

    //retransfer the event to room
    io.to(room_id).emit("tick", data);

    //Save time_count to map roomData
    if (username == roomData.player1_username) {
      roomData.get(room_id).player1_timer = time_count;
    } else {
      roomData.get(room_id).player2_timer = time_count;
    }

    //Check win
    function checkWin(x, y, character, grid) {
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
          return true;
        }
      }
      return false;
    }

    let character = "";

    //Kiểm tra X hay Y
    if (username == roomData.player1_username) {
      roomData.get(room_id).player1_side = character;
    } else {
      roomData.get(room_id).player2_side = character;
    }

    let check = checkWin(coordinate.x, coordinate.y, character, board);

    if (check == true) {
      io.to(room_id).emit("end game");
    } else {
      io.to(room_id).emit("next move");
    }
  });
}
