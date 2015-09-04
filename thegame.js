var thegame = function(game) {
	var player;
	var enemies;
	var starfield;
	var lasers;
	var fireButton;
	var laserTimer;// the lasers come out to fast
	var enemyTimer;
	var score;
	var scoreText;
	var MIN_ENEMY_SPACING;
	var MAX_ENEMY_SPACING;
}

thegame.prototype = {
	create: function() {
		//  We're going to be using physics, so enable the Arcade Physics system
	    this.game.physics.startSystem(Phaser.Physics.ARCADE);
	    laserTimer = 0;
	    // scrolling background of stars
	    starfield = this.game.add.tileSprite(0, 0, 800, 600, 'background');
	    // spaceship
	    player = this.game.add.sprite(400, 500, 'player');
	    player.scale.setTo(0.5, 0.5);
	    player.anchor.setTo(0.5, 0.5);
	    this.game.physics.enable(player, Phaser.Physics.ARCADE);
	    
	    // lasers
	    lasers = this.game.add.group();
	    lasers.enableBody = true;
	    lasers.physicsBodyType = Phaser.Physics.ARCADE;
	    lasers.createMultiple(30, 'laser');
	    lasers.setAll('anchor.x', 0.5);
	    lasers.setAll('anchor.y', 1);
	    lasers.setAll('outOfBoundsKill', true); // kill lasers when out of bounds
	    lasers.setAll('checkWorldBounds', true);

	    // bad guys
	    enemies = this.game.add.group();
	    enemies.enableBody = true;
	    enemies.physicsBodyType = Phaser.Physics.ARCADE;
	    enemies.createMultiple(5, 'enemy');
	    enemies.setAll('anchor.x', 0.5);
	    enemies.setAll('anchor.y', 0.5);
	    enemies.setAll('scale.x', 0.5);
	    enemies.setAll('scale.y', 0.5);
	    enemies.setAll('angle', 180);
	    enemies.setAll('outOfBoundsKill', true);
	    enemies.setAll('checkWorldBounds', true);
	    enemyTimer = 0;
	    // kick off the bad guys
	    //MIN_ENEMY_SPACING = 300;
		//MAX_ENEMY_SPACING = 3000;
	    
	   	//this.game.time.events.add(this.game.rnd.integerInRange(MIN_ENEMY_SPACING, MAX_ENEMY_SPACING), this.launchNewEnemy());


	    // set up keyboard controls
	    cursors = this.game.input.keyboard.createCursorKeys();
	    fireButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

	    score = 0;
	    scoreText = this.game.add.text(16, 16, 'Score: 0', {fontSize: '32px', fill: 'white'});
	},

	update: function() {
		starfield.tilePosition.y += 2;

	    player.body.velocity.setTo(0, 0);

	    if (cursors.left.isDown) {
	        player.body.velocity.x = -200;
	    }
	    else if (cursors.right.isDown) {
	        player.body.velocity.x = 200;
	    }
	    else if (cursors.up.isDown) {
	    	player.body.velocity.y = -200;
	    }
	    else if (cursors.down.isDown) {
	    	player.body.velocity.y = 200;
	    }
	    
	    if (fireButton.isDown) {
	       this.fireLaser();
	    }
	    this.launchNewEnemy();
	    this.game.physics.arcade.overlap(player, enemies, this.shipsCollide, null, this);
	    this.game.physics.arcade.overlap(enemies, lasers, this.enemyHit, null, this);
	},

	fireLaser: function() {
		if (this.game.time.now > laserTimer){
        	var LASER_SPEED = 200;
        	var laser = lasers.getFirstExists(false);
        	if (laser) { // fire a laser
            	laser.reset(player.x, player.y - 16);
            	laser.body.velocity.y = -400;
            	laserTimer = this.game.time.now + LASER_SPEED;
        	}
    	}
	},

	launchNewEnemy: function() {

		if (this.game.time.now > enemyTimer) {
			var ENEMY_SPEED = 300;
			var enemy = enemies.getFirstExists(false);
			if (enemy) {
				enemy.reset((this.game.rnd.integerInRange(0, this.game.width)), -20); // start position of enemy
				enemy.body.velocity.x = this.game.rnd.integerInRange(-300, 300);
				enemy.body.velocity.y = ENEMY_SPEED;
				enemy.body.drag.x = 100;
				enemy.body.setSize(enemy.width * 0.75, enemy.height * 0.75);
				enemyTimer = this.game.time.now + 500;
			}
		}			
	},

	shipsCollide: function(player, enemy) {
		enemy.kill();
		this.game.state.start("GameOver", true, false, score);
	},

	enemyHit: function(enemy, laser) {
		enemy.kill();
		laser.kill();
		score+=10;
		scoreText.text = "Score: " + score;
	}
}