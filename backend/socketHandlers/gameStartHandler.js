export default function gameStart(socket, io, roomData, roomId){

    io.in(roomId).emit('game start');
}