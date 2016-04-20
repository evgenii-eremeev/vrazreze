'use strict';

var express = require("express");
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var quickthumb = require('quickthumb');
var session = require('express-session');

var MongoStore = require('connect-mongo')(session);

var app = express();
app.set('port', (process.env.PORT || 5000));
require('dotenv').load();

if (process.env.NODE_ENV !== 'production') {
    (function webpackHotMiddleware() {
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

// passport config
require('./server/config/passport')(passport);

// mongoose
mongoose.connect('mongodb://localhost:27017/vrazreze');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat',
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(quickthumb.static(process.cwd() + '/public'));

require('./server/routes')(app);

// 'any uri, because we use react-router'
// Should be placed at the very end for the rest 'get' requests to work
app.get('*', function(req, res) {
    res.sendFile(process.cwd() + '/public/index.html');
});


app.listen(app.get('port'), function () {
    console.log("Express server running at http://localhost:" + app.get('port'));
    console.log("NODE_ENV=" + process.env.NODE_ENV);
});
