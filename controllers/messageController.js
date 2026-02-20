import Message from "../models/Message.js";
import User from "../models/user.js";

/* ===============================
   SEND MESSAGE
================================= */
export const sendMessage = async (req, res) => {
  try {
    const { senderId, receiverId, text } = req.body;

    const message = await Message.create({
      sender: senderId,
      receiver: receiverId,
      text,
    });

    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ===============================
   GET MESSAGES BETWEEN 2 USERS
================================= */
export const getMessages = async (req, res) => {
  try {
    const { user1, user2 } = req.params;

    const messages = await Message.find({
      $or: [
        { sender: user1, receiver: user2 },
        { sender: user2, receiver: user1 },
      ],
    })
      .sort({ createdAt: 1 })
      .populate("sender", "name role")
      .populate("receiver", "name role");

    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ===============================
   GET ALL CONVERSATIONS FOR USER
================================= */
export const getConversations = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find all messages where user is sender or receiver
    const messages = await Message.find({
      $or: [{ sender: userId }, { receiver: userId }],
    }).populate("sender receiver", "name role");

    // Get unique conversation partners
    const conversationMap = {};

    messages.forEach((msg) => {
      const otherUser =
        msg.sender.id.toString() === userId
          ? msg.receiver
          : msg.sender;

      conversationMap[otherUser.id] = otherUser;
    });

    const conversations = Object.values(conversationMap);

    res.json(conversations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};