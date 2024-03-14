import express from "express";
import pool from "../config/db.js";

const router = express.Router();
router.use(express.json());

router
  .route("/")
  .post(async (req, res) => {
      const { email, username, password } = req.body;
      const result = await pool.query("select * from users where email = $1 or username = $2", [email, username]);
      if (result.rows.length > 0) {
          return res.status(400).json({ message: "email or username already exists" });
      }


      pool.query("insert into users (email, username, password) values ($1, $2, $3);", [email, username, password], (err, result) => {
          if (err) {
              res.status(400).json({ message: err.message });
          } else {
              res.status(201).json({ message: "signup successfully" });
          }
      });
  });


export default router;
