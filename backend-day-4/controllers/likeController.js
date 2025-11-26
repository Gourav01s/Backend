// import models
const Post = require("../models/postModel");
const Like = require("../models/likeModel");

exports.likePost = async (req, res) => {
    try {
        // fetch data from req body
        const { post, user } = req.body;
        const like = new Like({
            post, user,
        });
        const savedLike = await like.save();

        // update the post and 
        const updatedPost = await Post.findByIdAndUpdate(
            post,
            { $push: { likes: savedLike._id } },
            { new: true },
        ).populate("likes").exec();

        res.json({
            post:updatedPost,
        })
    } catch (err) {
            console.error(err);
            res.status(500).json({
            data: "error in like post",
            message: err.message,
        });
    }
}

exports.unlikePost = async (req, res) => {
    try {
        const { post, like } = req.body;
        // find and delete where like and post id match
        const deletedLike = await Like.findOneAndDelete({ post: post, _id:like });

        // update post collection
        const updatedPost = await Post.findByIdAndUpdate(
            post,
            { $pull: { likes: deletedLike._id } },
            { new: true }
        );
        res.json({
            post:updatedPost,
        })
    } catch (err) {
            console.error(err);
            res.status(500).json({
            data: "error in unliking post",
            message: err.message,
        });
    }
}
