export default function handlePlayingGame(socket, io) {
    socket.on('chat', (msg)=>{
        socket.broadcast.emit('chat', msg);
    })
    socket.on('tick', (cor_x, cor_y, character, grid)=>{
        if (checkWin(cor_x, cor_y,character, grid)) {
            io.emit('tick', {msg : `${character} win!`})
        }
    })
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
};