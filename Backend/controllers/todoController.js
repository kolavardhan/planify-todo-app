const Todo = require('../models/Todo')

const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find()

        res.status(200).json(todos) // The request was successful, and the server processed it correctly.
    } catch (error) {
        res.status(500).json({ // Something went wrong on the server while processing the request
            message: error.message
        })
    }
}

const createTodo = async (req, res) => {
    try {

        if (!req.body.task || req.body.task.trim() === "") {
            return res.status(400).json({ // The server understood your request, but the data you sent is invalid or malformed
                message: "Task is required"
            })
        }

        const newTodo = await Todo.create({
            task: req.body.task
        })

        res.status(201).json(newTodo) // The server successfully created a new resource

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const getTodoById = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id)

        if (!todo) {
            return res.status(404).json({ //The requested resource does not exist
                message: 'Todo not found'
            })
        }

        res.status(200).json(todo)

    } catch (error) {

        if (error.name === 'CastError') {
            return res.status(400).json({ 
                message: 'Invalid Todo Id'
            })
        }

        res.status(500).json({
            message: error.message
        })
    }
}

const updateTodo = async (req, res) => {
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        )

        if (!updatedTodo) {
            return res.status(404).json({
                message: 'Todo not found'
            })
        }

        res.status(200).json(updatedTodo)
    } catch (error) {

        if (error.name === "CastError") {
            return res.status(400).json({
                message: "Invalid Todo Id"
            })
        }

        res.status(500).json({
            message: error.message
        })
    }
}

const deleteTodo = async (req, res) => {
    try {
        const deletedTodo = await Todo.findByIdAndDelete(req.params.id)

        if (!deletedTodo) {
            return res.status(404).json({
                message: "Todo not found"
            })
        }

        res.status(200).json({
            message: "Deleted",
            todo: deletedTodo
        })

    } catch (error) {

        if (error.name === "CastError") {
            return res.status(400).json({
                message: 'Invalid Todo Id'
            })
        }

        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = {getTodos, createTodo, getTodoById, updateTodo, deleteTodo}
