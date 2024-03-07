import express from "express";
import { getProfile } from "../controllers/profileController.js";

const router = express.Router();
router.use(express.json());

router
  .route("/:id")
  .get(getProfile)


export default router;
