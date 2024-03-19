export default function handleNewChat(socket, io) {

    socket.on('new chat', () => {
        //console.log('A new chat comming from ' + socket.id);
        socket.on("chat message", (msg) => {
            io.emit("chat message", msg);
          });
    });
};