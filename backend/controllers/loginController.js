import { wrapper } from "../middleware/wrapper.js";
import pool from "../config/db.js";
import jwt from "jsonwebtoken";

const loggingIn = wrapper(async (req, res) => {
  const { username, password } = req.body;

  // check if username and password are provided properly
  const result = await pool.query(
    "select id, username, password from users where username = $1 and password = $2",
    [username, password]
  );

  // logic for logging in process
  if (result.rows.length == 0) {
    return res
      .status(400)
      .clearCookie("authorization")
      .json({ message: "username or password is incorrect" });
  } else {
    jwt.sign(
      result.rows[0],
      process.env.SECRET_KEY,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) {
          return res.status(500).send({ message: "internal server error" });
        }
        res
          .status(200)
          .cookie("authorization", token, {
            sameSite: "None",
            httpOnly: false,
            secure: true,
            expires: new Date(Date.now() + 24 * 1000 * 60 * 60),
          })
          .send({ message: "login successfully", id: result.rows[0].id });
      }
    );
  }
});

export { loggingIn };
