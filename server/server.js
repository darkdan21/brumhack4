var express = require('express'),
    https = require('https'),
    http = require('http');

var app = express();
var options = {};

// Serve static content
app.use(express.static('public'));

// Redirect to HTTPS
app.all('*', function (req, res, next) {
    if (req.secure) return next();
    res.redirect('https://' + req.host + req.url);
});

// Handle Viewer
app.get('/viewer/:id', function(req, res){
});

// Handle controller
app.get('/controller/:id', function(req, res){
});

http.createServer(app).listen(8080);
https.createServer(options, app).listen(443);