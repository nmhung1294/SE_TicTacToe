import express from "express";
import { loggingIn } from "../controllers/loginController.js";

const router = express.Router();
router.use(express.json());

router.route("/").post(loggingIn);

export default router;
