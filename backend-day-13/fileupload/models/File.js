const mongoose = require("mongoose");
const nodemailer = require('nodemailer');
require("dotenv").config();


const fileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
    },
    tags: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
});

// post middleware
fileSchema.post("save", async function (doc) {
    try {
        console.log("doc:", doc);

        // before connection setup env variables
        // and look for smtp setup here
        // https://medium.com/rails-to-rescue/how-to-set-up-smtp-credentials-with-gmail-for-your-app-send-email-cf236d11087d
        
        // transporter
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: proccess.env.MAIL_PASS,
            },
        });

        //  send mail
        let info = await transporter.sendMail({
            from: `Project - fileUpload with mail`,
            to: doc.email,
            subject: "New file uploaded on Cloudinary",
            html:`<h2>Helo</h2> <p>file uploaded to cloudinary View here: <a href="${doc.imageUrl}">doc url</a> </p>`,
        });

        console.log("INFO", info);

    } catch (error) {
        console.error(error);
    }
})

// export the model
module.exports = mongoose.model("File", fileSchema);
// other way to export is 
// const File = mongoose.model("File", fileSchema);
// module.exports = File;