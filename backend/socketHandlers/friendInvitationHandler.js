export default function handleFriendInvitation(socket, io) {

    socket.on('make friend', (username) => {
        console.log('Player at socket ' + socket.id + "want to make friend with player " + username);
    });
};