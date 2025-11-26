// instantiate mongoose
const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = () => {
    mongoose.connect(process.env.DATABASE_URL, {})
    .then((result) => {
        console.log("Database connected successfully");
        console.log(result);
        
    }).catch((err) => {
        console.log("Database not connected error");
        console.error(err);
        process.exit(1);
    });
    
}

module.exports = dbConnect;