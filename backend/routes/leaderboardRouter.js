import express from "express";
import pool from "../config/db.js";

const router = express.Router();

router.route("/").get((req, res) => {
  pool.query(
    "SELECT * FROM users ORDER BY elo DESC;",
    [],
    (err, result) => {
      if (err) {
        res.status(500).json({ message: "Error occurred", error: err });
      } else {
        res.status(200).json({ message: "data retrieved successfully", data: result.rows });
      }
    }
  );
});

export default router;
