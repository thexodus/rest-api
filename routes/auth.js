const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const User = require('../models/User');
const { registerValidation, loginValidation } = require("../validation");

router.post('/register', async (req, res) => {
    // Data validation
    const { error } = registerValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message);
    
    // Unique validation
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send('Email already exist!');
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });

    try {
        const savedUser = await user.save();
        res.send({ user: { _id: savedUser._id }});
    }catch(err){
        res.json({ message: err });
    }
});

router.post('/login', async (req,res) => {
    // Data validation
    const { error } = loginValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message);
    
    // Unique validation
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Email not found!');

    // Password validation
    const verifyPassword = await bcrypt.compare(req.body.password, user.password);
    if (!verifyPassword) return res.status(400).send('Password is invalid!');
    
    // TOKEN
    const token = jwt.sign({_id: user._id }, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);
    
    
});

module.exports = router;