import { wrapper } from "../middleware/wrapper.js";
import pool from "../config/db.js";
import jwt from "jsonwebtoken";

const loggingIn = wrapper(async (req, res) => {
  const { username, password } = req.body;

  const result = await pool.query(
    "select * from users where username = $1 and password = $2",
    [username, password]
  );
  if (result.rows.length == 0) {
    return res
      .status(400)
      .json({ message: "username or password is incorrect" });
  } else {
    jwt.sign(result.rows[0], "privatekey", { expiresIn: "1h" }, (err, token) => {
      if (err) {
        console.log(err);
      }
      res.send(token);
    });


    res
      .status(200)
      .json({ message: "login successfully", data: result.rows[0] });
  }
});

export { loggingIn };
