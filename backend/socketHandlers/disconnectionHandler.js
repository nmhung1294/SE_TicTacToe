import handleEndGame from "./endGameHandler.js";

export default function handleDisconnection(
    socket,
    io,
    player1,
    player2,
    roomData,
    waitingPlayer
) {
    socket.on("disconnect", () => {
        console.log(`User ${socket.id} has disconnected.`);

        const index = socket.id;

        //If a player is out while waiting for an opponent
        if (waitingPlayer.has(index)) {
            waitingPlayer.delete(index);
            console.log(`Player ${index} removed from waiting list.`);
        }

        let playerOut = "";
        let winner = "";

        if (index === player1.key) {
            playerOut = player1.value.username;
            winner = player2.value.username;
        } else if (index === player2.key) {
            playerOut = player2.value.username;
            winner = player1.value.username;
        }

        console.log("Player out: ", playerOut);
        console.log("Winner: ", winner);

        roomData.forEach((roomInfo, roomId) => {
            if (
                roomInfo.player1_username === playerOut ||
                roomInfo.player2_username === playerOut
            ) {
                console.log(
                    `Player ${socket.id} has left the game in room ${roomId}.`
                );
                handleEndGame(socket, io, roomData, roomId, winner);

                roomData.delete(roomId);
                console.log(`Room ${roomId} removed.`);

            }
        });
    });
}
