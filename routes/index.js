var express = require('express');
var passport = require('passport');
var router = express.Router();

// import routes
var newDrawingRouter = require('./newDrawingRouter');

// import controllers
var registerCtrl = require('../server/controllers/registerCtrl');


// new_drawing
router.use('/new_drawing', newDrawingRouter);

// '/'
router.get('/', function(req, res) {
    res.render('index', { user: req.user });
});

// register
router.get('/register', registerCtrl.get);
router.post('/register', registerCtrl.post);

// login
router.get('/login', function(req, res) {
    res.render('login', { user: req.user });
});

router.post('/login',
            passport.authenticate('local'),
            function(req, res) {
                res.redirect('/');
});

// logout
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});


module.exports = router;
