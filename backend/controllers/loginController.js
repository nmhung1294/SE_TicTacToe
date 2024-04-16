import { wrapper } from "../middleware/wrapper.js";
import pool from "../config/db.js";
import { createHash } from "../utils/hash.js";
import sessionStorage from "node-sessionstorage";

const loggingIn = wrapper(async (req, res) => {
    const { username, password } = req.body;
    const token = createHash(username, password);

    const result = await pool.query(
        "select * from users where username = $1 and password = $2",
        [username, password]
    );
    if (result.rows.length == 0) {
        return res.status(400).json({
            message: "username or password is incorrect",
        });
    } else {
        sessionStorage.setItem(
            token,
            JSON.stringify({
                username: username,
                password: password,
                id: result.rows[0].id,
                elo: result.rows[0].elo,
            })
        );
        res.status(200).json({
            message: "login successfullyy",
            data: result.rows[0],
            token: token,
        });
    }
});

export { loggingIn };
