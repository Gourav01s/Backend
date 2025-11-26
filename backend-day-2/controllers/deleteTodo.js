//  import model
const Todo = require("../models/Todo");

// controller function
exports.deleteTodo = async (req, res) => {
    try {
        const id = req.params.id;
        await Todo.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message:"todo deleted",
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