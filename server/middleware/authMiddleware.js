const User = require('../models/user');

// route middleware to make sure a user is logged in
exports.isLoggedIn = function _isLoggedIn (req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()) {
        return next();
    } else {
        return res.status(403).end("Login required");
    }
};

// don't allow make critical requiest avarage users
exports.isAdmin = function _isAdmin (req, res, next) {
    if (req.user.role === 'admin') {
        return next();
    } else {
        return res.status(403).end("Admin rights required");
    }
};


// returns 409 'Conflict' if user already exist 
exports.userExists = function _userExists (req, res, next) {
    User
        .findOne({ username: req.body.username })
        .exec(function (err, user) {
            if (err) { throw err; }
            if (user) {
                res.status(409);
                res.send('Данный e-mail уже зарегистрирован');
            } else {
                next();
            }
        });
};
