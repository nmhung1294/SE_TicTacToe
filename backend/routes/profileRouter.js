import express from "express";
import { getProfile } from "../controllers/profileController.js";

const router = express.Router();


router.route("/:id").get((req, res) => {
  const { id } = req.params;

  pool.query(
    "SELECT * FROM users WHERE id = $1;",
    [id],
    (err, result) => {
      if (err) {
        res.status(500).json({ message: "Error occurred", error: err });
      } else if (result.rows.length === 0) {
        res.status(400).json({ message: "User not found" });
      } else {
        const user = result.rows[0];
        res.status(200).json({ message: "User information found", data: user });
      }
    }
  );
}).put((req, res) => {
  const { id } = req.params;
  const { email, username, password } = req.body;


  pool.query(
    "UPDATE users SET email = $1, username = $2, password = $3 WHERE id = $4 RETURNING *;",
    [email, username, password, id],
    (err, result) => {
      if (err) {
        res.status(500).json({ message: "Error occurred", error: err });
      } else if (result.rows.length === 0) {
        res.status(404).json({ message: "User not found" });
      } else {
        res.status(200).json({ message: "Update profile successfully" });
      }
    }
  );
});
export default router;

