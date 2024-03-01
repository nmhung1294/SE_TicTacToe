export default function handleDisconnection(socket, io) {
  socket.on("disconnect", () => {
    console.log("User disconnected: " + socket.id);
  });
};
