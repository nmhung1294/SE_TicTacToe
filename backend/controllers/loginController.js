import { wrapper } from "../middleware/wrapper.js";
import pool from "../config/db.js";

const loggingIn = wrapper(async (req, res) => {
  const { username, password } = req.body;

  const result = await pool.query(
    "select * from users where username = $1 and password = $2;",
    [username, password]
  );
  if (result.rows.length == 0) {
    return res
      .status(400)
      .json({ message: "username or password is incorrect" });
  } else {
    res
      .status(200)
      .json({ message: "login successfully", data: result.rows[0] });
  }
});

export { loggingIn };
