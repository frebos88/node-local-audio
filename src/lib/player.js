var ytdl = require('ytdl-core');
var ffmpeg = require('fluent-ffmpeg');
var lame = require('lame');
var Speaker = require('speaker');

function Player() {
	this.queue = [];
	this.current;
	this.playing = false;
	this.dl;
	this.stream;
	this.speaker;

	this.decoder = new lame.Decoder();
	var that = this;
	this.decoder.on('format', function (format) {
			that.speaker = new Speaker(format);
			that.speaker.on('error', function(err) {console.log('err', err);})
			this.pipe(that.speaker);
	});
	this.decoder.resume();
}

Player.prototype.playYoutube = function(url) {
	this.dl = ytdl(url, {
		filter: function(format) {
			return format.container === 'mp4';
		}
	});

	this.stream = ffmpeg(this.dl).format('mp3');
	this.stream.pipe(this.decoder);
};

Player.prototype.start = function(source, url) {
	switch(source) {
		case 'youtube':
			this.playYoutube(url);
		break;
	}
};

Player.prototype.pause = function() {
	this.decoder.pause();
	this.stream.kill('SIGSTOP');
};

Player.prototype.play = function() {
	// @todo check if we can resume
	this.decoder.resume();
	this.stream.kill('SIGCONT');
};

Player.prototype.addToQueue = function(source, url) {
	this.queue.push({ source: source, url: url });
};

module.exports = Player;
