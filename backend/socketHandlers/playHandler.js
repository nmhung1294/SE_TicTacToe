export default function handlePlayingGame(socket, io) {
    socket.on('chat', (msg)=>{
        socket.broadcast.emit('chat', msg);
    })
    socket.on('tick', (cor_x, cor_y, character, grid)=>{
        if (checkWin(cor_x, cor_y,character, grid)) {
            io.emit('tick', `${character} win!`)
        }
    })
    function checkWin(x, y, character, grid) {
        
    }
};