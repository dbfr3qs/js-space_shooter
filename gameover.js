var gameover = function(game) {}

var anyKeyPressed;
var score;
var scoreText;

gameover.prototype = {

	init: function(score) {
		this.score = score;
		console.log(this.score);		
	},

	create: function() {
		var gameOverText = this.game.add.text(400, 300, 'GAME OVER', { fontSize: '32px', fill: 'white'});
		gameOverText.anchor.setTo(0.5, 0.5);
		var pressAnyKeyText = this.game.add.text(400, 350, 'Press any key to restart', { fontSize: '32px', fill: 'white'});
		pressAnyKeyText.anchor.setTo(0.5, 0.5);
		scoreText = this.game.add.text(16, 16, 'Score: ' + score, {fontSize: '32px', fill: 'white'});

		this.game.input.keyboard.onDownCallback = function(e) {
			this.game.state.start("TheGame");
		};
	},

	shutdown: function() { // kill the onDownCallback listener
		this.game.input.keyboard.onDownCallback = null;
	}
}