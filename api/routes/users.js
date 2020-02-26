const express = require('express');
const router = express.Router();
const mongoose = require('../db/mongoose');
const User = require('../db/models/User.model');

//user post
//user sign up
router.post('/signup', (req, res) => {
    let newUser = new User({
        email : req.body.email,
        password : req.body.email
    });
    newUser.save().then(() => {
        return newUser.createSession();
    })
    .then((refreshToken) => {
        return newUser.generateAccessAuthToken()
        .then((accessToken) => {
            return { accessToken, refreshToken };
        })
        .then((authTokens) => {
            res
            .header('x-refresh-token', authTokens.refreshToken)
            .header('x-access-token', authTokens.accessToken)
            .send(newUser);
        })
        .catch((e) => {
            res.status(400).send(e);
        })
    })
})

//user login
router.get('/login', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    User.findByCredentials(email, password)
    .then((user) => {
        return user.createSession()
        .then((refreshToken) => {
            return user.generateAccessAuthToken()
            .then((accessToken) => {
                return { accessToken, refreshToken };
            })
        })
        .then((authTokens) => {
            res
            .header('x-refresh-token', authTokens.refreshToken)
            .header('x-access-token', authTokens.accessToken)
            .send(user);
        })
    })
    .catch((e) => {
        res.status(400).send(e);
    })
})

module.exports = router;