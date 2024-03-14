export default function handleMakeMove(socket, io) {
    socket.on('make move', () => {
        console.log('Move made in room: ' + socket.id);
    });
};