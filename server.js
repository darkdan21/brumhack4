var express = require('express'),
    http = require('http'),
    ws = require('ws'),
    cookies = require('cookie-parser');

var app = express();
var server = http.createServer(app).listen(8080);
var root = { root : __dirname };

// Serve static content
app.use(express.static('public'));
app.use(cookies());

var idmap = [];

app.get('/play', function(req, res){
    var mkid = function() { // Gets a random 8 char hex string
        return Math.floor((1 + Math.random()) * 0x100000000)
            .toString(16).substring(1);
    };
    var id = mkid();
    var secret = mkid() + mkid();
    var hash = hashCode(id + secret);

    res.cookie('gameid', id);
    res.cookie('hash', hash);
    idmap[id] = secret;

    res.redirect("/controller");
});

// Handle Viewer
app.get('/viewer', function(req, res){
    var game = getGame(req);
    if (!game.exists)
        return noGame(req, res);

    res.redirect('/Game');
});

// Handle controller
app.get('/controller', function(req, res){
    var game = getGame(req);
    if (!game.exists)
        return noGame(req, res);

    res.sendFile('html/controller.html', root);
});

// Handle controller input
var wss = new ws.Server({
    server: server,
    path: '/control'
});
wss.on('connection', function connection(ws) {
    ws.on('message', function(msg) {
        console.log('received: %s', msg);
    });
});

function getGame(req) {
    var id     = req.cookies.gameid,
        hash   = req.cookies.hash,
        exists = id && hash && typeof[id] != 'undefined' &&
                 hashCode(id + idmap[id]) === hash;
    return {
        id: id,
        hash: hash,
        exists: exists
    };
}

function noGame(req, res) {
    // TODO: Add "New game" button
    return res.end('No active game with id ' + req.cookies.gameid);
}

function hashCode(str) {
    var hash = 0, i, chr, len;
    if (str.length === 0) return hash;
    for (i = 0, len = str.length; i < len; i++) {
        chr   = str.charCodeAt(i);
        hash  = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}