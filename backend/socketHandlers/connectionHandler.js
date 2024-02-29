module.exports = function handleConnection(socket) {
    console.log('A user connected: ' + socket.id);
    
    socket.on('disconnect', () => {
        console.log('User disconnected: ' + socket.id);
    });
};