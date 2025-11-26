const express = require("express");
// const router = express.Router();
const router = express.Router();


const { login, signup } = require("../controller/Auth");
const { auth, isStudent, isAdmin } = require("../middlewares/auth");
const User = require("../models/User");

// define routes
router.post("/login", login);
router.post("/signup", signup);

// protected route for testing
router.get("/test", auth, (req, res) => {
    res.json({
        success: true,
        message: 'welcome to protected route for tests',
    });
});

// for protected routes
router.get("/student", auth, isStudent, (req, res) => {
    res.json({
        success: true,
        message: 'welcome to protected route for students',
    });
});

router.get("/admin", auth, isAdmin, (req, res) => {
    res.json({
        success: true,
        message: 'welcome to protected route for admin',
    });
});

// route for protected email way
router.get("/getEmail", auth, async (req, res) => {
    try {
        const id = req.user.id;
        console.log("ID:",id);
        const user = await User.findById(id);

        res.status(200).json({
            success: true,
            user: user,
            message: "welcome to email route",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error:error.message,
            message: "error in email route",
        });
    }
})

module.exports = router;