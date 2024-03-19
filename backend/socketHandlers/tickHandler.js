export default function handleTick(socket, io, roomData, roomId){

    io.to(roomId).emit('tick',{
            room_id: roomId,
            board: 0,
            time_count: 0,
    });
}