const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        caption: {
            type: String,
            max: 500,
            required: true,
        },
        img: {
            type: String,
            default: '',
        },
        likes: {
            type: [String],
            default: []
        },
        tags: {
            type: [String],
            default: [],
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("Post", PostSchema);