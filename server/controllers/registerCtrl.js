var passport = require('passport');
var User = require('../models/user');

var registerCtrl = {
    post(req, res) {
        User.register(
            new User({ username: req.body.username }),
            req.body.password,
            function (err, action) {
                if (err) {
                    throw err;
                }

                passport.authenticate('local')(req, res, function () {
                    console.log(req.user.username + " is registered");
                    res.redirect('/');
                });
            }
        ); // end User.register
    } // end post
};

module.exports = registerCtrl;
