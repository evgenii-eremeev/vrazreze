"use strict";

const express = require('express');
const passport = require('passport');
const router = express.Router();

// import routes
const apiRouter = require('./apiRouter');
const authRouter = require('./authRouter');
const mailRouter = require('./mailRouter');

router.use(authRouter);
router.use(apiRouter);
router.use(mailRouter);

// 'any uri, because we use react-router'
// Should be placed at the very end for the rest 'get' requests to work
router.get('*', function(req, res) {
    res.sendFile(process.cwd() + '/public/index.html');
});

module.exports = router;
