var boot = function(game) {
	console.log("Loading game");
};

boot.prototype = {
	preload: function(){
		this.game.load.image("loading", "assets/loadingbar.png");
	},
	create: function() {
		this.game.state.start("Preload");
	}
}