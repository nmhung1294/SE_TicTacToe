export default function handleGameInvitation(socket, io) {

    socket.on('game invite', (username) => {
        console.log('Player at socket ' + socket.id + "want to invite player " + username + " to a game");
    });
    socket.on('user_invite', (user_name)=>{
        socket.broadcast.emit('user_invite', `Player ${user_name} want to play with you!`)
    });

    socket.on('res_invitation', (msg)=>{
        if (msg == "OK") {
            socket.broadcast.emit('invitation_response', {status: 'accepted'})
        }
        else {
            socket.broadcast.emit('invitation_response', {status: 'denied'}) 
        }
    });
};