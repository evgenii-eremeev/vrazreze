'use strict';

var express = require("express");
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Category = require('./server/models/category');

var routes = require('./server/routes/index');

var app = express();
app.set('port', (process.env.PORT || 5000));
require('dotenv').load();

// ************************************
// This is the real meat of the example
// ************************************
if (process.env.NODE_ENV === 'development') {
    (function() {
      // Step 1: Create & configure a webpack compiler
      var webpack = require('webpack');
      var webpackConfig = require(process.env.WEBPACK_CONFIG ? process.env.WEBPACK_CONFIG : './webpack.config');
      var compiler = webpack(webpackConfig);

      // Step 2: Attach the dev middleware to the compiler & the server
      app.use(require("webpack-dev-middleware")(compiler, {
        noInfo: true, publicPath: webpackConfig.output.publicPath
      }));

      // Step 3: Attach the hot middleware to the compiler & the server
      app.use(require("webpack-hot-middleware")(compiler, {
        log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
      }));
    })();
}
// ************************************

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
mongoose.connect('mongodb://localhost:27017/vrazreze');

app.listen(app.get('port'), function () {
    console.log("Express server running at http://localhost:" + app.get('port'));
    console.log("NODE_ENV=" + process.env.NODE_ENV);
});
