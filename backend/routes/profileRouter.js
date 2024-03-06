import express from "express";
import pool from "../config/db.js";

const router = express.Router();
router.use(express.json());

router
  .route("/:id")
  .get((req, res) => {
    const id = req.params.id;
    pool.query("select * from users where id = $1;", [id], (err, result) => {
      if (err) {
        res.status(400).json({ message: err.message });
      } else {
        res.status(200).json({ data: result.rows });
      }
    });
  })


export default router;
