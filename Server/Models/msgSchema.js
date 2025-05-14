const mongoose = require('mongoose');

// -------------------- Message Schema --------------------
const messageSchema = new mongoose.Schema({
    sender: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    content: { 
        type: String, 
        trim: true, 
        required: true 
    },
    chat: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Chat', 
        required: true 
    }
}, { timestamps: true });

// -------------------- Chat Schema --------------------
const chatSchema = new mongoose.Schema({
    users: [
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User' 
        }
    ],
    latestMessage: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Message' 
    }
}, { timestamps: true });

// -------------------- Models & Exports --------------------
const Message = mongoose.model('Message', messageSchema);
const Chat = mongoose.model('Chat', chatSchema);

module.exports = { Message, Chat };