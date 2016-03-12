var express = require('express'),
    http = require('http'),
    ws = require('ws');

var app = express();
var server = http.createServer(app).listen(8080);

var wss = new ws.Server({
    server: server,
    path: '/control'
});

// Serve static content
app.use(express.static('public'));

// Redirect to HTTPS
app.all('*', function (req, res, next) {
    if (req.secure) return next();
    res.redirect('https://' + req.hostname + req.url);
});

// Handle Viewer
app.get('/viewer/:id', function(req, res){
});

// Handle controller
app.get('/controller/:id', function(req, res){
});

