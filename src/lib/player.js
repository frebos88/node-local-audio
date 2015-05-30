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
	this.decoder = new lame.Decoder();
	this.decoder.resume();
	this.speaker;
}

Player.prototype.playYoutube = function(url) {
		this.dl = ytdl(url, {
			filter: function(format) {
				return format.container === 'mp4';
			}
		});

	var that = this;
	this.stream = ffmpeg(this.dl)
		.format('mp3')
		.pipe(that.decoder)
		.on('format', function (format) {
			that.speaker = new Speaker(format);
			this.pipe(that.speaker);
	});
};

Player.prototype.start = function(source, url) {
	switch(source) {
		case 'youtube':
			this.playYoutube(url);
		break;
	}
};

Player.prototype.pause = function() {
	// Fix pause
	//this.stream.pause();//kill('SIGSTOP'); // kill according to docs
};

Player.prototype.play = function() {
	// Fix resume
	//this.stream.kill('SIGCONT');
};

Player.prototype.addToQueue = function(source, url) {
	this.queue.push({ source: source, url: url });
};

module.exports = Player;
