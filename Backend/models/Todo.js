const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true 
    }, 
    checked: {
        type: Boolean,
        default: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, // An ObjectId is the special ID that MongoDB automatically gives every document.
        ref: 'User', // This ObjectId belongs to the User model.
        required: true
    }
})

module.exports = mongoose.model('Todo', todoSchema)