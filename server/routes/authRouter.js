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
                User.findByUsername(email, done);
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
                        return res.send("Вам выслано письмо на указанный адрес");
                    })
                    .catch(done);
            },

        ], function (err) {
            if (err) { throw err; }
        });

    }); // _forgot

    app.post("/reset/:token", function _reset (req, res) {

        async.waterfall([

            function _findByToken(done) {
                User.findOne({
                    resetPasswordToken: req.params.token,
                    resetPasswordExpires: { $gt: Date.now() }
                }, function (err, user) {
                    if (err) { done(err); };
                    if (!user) {
                        return res.status(404).send("Ваша ссылка на сброс пароля устарела");
                    }
                    done(err, user);
                });
            },
            // findByUsername is passport-local-mongoose method that enjects user.setPassword
            function _findByUsername(user, done) {
                User.findByUsername(user.username, done);
            },

            function _setNewPassword(user, done) {
                user.setPassword(req.body.password, done)
            },

            function _saveNewPassword(user, done) {
                user.save(function (err, user) {
                    if (err) { done(err); };
                    return res.send("Ваш пароль успешно изменен");
                });
            }

        ], function(err) {
            if (err) { throw err; }
        });
    })

}; // module.exports
