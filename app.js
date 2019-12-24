const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config');
const app = express();
const todosRoutes = require('./routes/todos');
const authRoutes = require('./routes/auth');

// Middlewares
app.use(express.json());
app.use('/api/todos', todosRoutes);
app.use('/api/user', authRoutes);

app.listen(3000);

// ROUTES
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// DB Connection
mongoose.connect(process.env.DB_CONNECTION,
    { useNewUrlParser: true },
    () =>  console.log('connected to db')
);