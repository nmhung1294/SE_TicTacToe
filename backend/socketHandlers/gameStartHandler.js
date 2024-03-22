export default function gameStart(socket, io, roomId){

    io.to(roomId).emit('game start');
}