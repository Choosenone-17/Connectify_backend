import express from "express";
import {
  sendMessage,
  getMessages,
  getConversations,
} from "../controllers/messageController.js";

const router = express.Router();

router.post("/", sendMessage);
router.get("/conversation/:user1/:user2", getMessages);
router.get("/conversations/:userId", getConversations);

export default router;