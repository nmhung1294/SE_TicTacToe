export default function handleTick(socket, io, roomData, roomId){

    io.in(roomId).on('tick', (socket, data) => {
        let {board, time_count, username, coordinate} = data;
        //Save time_count to map roomData
        if(username == roomData.player1_username){
            roomData.get(roomId).player1_timer = time_count;
        } else {
            roomData.get(roomId).player2_timer = time_count;
        }

        //Check win
        function checkWin(x, y, character, grid) {
            let directions = [[0, 1], [1, 0], [1, 1], [1, -1]];
            for (let direction of directions) {
                let count = 1;
                for (let i = 1; i < 5; i++) {
                    let cor_x = x + direction[0] * i;
                    let cor_y = y + direction[1] * i;
                    if (cor_x < 0 || cor_x >= grid.length || cor_y < 0 || cor_y >= grid[0].length || grid[cor_x][cor_y] !== character) {
                        break;
                    }
                    count++;
                }
                for (let i = 1; i < 5; i++) {
                    let cor_x = x - direction[0] * i;
                    let cor_y = y - direction[1] * i;
                    if (cor_x < 0 || cor_x >= grid.length || cor_y < 0 || cor_y >= grid[0].length || grid[cor_x][cor_y] !== character) {
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
        

        let character = '';

        //Kiểm tra X hay Y
        if(username == roomData.player1_username){
            roomData.get(roomId).player1_side = character;
        } else {
            roomData.get(roomId).player2_side = character;
        }

        let check = checkWin(coordinate.x, coordinate.y, character ,board);

        if(check==true){
            io.to(roomId).emit('end game');
        } else {
            io.to(roomId).emit('next move');
        }

    });
}