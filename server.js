'use strict';

var express = require("express");

var app = express();

app.use(express.static(process.cwd() + '/public'));

app.get('/', function(req, res) {
    res.sendFile(process.cwd() + '/public/index.html');
});

var port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log("Express server running at http://localhost:" + port);
});
