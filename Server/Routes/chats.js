const router = require('express').Router();
const { Chat, Message } = require('../Models/msgSchema');
const User = require('../Models/userSchema');

// ✅ Create or Get 1-1 Chat
router.post("/", async (req, res) => {
    const userId = req.body.userId;

    if (!userId) {
        return res.status(400).json({ err: true, msg: 'userId param missing' });
    }

    try {
        let chat = await Chat.findOne({
            users: { $all: [req.body.myUserId, userId] }
        })
        .populate('users', '-password')
        .populate('latestMessage');

        if (chat) {
            chat = await User.populate(chat, {
                path: 'latestMessage.sender',
                select: 'name username profilePicture'
            });
            return res.status(200).json({ err: false, msg: chat });
        }

        const newChat = await Chat.create({ users: [req.body.myUserId, userId] });
        const fullChat = await Chat.findById(newChat._id).populate('users', '-password');

        res.status(200).json({ err: false, msg: fullChat });

    } catch (err) {
        res.status(500).json({ err: true, msg: 'Server Error' });
    }
});

// ✅ Get All Chats of Current User
router.get("/all", async (req, res) => {
    const myUserId = req.query.myUserId;

    if (!myUserId) {
        return res.status(400).json({ err: true, msg: 'myUserId param missing' });
    }

    try {
        let chats = await Chat.find({ users: myUserId })
            .populate('users', '-password')
            .populate('latestMessage')
            .sort({ updatedAt: -1 });

        chats = await User.populate(chats, {
            path: 'latestMessage.sender',
            select: 'name username profilePicture'
        });

        res.status(200).json({ err: false, msg: chats });

    } catch (err) {
        res.status(500).json({ err: true, msg: 'Server Error' });
    }
});

// ✅ Send Message in a Chat
router.post("/message", async (req, res) => {
    const { content, chatId, myUserId } = req.body;

    if (!content || !chatId || !myUserId) {
        return res.status(400).json({ err: true, msg: 'Missing params' });
    }

    try {
        let newMessage = await Message.create({
            sender: myUserId,
            content: content,
            chat: chatId,
        });

        newMessage = await newMessage.populate('sender', 'name username profilePicture');
        newMessage = await newMessage.populate('chat');
        newMessage = await User.populate(newMessage, {
            path: 'chat.users',
            select: 'name username profilePicture'
        });

        // Update latestMessage in chat
        await Chat.findByIdAndUpdate(chatId, { latestMessage: newMessage });

        res.status(200).json({ err: false, msg: newMessage });

    } catch (err) {
        res.status(500).json({ err: true, msg: 'Server Error' });
    }
});

// ✅ Get All Messages of a Chat
router.get("/message", async (req, res) => {
    const chatId = req.query.chatId;

    if (!chatId) {
        return res.status(400).json({ err: true, msg: 'chatId param missing' });
    }

    try {
        const messages = await Message.find({ chat: chatId })
            .populate('sender', 'name username profilePicture')
            .populate('chat');

        res.status(200).json({ err: false, msg: messages });

    } catch (err) {
        res.status(500).json({ err: true, msg: 'Server Error' });
    }
});

module.exports = router;