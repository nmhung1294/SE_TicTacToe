import express from "express";
import pool from "../config/db.js";

const router = express.Router();
router.use(express.json());


router.route("/signup").post((req, res) => {
  const { email, username, password } = req.body;
  
  pool.query(
    "SELECT * FROM users WHERE email = $1 OR username = $2;",
    [email, username],
    (err, result) => {
      if (err) {
        res.status(500).json({ message: "Error occurred", error: err });
      } else if (result.rows.length > 0) {
        res.status(400).json({ message: "Email or username already exists" });
      } else {
        pool.query(
          "INSERT INTO users (email, username, password) VALUES ($1, $2, $3) RETURNING *;",
          [email, username, password],
          (err, result) => {
            if (err) {
              res.status(500).json({ message: "Registration failed", error: err });
            } else {
              res.status(201).json({ message: "Signup successful", data: result.rows });
            }

          }
        );
      }
    }
  );
});

export default router;
