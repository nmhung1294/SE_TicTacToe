import express from "express";
import sessionStorage from "node-sessionstorage";
import { createHash } from "../utils/hash.js";

const router = express.Router();

router.route("/").post((req, res) => {
  let token = req.body.token;
  let userString = sessionStorage.getItem(token);
  if (!userString) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
  let user = JSON.parse(userString);
  let checkToken = createHash(user.username, user.password);
  if (checkToken == token) {
    res.status(200).json({
      message: "Authorized",
    });
  } else {
    sessionStorage.removeItem(token);
    res.status(401).json({
      message: "Unauthorized",
    });
  }
});

export default router;
