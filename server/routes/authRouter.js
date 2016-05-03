"use strict";

const passport = require('passport');
const async = require('async');
const User = require('../models/user');
const userExists = require('../middleware/authMiddleware').userExists;
const randomBase64 = require('../utils/randomBase64');
const sendResetPasswordEmail = require('../email/sendResetPasswordEmail');

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
            new User({
                username: req.body.username,
                displayName: req.body.displayName
            }),
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

    // forgot
    app.post('/forgot', function _forgot (req, res) {
        const email = req.body.email;
        const token = randomBase64(5);

        async.waterfall([

            function _findUser(done) {
                User
                    .findByUsername(email)
                    .exec(done);
            },

            function _modifyUser(user, done) {
                if (user) {
                    user.resetPasswordToken = token;
                    // + one hour
                    user.resetPasswordExpires = Date.now() + 3600000;
                    user.save(done);
                } else {
                    return res.status(404).send("Пользователь с таким email не существует");
                }
            },

            function _sendResetPasswordEmail(user, done) {
                sendResetPasswordEmail(email, token)
                    .then(info => {
                        res.send("Запрос на сброс пароля отправлен");
                        done(null, info);
                    })
                    .catch(done);
            },

        ], function(err, info) {
            if (err) { throw err; }
            console.log(info);
        })

    }); // _forgot

    app.get("/reset/:token", function _reset (req, res) {
        const token = req.params.token;
        console.log(token);
    })

}; // module.exports
