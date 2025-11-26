const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            require: true,
            maxLength: 50,
        },
        body: {
            type: String,
            require: true,
            maxLength: 50,
        },
        likes: [{
            type: mongoose.Schema.Types.ObjectId,
            ref:"Like",
            require: false,
        }],
        comments: [{
            type: mongoose.Schema.Types.ObjectId,
            ref:"Comment",
            require: true,
            maxLength: 80,
        }],
        createdAt: {
            type: Date,
            require: true,
            default: Date.now(),
        },
        updatedAt: {
            type: Date,
            require: true,
            default: Date.now(),
        }

    }
);

module.exports = mongoose.model("Post", postSchema);
