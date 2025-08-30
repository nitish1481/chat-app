import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {sendRequest,acceptRequest,declineRequest,getRequests,getFriends} from "../controllers/friend.controller.js";

const router = express.Router();

router.get("/requests", protectRoute, getRequests);
router.get("/", protectRoute, getFriends);
router.post("/sendrequest/:username", protectRoute, sendRequest);
router.post("/acceptrequest/:username", protectRoute, acceptRequest);
router.post("/declinerequest/:username", protectRoute, declineRequest);

export default router;