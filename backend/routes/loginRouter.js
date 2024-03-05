import express from "express";
import pool from "../config/db.js";

const router = express.Router();
router.use(express.json());

router
  .route("/")
  .post((req, res) => {
    const { email, password } = req.body;
    pool.query(
      "select * from users where email = $1 and password = $2;",
      [email, password],
      (err, result) => {
        if (err) {
          res.status(400).json({ message: err.message });
        } else {
          res.status(201).json({ message: "Login successfully" });
        }
      }
    );
  });


export default router;
