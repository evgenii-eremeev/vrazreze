"use strict";

const passport = require('passport');
const User = require('../models/user');
const userExists = require('../middleware/authMiddleware').userExists;

module.exports = function _moduleExports (app) {

    // check_session
    app.post('/check_session', function _checkSession (req, res) {
        var isLoggedIn = req.isAuthenticated();
        if (isLoggedIn) {
            return res.json({
                isLoggedIn: isLoggedIn,
                userObject: req.user
            });
        }
        return res.json({ isLoggedIn: isLoggedIn });
    });

    // signup
    app.post('/signup', userExists, function _signup (req, res) {
        User.register(
            new User({ username: req.body.username }),
            req.body.password,
            function (err, action) {
                if (err) { throw err; }
                passport.authenticate('local')(req, res, function () {
                    res.json(req.user);
                });
            }
        ); // end User.register
    });

    // login
    app.post(
        '/login',
        passport.authenticate('local'),
        function _login (req, res) {
            res.json(req.user);
    });

    // logout
    app.post('/logout', function _logout (req, res) {
        req.logout();
        res.send("Logout successfully!")
    });

}; // module.exports