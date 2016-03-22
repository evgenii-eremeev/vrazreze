const passport = require('passport');
const User = require('../models/user');

const signUpCtrl = (function () {

    function userExists (req, res, next) {
        User
            .findOne({ username: req.body.username })
            .exec(function (err, user) {
                if (err) { throw err; }
                if (user) {
                    res.status(409);
                    res.send('Conflict. User already exists.');
                } else {
                    next();
                }
            });
    }

    function register (req, res) {
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
    } // end post

    const publicAPI = { userExists, register };
    return publicAPI;
})();

module.exports = signUpCtrl;
