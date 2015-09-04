var preload = function(game){
	console.log("Preloading");
}

preload.prototype = {
	preload: function() {
		var barWidth = (this.game.cache.getImage("loading").width) / 2;
		console.log(barWidth);
		var loadingBar = this.add.sprite((this.game.width/2) - barWidth, this.game.height/3, "loading");
		console.log(this.game.width/2 - barWidth)
		
		//	loadingBar.anchor.setTo(0.5,0.5);
		this.load.setPreloadSprite(loadingBar, 0);
		this.game.load.image('background', 'assets/starfield.jpg');
    	this.game.load.image('player', 'assets/spaceship.png');
    	this.game.load.image('laser', 'assets/laser.png');
    	this.game.load.image('enemy', 'assets/enemyBlue2.png');
	},
	create: function() {
		var pressAnyKeyText = this.game.add.text(400, 350, 'Press any key to restart', { fontSize: '32px', fill: 'white'});
		pressAnyKeyText.anchor.setTo(0.5, 0.5);
		this.game.input.keyboard.onDownCallback = function(e) {
			this.game.state.start("TheGame");
		};
		//this.game.time.events.add(50000, this.game.state.start("TheGame"), this);
	},

	shutdown: function() {
		this.game.input.keyboard.onDownCallback = null;
	}
}