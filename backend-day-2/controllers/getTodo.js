// import model
const Todo = require("../models/Todo");

exports.getTodo = async (req, res) => {
    try {
        // fetch all the data-todos from database
        const todo = await Todo.find({});

        // response
        res.status(200).json({
            success: true,
            data: todo,
            message:"Entire todo data is fetched",
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error:error.message,
            message:"Server error",
        })
    }
}


exports.getTodoById = async (req, res) => {
    try {
        const id = req.params.id;
        const todo = await Todo.findById({ _id: id });

        res.status(200).json({
            success: true,
            data: todo,
            message:"todo by id",
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            error:err.message,
            message:"Server error",
        })
    }
}