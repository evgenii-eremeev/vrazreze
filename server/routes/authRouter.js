"use strict";

const express = require('express');
const passport = require('passport');
const User = require('../models/user');
const userExists = require('../middleware/authMiddleware').userExists;

const router = express.Router();

// check_session
router.post('/check_session', function _checkSession (req, res) {
    var isLoggedIn = req.isAuthenticated();
    if (isLoggedIn) {
        return res.json({
            isLoggedIn: isLoggedIn,
            userObject: req.user
        });
    }
    return res.json({isLoggedIn: isLoggedIn});
});

// signup
router.post('/signup', userExists, function signup (req, res) {
    User.register(
        new User({ username: req.body.username }),
        req.body.password,
        function (err, action) {
            if (err) { throw err; }
            passport.authenticate('local')(req, res, function () {
                console.log(req.user.username + " is registered");
                res.json(req.user);
            });
        }
    ); // end User.register
});

// login
router.post('/login',
            passport.authenticate('local'),
            function(req, res) {
    console.log(req.user.username + " is logged in");
    res.json(req.user);
});

// logout
router.post('/logout', function(req, res) {
    req.logout();
    res.send("Logout successfully!")
});

module.exports = router;