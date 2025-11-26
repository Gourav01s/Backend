// import model
const Post = require("../models/postModel");

// define handler
exports.createPost = async (req, res) => {
    try {
        // exttrect title ,body and other form request body
        const { title, body, likes, comments } = req.body;
        const post = new Post({
            title, body, likes, comments
        });

        const savedPost = await post.save();

        // create new post obj 
        // const response = await Post.create({ title, body, likes, comments });

        // send json res as seccess flag
        res.status(200).json({
            success: true,
            post:savedPost,
            message: "Post created successfully",
        });

    } catch (err) {
        console.log("error occur in post creating");
        console.error(err);
        res.status(500).json({
            success: false,
            data: "iternal server error",
            message: err.message,
        });
    }
}


exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate("likes").populate("comments").exec();
        // without populate it will only show the ids of comments and likes obj
        res.json({
            posts,
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            data: "error in fetch post",
            message: err.message,
        });
    }
}