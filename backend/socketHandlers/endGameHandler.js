
import pool from "../config/db.js";

export default async function handleEndGame(socket, io, roomData, roomCode, winner_username) {
        let room = roomData.get(roomCode);
        if (room) {
            let date = new Date();
            console.log(date);

            let winner_id_result = await pool.query("SELECT id FROM users WHERE username = $1", [winner_username]); // Add await here
            let winner_id = winner_id_result.rows[0].id; 

            await pool.query("UPDATE users SET win = win + 1 WHERE id = $1", [winner_id]);
            await pool.query("UPDATE users SET elo = elo + 100 WHERE id = $1", [winner_id]);
            await pool.query("UPDATE users SET number_of_games = number_of_games + 1 WHERE username = $1", [room.player1_username]);
            await pool.query("UPDATE users SET number_of_games = number_of_games + 1 WHERE username = $1", [room.player2_username]);

            let id1_result = await pool.query("SELECT id FROM users WHERE username = $1", [room.player1_username]);
            let id1 = id1_result.rows[0].id;
            let id2_result = await pool.query("SELECT id FROM users WHERE username = $1", [room.player2_username]);
            let id2 = id2_result.rows[0].id;

            await pool.query("insert into gamehistory (time, player_id_1, player_id_2, winner_id) values ($1, $2, $3, $4)", [date, id1, id2, winner_id]);
            //roomData.delete(roomCode); Nếu thấy việc xóa là cần thiết
            io.to(roomCode).emit('endgame', {winner: winner_username});
        }
};