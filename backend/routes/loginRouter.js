import express from "express";
import pool from "../config/db.js";

const router = express.Router();
router.use(express.json());

router.route("/").post((req, res) => {
  const { username, password } = req.body;
  pool.query(
    "select * from users where username = $1 and password = $2;",
    [username, password],
    (err, result) => {
      if (err) {
        res.status(400).json({ message: "invalid username or password" });
      } else {
        res
          .status(201)
          .json({ message: "login successfully", data: result.rows });
      }
    }
  );
});

export default router;
