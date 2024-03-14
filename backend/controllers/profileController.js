import { wrapper } from "../middleware/wrapper.js";
import pool from "../config/db.js";

const getProfile = wrapper(async (req, res) => {
  const { id } = req.params;
  const result = await pool.query("select * from users where id = $1", [id]);
  if (result.rows.length == 0) {
    return res.status(400).json({ message: "user not found" });
  } else {
    res.status(200).json({ message: "user information found", data: result.rows[0] });
  }
});


export { getProfile };