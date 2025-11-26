const express = require("express");
const app = express();

require('dotenv').config();
const PORT = process.env.PORT || 4000;

// aded middleware
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(express.json());

// database connection
const db = require("./config/database");
db.connect();

// import routs and mount 
const user = require("./routes/user");
app.use("/api/v1", user);

// activation
app.listen(PORT, () => {
    console.log(`App is listning at ${PORT}`);
})