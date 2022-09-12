const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const URL_Router = require('express').Router();
const jwt = require('jsonwebtoken'); 

URL_Router.post('/signup', async (req, res) => {
    const { email, name, password, confirmPassword } = req.body;

    if (password != confirmPassword) {
        res.status(400).send('Passwords don\'t match');
    }

    try {
        // Generate password hash
        const hash = await bcrypt.hashSync(password, saltRounds = 10);

        const newUser = new userModel({
            name,
            email,
            password: hash,
        })
        const savedUser = await newUser.save();
        res.status(201).send('User created with id: ' + savedUser.id);
    } catch (e) {
        res.status(501).send(e.message);
    }
})

URL_Router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await userModel.findOne({ email: email });
        if (existingUser === null) {
            return res.status(501).send('Email not registered');
        } 
        bcrypt.compare(password, existingUser.password, function (err, result) {
            if (result) {
                const payload = {
                    id: existingUser.id,
                    email: existingUser.email,
                }
                const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
                return res.status(201).send({ accessToken, userId: existingUser.id });
            } else {
                res.status(400).send('Incorrect Password!');
            }
        });
    } catch (e) {
        res.status(400).send(e.message);
    }
})

module.exports = URL_Router;