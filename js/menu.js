var menuState = {
	create: function() {
		this.music = game.add.audio('music');
		this.music.play();
		this.background = game.add.tileSprite(0, 0, 1200, 600, 'menuScreen');

		var nameLabel = game.add.text(80, 80, 
			'../Jacob-Barrus/Project-One/Game/Stolen-Assets',
			{font: '50px Ariel', fill: '#000000'});

		var instructionLabel = game.add.text(160, 160, 'How to Play: ', 
			{font: '30px Ariel', fill: '#000000'});

		var instructionLabel = game.add.text(180, 200, 'Jump over obstacles', 
			{font: '25px Ariel', fill: '#000000'});

		var instructionLabel = game.add.text(180, 240, 'do not move with in 42px of left edge of screen ', 
			{font: '25px Ariel', fill: '#000000'});

		var instructionLabel = game.add.text(180, 280, 'Use yhe arrow keys to survive', 
			{font: '25px Ariel', fill: '#000000'});

		var questionLabel = game.add.text(160, 340, 'How high can you score?', 
			{font: '30px Ariel', fill: '#000000'});

		var startLabel = game.add.text(80, game.world.height - 140, 
			'Press the spacebar to play Stolen-Assets', 
			{font: '25px Ariel', fill: '#000000'}); 

		game.state.states.play.score = 0;
		
		//adding w key/ key of my choosing
		var wkey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

		wkey.onDown.addOnce(this.restart, this);
	},

	restart: function() {
		//console.log(game);
		game.state.start('play')
	}
};