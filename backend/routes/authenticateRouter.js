import express from "express";
import jwt from "jsonwebtoken"

const router = express.Router();
router.use(express.json());

router.route("/").get((req, res) => {
    jwt.verify(req.cookies.authorization, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            res.redirect("/login");
        } else {
            next();
        }
    });
 });

export default router;
