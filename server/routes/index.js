var express = require('express');
var passport = require('passport');
var router = express.Router();

// import routes
var newDrawingRouter = require('./newDrawingRouter');

// import controllers
var authCtrl = require('../controllers/authCtrl');
var apiCtrl = require('../controllers/apiCtrl');
var mailCtrl = require('../controllers/mailCtrl');


// check_session
router.post('/check_session', authCtrl.checkSession);

// signup
router.post('/signup', authCtrl.userExists, authCtrl.signup);

// login
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

// API
// categories
router.get('/api/categories', apiCtrl.categories);

// category:url
router.get('/api/category/:url', apiCtrl.category);

// add_category
router.post('/api/add_category', apiCtrl.addCategory);

// delete_category
router.delete('/api/delete_category/:categoryId', apiCtrl.deleteCategory);

// new_drawing (post)
router.use('/api/new_drawing', newDrawingRouter);

// delete_drawing
router.delete('/api/delete_drawing/:drawingId', apiCtrl.deleteDrawing);

// update_category
router.post('/api/update_category/:categoryId', apiCtrl.updateCategory);

// MAIL
// sendOrder
router.post('/mail/order', mailCtrl.order);

// 'any uri, because we use react-router'
// Should be placed at the very end for the rest 'get' requests work
router.get('*', function(req, res) {
    res.sendFile(process.cwd() + '/public/index.html');
});

module.exports = router;
