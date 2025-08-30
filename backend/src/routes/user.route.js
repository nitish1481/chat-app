import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getUserProfile } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/:username", protectRoute, getUserProfile);

export default router;