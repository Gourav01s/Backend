const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// signup route handler
exports.signup = async (req, res) => {
    try {
        // get input data
        const { name, email, password, role } = req.body;
        // check if user already exist
        const exixtingUser = await User.findOne({ email });
        if (exixtingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exist",
            });
        }

        // secure password
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10);
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: "error in hashing pasword",
            });
        }

        // create entry of user in db 
        const user = await User.create({
            name, email, password: hashedPassword, role
        });

        return res.status(200).json({
            success: true,
            message: "User created successfully",
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message:"User cannot be created, please try again later",
        });
    }
}

// Login auth

exports.login = async (req,res) => {

    try {
        // data fetch 
        const { email, password } = req.body;
        // validation on email password
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message:"Please fill all the details",
            })
        }

        // if user registered
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message:"user is not registerd",
            })
        }

        const payload = {
            email: user.email,
            id: user._id,
            role: user.role,
        };
        // verify password and generate a JWT token
        if (await bcrypt.compare(password, user.password)) {
            // password matched then
            // token creation
            let token = await jwt.sign(payload, process.env.JWT_SECRET,
                {
                    expiresIn: "2h",
                }
            );

            // to add jwt token in usesr and delete password for protection 
            // can be any other way
            // user = user.toObject(); 
            user.token = token;
            user.password = undefined;

            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly:true,
            }

            // token from cookie  
            // server sends a cookie to client
            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: "user logged in successfully",
            });

            // token from other then cookie
            // res.status(200).json({
            //     success: true,
            //     token,
            //     user,
            //     message: "user logged in successfully",
            // });
            
        }
        else {
            // password not matched
            return res.status(403).json({
                success: false,
                message:"Passworrd incorrect",
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message:"Login Failure",
        })
    }
}