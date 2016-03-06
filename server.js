'use strict';

var express = require("express");
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var routes = require('./server/routes/index');

var app = express();
require('dotenv').load();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(process.cwd() + '/public'));

app.use('/', routes);

// passport config
var User = require('./server/models/user');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// mongoose
mongoose.connect(process.env.MONGO_URI);

var port = process.env.PORT || 8080;
app.listen(port, function () {
    console.log("Express server running at http://localhost:" + port);
});
