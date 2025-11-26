// import models
const Comment = require("../models/commentModel");
const Post = require("../models/postModel");

// comment logic
exports.createComment = async (req, res) => {
    try {
        // fetch data from request body
        const { post, body, user } = req.body;

        // create new object for comment
        const comment = new Comment({
            post, body, user
        });

        // save new comment into database
        const saveComment = await comment.save();

        // find the Post by ID and add the new Comment to its comments array
        const updatedPost = await Post.findByIdAndUpdate(
            post,
            { $push: { comments: saveComment._id } },
            { new: true }, // here new true means give out updated  post only after finish update
        )
            .populate("comments")
            .exec();
        
        res.status(200).json({
            status: true,
            post:updatedPost,
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message:err.message,
        })
    }
}