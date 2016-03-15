const passport = require('passport');
const User = require('../models/user');

const registerCtrl = (function () {

    function post (req, res) {
        User.register(
            new User({ username: req.body.username }),
            req.body.password,
            function (err, action) {
                if (err) {
                    throw err;
                }

                passport.authenticate('local')(req, res, function () {
                    console.log(req.user.username + " is registered");
                    res.json(req.user);
                });
            }
        ); // end User.register
    } // end post

    const publicAPI = { post };
    return publicAPI;
})();

module.exports = registerCtrl;
