const express = require("express");
const router = express.Router();

// import controller
const { createPost, getAllPosts} = require("../controllers/postController");
const { dummyController } = require("../controllers/dumiController");
const { createComment } = require("../controllers/commentController");
const { likePost, unlikePost } = require("../controllers/likeController");

// define api route
router.post("/posts/create", createPost);
router.get("/dummy", dummyController);
router.get("/posts", getAllPosts);
router.post("/comments/create", createComment);
router.post("/likes/like", likePost);
router.post("/likes/unlike", unlikePost);


module.exports = router;