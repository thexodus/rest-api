const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// Get all todos
router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (err) {
        res.json({ message: err });
    }
});

// Create todo
router.post('/', (req, res) => {
        const todo = new Todo({
        title: req.body.title,
        description: req.body.description
    });
    todo.save()
    .then(data => { res.json(data)})
    .catch(err => {
        res.json({message: err})
    })
});

// Get specific todo
router.get('/:todoId', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.todoId);
        res.json(todo);
    } catch(err) {
        res.json({ message: err });
    }
});

// Update specific todo
router.patch('/:todoId', async (req,res) => {
    try {
        const updatedTodo = await Todo.updateOne(
            {_id: req.params.todoId},
            { $set: { title: req.body.title }}
        );
        res.json(updatedTodo);
    } catch(err) {
        res.join({ message: err });
    }
});

// Delete specific todo
router.delete('/:todoId', (req, res) => {
    const removedTodo = Todo.remove({_id: req.params.todoId});
    removedTodo.then(data => res.json(data));
});
module.exports = router;