const mongoose = require('mongoose');

const TodoSchema = mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now(),
    },
    completed: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Todo', TodoSchema);