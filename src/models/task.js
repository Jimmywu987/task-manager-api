const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')


const taskSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'User'
    }
}, {
    timestamps: true
})





const Task = mongoose.model('Task', taskSchema)

module.exports = Task

