var express = require('express');
var router = express.Router();

var newDrawingCtrl = require('../controllers/newDrawingCtrl.js');

// multer
var multer  = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
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

// new_drawing
router.post('/', upload.single('picture'), newDrawingCtrl.post);

module.exports = router;
