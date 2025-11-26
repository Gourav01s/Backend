
//  First server 
// server instantiate
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;

// use body pareser to parse json data and add to request.body object
app.use(bodyParser.json());

// activate server on port 3000
app.listen(port, () => {
    console.log("server started at port ", port);
})

// server Route - response 
app.get('/', (req, res) => {
    res.send("Hlo, server is started");
})

// other route created
app.post('/api/car', (req, res) => {
    const { name, brand } = req.body;
    console.log(name);
    console.log(brand);
    console.log("Car submitted successfully");
})


// mongodb connection created

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/myDatabase', {
    // useNewUrlParser: true,
    // useUnifiedTopology:true,
})
.then(()=>{console.log("connection to db successful")})
.catch(()=>{console.log("Error in db connection")})