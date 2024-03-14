export default function handleNewChat(socket, io) {

    socket.on('new chat', () => {
        console.log('A new chat comming from ' + socket.id);
    });
};