"use strict";
const path = require('path');
const multer  = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/pics');
    },
    filename: function (req, file, cb) {
        let filename = file.fieldname + '-';
        filename += Date.now() + path.extname(file.originalname);
        cb(null, filename);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 3000000 }
});

module.exports = upload;