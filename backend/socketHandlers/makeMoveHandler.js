module.exports = function handleMakeMove(socket, io) {
    socket.on('make move', (data) => {
        io.to(data.room).emit('move made', data);
        console.log('Move made in room: ' + data.room);
    });
};