var bootState = {

	create: function() {
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;
		
		//physics type
		game.physics.startSystem(Phaser.Physics.ARCADE);


		game.state.start('load');
	}
};