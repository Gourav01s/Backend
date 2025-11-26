// import hte Todo
// const { response } = require("express");
const Todo = require("../models/Todo");

// defining the route handler

exports.createTodo = async (req, res) => {
    try {
        // extract title and discription from request body
        const { title, description } = req.body;

        // create new todo Obj and insert in Database
        const response = await Todo.create({title,description});
        // send a json response with success flag
        res.status(200).json(
            {
                success: true,
                data: response,
                message: "Entry created successfully "
            }    
        );
    }
    catch (error) {
        console.log(error);
        console.error(error);
        res.status(500)
        .json({
            success: false,
            data: "internal server error",
            message: error.message,
        })
    }
}