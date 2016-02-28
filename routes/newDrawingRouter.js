var express = require('express');
var router = express.Router();

var newDrawingCtrl = require('../server/controllers/newDrawingCtrl.js');

//multer
var multer  = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + 
             Date.now() + '.' + 
             file.originalname.split('.').slice(-1));
  }
});

var upload = multer({ 
  storage: storage,
  limits: { fileSize: 3000000 }
});

// new_drawing
router.get('/', newDrawingCtrl.get);

router.post('/', upload.single('picture'), newDrawingCtrl.post);

module.exports = router;