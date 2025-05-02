const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            minlength: 3,
        },
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 4,
        },
        followers:{
            type: Array,
            default: [],
        },
        followings:{
            type: Array,
            default: [],
        },
        profilePicture: {
            type: String,
            default: '',
        },
        bio: {
            type: String,
            default: '',
        },
    },
    {
        timestamps: true,
    },
)

module.exports = mongoose.model('User', UserSchema);