var loadState = {
 
	preload: function() {
		game.add.text(80, 150, 'Loading...', {font: '30px Courier', fill: '#ffffff'});

		game.load.image('background', 'assets/layer-1-update.png');
		game.load.image('foreground', 'assets/layer-2.png');
		game.load.spritesheet('fire', 'assets/fire-sprite-smaller.png', 41.8, 64);
		game.load.image('tile', 'assets/tile.png');
		game.load.spritesheet('boulder', 'assets/Boulder.png', 127, 119);
		game.load.spritesheet('char', 'assets/koopa-sprite-walk.png', 40.25, 32);
		game.load.audio('music', 'assets/music.mp3', 'assets/music.mp3');
		game.load.audio('jump', 'assets/jump_07.mp3', 'assets/music.mp3');
		game.load.audio('boulderRoll', 'assets/boulderRoll.mp3', 'assets/boulderRoll.mp3');
		game.load.image('menuScreen', 'assets/full-background-2.png');
		game.load.image('skull', 'assets/skull.png');

	}, 

	create: function() {
		game.state.start('menu');
	},
};




