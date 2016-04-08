var winState = {
	create: function() {
		var score = game.state.states.play.score;
		var loseLabel = game.add.text(80, 80, 'GAME OVER', {font: '50px Ariel', fill: '#ffffff'});
		var displayScore = game.add.text(120, 160, 'Score: ' + score +'pts', {font: '50px Ariel', fill: '#ffffff'});
		var taunt = game.add.text(120, 240, 'That\'s all you got? I bet you can\'t beat it...', {font: '35px Ariel', fill: '#ffffff'});
		var startLabel = game.add.text(80, game.world.height - 80,
		 'Press the spacebar to return to main menu and play again',
		  {font: '25px Ariel', fill: '#ffffff'});

	
		//adding w key/ key of my choosing
		var wkey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

		wkey.onDown.addOnce(this.restart, this);
	},

	restart: function() { 
		game.state.states.menu.music.stop();
		game.state.start('menu')
	}
}

