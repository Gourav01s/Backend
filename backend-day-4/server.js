// server instentiate
const express = require("express");
const app = express();

// import env to use variables
require("dotenv").config();
const PORT = process.env.PORT || 4000;

// middleware to parse data to json
app.use(express.json());

// Import routes for blogapp api
const postRouter = require("./routes/blogRoute");

// mount the blog route api
app.use("/api/v1", postRouter);

// start server 
app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
})

// connect to database
const connectdb = require("./config/database");
connectdb();

// create default route
app.get("/", (req,res) => {
    res.send(`<h1>Blog app started list to port ${PORT}</h1>`);
})