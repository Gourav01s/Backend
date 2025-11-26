// app create
const express = require("express");
const app = express();

// find port
require("dotenv").config();
const PORT = process.env.PORT || 4000;

// add middleware
app.use(express.json());
const fileupload = require("express-fileupload");
app.use(fileupload({
    useTempFiles: true,
   tempFileDir : '/temp/' 
}));

// connect to db
const db = require("./config/database");
db.connect();

// connect to cloud
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

// api route mount
const upload = require("./routes/FileUpload");
app.use("/api/v1/upload", upload);

// activate server listen
app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
});