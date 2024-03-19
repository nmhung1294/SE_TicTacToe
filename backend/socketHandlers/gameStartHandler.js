export default function gameStart(socket, io, roomData, roomId,  userName1, userName2){
    const roomPlayers = roomData.get(roomId);

    io.to(roomId).emit('game start', {
        playerX: roomPlayers.userName1,
        playerO: roomPlayers.userName2
    });
}