// Auth , isStudent , isAdmin

const jwt = require("jsonwebtoken");
require("dotenv").config();

// AuthN
exports.auth = (req, res, next) => {
    try {
        // extract token
        // other was to fetch token || req.cookies.token
        console.log("cookie", req.cookies.token);
        console.log("body", req.body.token);
        // console.log("header", req.header("Authorization").replace("Bearer ", ""));
        // token from header is more secure and from body is least secure
        // header: key is Autherization and from value "Bearer " is replaced to empty string("") , we left with token
        const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ","") ;

        // when token is not there
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Token not found',
            });
        }

        // verify the token 
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
        } catch (error) {
            console.log(error);
            return res.status(401).json({
                success: false,
                message: 'Token is invalid',
            });
        }

        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Somethhing is wrong, while verifying the token',
        });
    }
}

// AuthZ

exports.isStudent = (req,res,next) => {
    try {
        // check if role is student
        if (req.user.role !== "Student") {
            return res.status(401).json({
                success: false,
                message: 'this is protected route for students',
            });
        }
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'user role is not a match',
        });
    }
} 

exports.isAdmin = (req, res, next) => {
    try {
        // if user role id admin
        if (req.user.role !== "Admin") {
            return res.status(401).json({
                success: false,
                message: "this is protected route for Admin",
            });
        }
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "user role is no match",
        })
    }
}