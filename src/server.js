var express = require('express');
var app = express();

var Player = require('./lib/player');
var player = new Player();

app.get('/youtube/:id', function(req, res) {
	res.json({ 'status': 'ok' });
	res.end();

	player.start('youtube', 'http://www.youtube.com/watch?v=' + req.params.id);
});

app.get('/youtube/:id/pause', function(req, res) {
	player.pause();
	res.json({ 'status': 'ok', 'msg': 'Pausing playback' });
	res.end();
});

app.get('/youtube/:id/play', function(req, res) {
	player.play();
	res.json({ 'status': 'ok', 'msg': 'Pausing playback' });
	res.end();
});

app.listen(8001, function() {
	console.log('Listening on port', this.address().port);
});
