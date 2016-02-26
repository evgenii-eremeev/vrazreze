var passport = require('passport');
var User = require('../models/user');
        
var registerCtrl = {
    
    get(req, res) {
        res.render('register', {});  
    },
    
    post(req, res) {
        User.register(
            new User({ username: req.body.username }),
            req.body.password,
            function (err, action) {
                if (err) {
                    return res.render('register', {});
                }

                passport.authenticate('local')(req, res, function () {
                    res.redirect('/');
                });
            }
        ); // end User.register
    } // end post
};

module.exports = registerCtrl;