
// connect mongoose to this
const mongoose = require('mongoose');

//  env require
require('dotenv').config();


const dbConnect = () => {
    mongoose.connect(process.env.DATABASE_URL, {
      
  })
  .then(()=> console.log("databse connection successful"))
  .catch((error) => {
    console.log("error to db connection");
    console.log(error);
    // why use this
    process.exit(1);
    })
}

module.exports = dbConnect;
