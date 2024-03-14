import createRoomCode from "../utils/createRoomCode.js"

export default function handleJoinRoom(socket, io) {
    socket.on('join room', () => {
        const room = createRoomCode();
        socket.join(room);
        console.log('User joined room: ' + room);
        socket.emit('room joined');
    });
};

