const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        // reference to post model
    },
    user: {
        type: String,
        require: true,
    },
    body: {
        type: String,
        require: true,
        maxLength:100,
    }
});

module.exports = mongoose.model("Comment", commentSchema);