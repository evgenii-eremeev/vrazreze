var express = require('express');
var router = express.Router();

var newDrawingCtrl = require('../controllers/newDrawingCtrl.js');

// multer
var multer  = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads');
    },
    filename: function (req, file, cb) {
        var filename = file.fieldname + '-';
        filename += Date.now() + '.';
        filename += file.originalname.split('.').slice(-1);
        cb(null, filename);
    }
});

var upload = multer({
    storage: storage,
    limits: { fileSize: 3000000 }
});


// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.send("Login required");
    }
}

// new_drawing
router.post('/', isLoggedIn, upload.single('picture'), newDrawingCtrl.post);

module.exports = router;
