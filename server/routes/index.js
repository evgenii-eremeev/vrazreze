var express = require('express');
var passport = require('passport');
var router = express.Router();

// import routes
var newDrawingRouter = require('./newDrawingRouter');

// import controllers
var registerCtrl = require('../controllers/registerCtrl');

// new_drawing (post)
router.use('/new_drawing', newDrawingRouter);

// 'any uri, because we use react-router'
router.get('*', function(req, res) {
    res.sendFile(process.cwd() + '/public/index.html');
});

// register
router.post('/register', registerCtrl.post);

router.post('/login',
            passport.authenticate('local'),
            function(req, res) {
                console.log(req.user.username + " is logged in");
                res.json(req.user);
});

// logout
router.post('/logout', function(req, res) {
    req.logout();
    res.send("Logout successfully!")
});


module.exports = router;
