module.exports = function handleJoinRoom(socket) {
    socket.on('join room', (room) => {
        socket.join(room);
        console.log('User joined room: ' + room);
    });
};