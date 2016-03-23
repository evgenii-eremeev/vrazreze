const passport = require('passport');
const User = require('../models/user');

const authCtrl = (function () {

    function checkSession (req, res) {
        var isLoggedIn = req.isAuthenticated();
        if (isLoggedIn) {
            return res.json({
                isLoggedIn: isLoggedIn,
                userObject: req.user
            });
        }
        return res.json({isLoggedIn: isLoggedIn});
    }

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

    function signup (req, res) {
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
    }


    const publicAPI = { userExists, signup, checkSession };
    return publicAPI;
})();

module.exports = authCtrl;
