const mongoose = require("mongoose");

require("dotenv").config();

exports.connect = () => {
    mongoose.connect(process.env.MONGODB_URL, {})
        .then(() => { console.log("databse connection sucessfully") })
        .catch((err) => {
            console.log("database connection issue");
            console.error(err);
            process.exit(1);
    });
}