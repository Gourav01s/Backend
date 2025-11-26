// server instantiate
const express = require('express');
const app = express();

// config fron .env file
require('dotenv').config();
const port = process.env.PORT || 4000 ;  

// middleware to parse json data with express-parser
app.use(express.json());


//  import routes for Todo app
const todoRoutes = require("./routes/todo");
// mount the todo api routes
app.use("/api/v1", todoRoutes);


// active at the port 
app.listen(port, () => {
    console.log("server started at port ", port);
})


// connect database
const dbconnect = require("./config/database");
dbconnect();

// default route
app.get("/", (req, res) => {
    res.send(`<h1>this is home page </h1>`);
})



// Other steps 
// 1. connect compass
// 2. go to postman and list for
// 3. POST at 
// 4. select data -> row -> json and
// 5. fill the data as follow 
//     {
//     "title":"day4Testagain",
//     "description":" before creation of data entry check imports "
// }
// 6. send post request

// 7. got resonse as
// {
//     "success": true,
//     "data": {
//         "title": "day4Testagain",
//         "description": " before creation of data entry check imports ",
//         "createdAt": "2025-07-28T10:02:08.854Z",
//         "updatedAt": "2025-07-28T10:02:08.854Z",
//         "_id": "68874bb95f7da37277ca2657",
//         "__v": 0
//     },
//     "message": "Entry created successfully "
//     }
// 8. see data entry in compass database