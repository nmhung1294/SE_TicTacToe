export default function handleGameInvitation(socket, io) {

    socket.on('game invite', (username) => {
        console.log('Player at socket ' + socket.id + "want to invite player " + username + " to a game");
    });
};