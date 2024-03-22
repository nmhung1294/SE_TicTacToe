export default function handleDisconnection(socket, io, player1, player2, roomData) {
  socket.on('disconnect', () => {
    console.log(`User ${socket.id} has disconnected.`);

    const index = socket.id;
    let playerOut = '';
    if (index === player1.key) {
      playerOut = player1.value.username;
    } else if (index === player2.key) {
      playerOut = player2.value.username;
    }

    roomData.forEach((roomInfo, roomId) => {
      if (roomInfo.player1_username === playerOut || roomInfo.player2_username === playerOut) {
        console.log(`Player ${socket.id} has left the game in room ${roomId}.`);

        roomData.delete(roomId);
        console.log(`Room ${roomId} removed.`);

        io.to(roomId).emit('end game', { message: 'Game ended because a player disconnected.' });
      }
    });
  });
}