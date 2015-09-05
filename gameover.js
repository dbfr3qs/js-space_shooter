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
		var gameOverText = this.game.add.text(400, 300, 'GAME OVER', { fill: 'white'});
		gameOverText.font = 'Press Start 2P';
		gameOverText.fontSize = 16;
		gameOverText.anchor.setTo(0.5, 0.5);
		var pressAnyKeyText = this.game.add.text(400, 350, 'Press any key to restart', { fill: 'white'});
		pressAnyKeyText.font = 'Press Start 2P';
		pressAnyKeyText.fontSize = 16;
		pressAnyKeyText.anchor.setTo(0.5, 0.5);
		scoreText = this.game.add.text(16, 16, 'Score: ' + score, { fill: 'white'});
		scoreText.font = 'Press Start 2P';
		scoreText.fontSize = 16;
		this.game.input.keyboard.onDownCallback = function(e) {
			this.game.state.start("TheGame");
		};
	},

	shutdown: function() { // kill the onDownCallback listener
		this.game.input.keyboard.onDownCallback = null;
	}
}