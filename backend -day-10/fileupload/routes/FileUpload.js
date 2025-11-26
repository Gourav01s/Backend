const express = require("express");
const router = express.Router();

// import controllers
const { imageUpload, videoUpload, imageReducerUpload, localFileUpload} = require("../controllers/fileUpload");


// api route
router.post("/localFileUpload",localFileUpload);
router.post("/imageUpload", imageUpload);
router.post("/videoUpload", videoUpload);
router.post("/imageReducerUpload", imageReducerUpload);

// export module
module.exports = router;