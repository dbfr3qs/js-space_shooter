var preload = function(game){
	console.log("Preloading");
}

var pressAnyKeyText;

WebFontConfig = {

    //  'active' means all requested fonts have finished loading
    //  We set a 1 second delay before calling 'createText'.
    //  For some reason if we don't the browser cannot render the text the first time it's created.
    //active: 

    //  The Google Fonts we want to load (specify as many as you like in the array)
    google: {
      families: ['Press Start 2P']
    }

};

preload.prototype = {
	preload: function() {
		var barWidth = (this.game.cache.getImage("loading").width) / 2;
		var loadingBar = this.add.sprite((this.game.width/2) - barWidth, this.game.height/3, "loading");
		
		//	loadingBar.anchor.setTo(0.5,0.5);
		this.load.setPreloadSprite(loadingBar, 0);
		this.game.load.image('background', 'assets/starfield.jpg');
    	this.game.load.image('player', 'assets/spaceship.png');
    	this.game.load.image('laser', 'assets/laser.png');
    	this.game.load.image('enemy', 'assets/enemyBlue2.png');
    	this.game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
    	this.game.load.audio('laserAudio', 'assets/laser.ogg');
    	this.game.load.spritesheet('explosion', 'assets/explosion.png', 64, 64);
    	this.game.stage.disableVisibilityChange = true;

    	var delay = this.game.time.events.add(Phaser.Timer.SECOND * 2, this.createText, this);
	},
	create: function() {
		
		this.game.input.keyboard.onDownCallback = function(e) {
			this.game.state.start("TheGame");
		};
	},

	createText: function() {
		pressAnyKeyText = this.game.add.text(400, 350, 'Press any key to start', { fontSize: '32px', fill: 'white'});
		pressAnyKeyText.font = 'Press Start 2P';
		pressAnyKeyText.fontSize = 16;
		pressAnyKeyText.anchor.setTo(0.5, 0.5);
	},

	shutdown: function() {
		this.game.input.keyboard.onDownCallback = null;
	}
}