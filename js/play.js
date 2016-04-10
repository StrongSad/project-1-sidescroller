var playState = {

	PLAYER_SCALE: 2,
	platforms: null,
	player: null,
	cursors: null,
	stars: null,
	score: 0,
	scoreText: 0,
	background: null,
	ground: null,
	fires: null,
	tiles: null,
	boulders: null,
	ghosts: null,
	//dropTimer: null,
	// tileTime: 50000,
	//fireTime: 15000,
	// boulderTime: 0,
	//highFireTime: 45000,

	create: function() {
		game.time.now = 0;
		console.log(game.time.now);
		//repeating background
		this.background = game.add.tileSprite(0, 0, 1200, 600, 'background');
		//score display
		scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
		
		//create a repeating ground
		this.ground = game.add.tileSprite(0, game.world.height - 58, 1200, 68, 'foreground');
		//scaling ground
		//ground.scale.setTo(1);
		game.physics.arcade.enable(this.ground);
		//make ground permenant
		this.ground.body.immovable = true;

		//add sprite
		this.player = game.add.sprite(450, game.world.height - 178, 'char');
		//set an anchor
		this.player.anchor.setTo(.5,.5);
		//give player physics
		game.physics.arcade.enable(this.player);
		//Make koopa bigger
		this.player.scale.setTo(this.PLAYER_SCALE);
		//add bounce and gravity
		this.player.body.bounce.y = 0.1;
		this.player.body.gravity.y = 450;
		this.player.body.collideWorldBounds = true;
		//walking animations
		this.player.animations.add('walk', [0, 1, 2, 3], 8, true);
		this.player.body.setSize(15, 28);
		
		//enable fire to be generated
		this.fires = game.add.group();
		this.fires.enableBody = true;
		this.fires.physicsBodyType = Phaser.Physics.ARCADE;
		this.fires.createMultiple(10, 'fire');
		//generate fire
		//if(game.time.now > this.fireTime) {
		//	game.time.events.loop(Phaser.Timer.SECOND * 1, this.spawnFire, this);
		//} else {
		game.time.events.loop(Phaser.Timer.SECOND * 4, this.spawnFire, this);
		//};

		game.time.events.add(Phaser.Timer.SECOND * 30, this.runHighFire, this);
		//game.time.events.add(Phaser.Timer.SECOND * 1, this.runSpawnFire, this);

		//enable tiles to be generated 
		this.tiles = game.add.group();
		this.tiles.enableBody = true;
		this.tiles.physicsBodyType = Phaser.Physics.ARCADE;
		this.tiles.createMultiple(6, 'tile');
		this.tiles.setAll('body.immovable', true);

		//boulders
		this.boulders = game.add.group();
		this.boulders.enableBody = true;
		this.boulders.physicsBodyType = Phaser.Physics.ARCADE;
		this.boulders.createMultiple(10, 'boulder');

		//ghosts
		this.ghosts = game.add.group();
		this.ghosts.enableBody = true;
		this.ghosts.physicsBodyType = Phaser.Physics.ARCADE;
		this.ghosts.createMultiple(6, 'ghost');
		
		game.time.events.add(Phaser.Timer.SECOND * 15, this.runGhosts, this);

		var that = this;
		
		//generate tiles
		game.time.events.add(Phaser.Timer.SECOND * 4, that.runTile, that);
		//game.tile.events.loop(Phaser.Timer.SECOND / 5, this.ranTile, this)

		//generate boulders
		game.time.events.add(Phaser.Timer.SECOND * 8, that.runBoulder, that);
		

		//update score
		game.time.events.loop(Phaser.Timer.SECOND / 8, function() {
			this.score += 1;
			scoreText.text = 'Score: ' + this.score;
		}, this);

		//use keys to move
		this.cursors = game.input.keyboard.createCursorKeys();

	}, 

	spawnFire: function() {
		var fire = this.fires.getFirstExists(false);
		fire.reset(game.world.width -50, game.world.height - 89);
		fire.checkWorldBounds = true;
		fire.outOfBoundsKill = true;
		//fire.scale.setTo()
		fire.anchor.setTo(.5);
		fire.body.velocity.x = game.rnd.integerInRange(-475, -300);
		fire.animations.add('fire', [0, 1, 2, 3, 4], 8, true);
		fire.animations.play('fire');
		fire.body.setSize(28, 45);
		this.music = game.add.audio('fireSound');
		this.music.play();
	},

	runHighFire: function() {
		//if (game.time.elapsed > this.highFireTime) {
		//	game.time.events.loop(Phaser.Timer.SECOND * 5 , this.spawnHighFire, this);
		//} else {
			game.time.events.loop(Phaser.Timer.SECOND * 8 , this.spawnHighFire, this);
		//};
	},

	spawnHighFire: function() {
		var fire = this.fires.getFirstExists(false);
		fire.reset(50, game.world.height - 200);
		fire.checkWorldBounds = true;
		fire.outOfBoundsKill = true;
		fire.body.gravity.y = 85 + Math.random() * 50;
		fire.body.bounce.y = 1 + Math.random() * 4;
		//fire.scale.setTo()
		fire.anchor.setTo(.5);
		fire.body.velocity.x = game.rnd.integerInRange(300, 475);
		fire.animations.add('fire', [0, 1, 2, 3, 4], 8, true);
		fire.animations.play('fire');
		fire.body.setSize(28, 45);
		this.music = game.add.audio('fireSound');
		this.music.play();
	},

	runGhosts: function() {
		game.time.events.loop(Phaser.Timer.SECOND * 6 , this.spawnGhosts, this);
	},

	spawnGhosts: function() {
		var ghost = this.ghosts.getFirstExists(false);
		ghost.reset(game.world.width -50, game.world.height - 200);
		ghost.checkWorldBounds = true;
		ghost.outOfBoundsKill = true;
		ghost.scale.setTo(1.5);
		ghost.anchor.setTo(.5);
		ghost.body.velocity.x = game.rnd.integerInRange(-475, -300);
		ghost.animations.add('ghost', [0, 1, 2, 3, 4, 5], 8, true);
		ghost.animations.play('ghost');
		ghost.body.setSize(64, 64);
		this.music = game.add.audio('ghostSound');
		this.music.play();
		console.log(this.music);
	},

	// ranTile: function() {
	// 	if (game.time.now > tileTime) {
	// 		Tile;
	// 		tileTime = game.time.now + 5000;
	// 	}
	// },

	runTile: function() {
		//if (game.time.elapsed > this.tileTime) {
		//	game.time.events.loop(Phaser.Timer.SECOND * 9, this.spawnTile, this);
		//} else {
			game.time.events.loop(Phaser.Timer.SECOND * 7 , this.spawnTile, this);
		//};
	},

	spawnTile: function() {
		
		var tile = this.tiles.getFirstExists(false);
		game.physics.arcade.enable(tile);
		tile.reset(game.world.width -50, game.world.height - 140);
		tile.checkWorldBounds = true;
		tile.outOfBoundsKill = true;
		tile.scale.setTo(.25);
		tile.anchor.setTo(.5);
		tile.body.velocity.x = -160;

	},

	runBoulder: function() {
		game.time.events.loop(Phaser.Timer.SECOND * 9, this.spawnBoulder, this);
	},

	spawnBoulder: function() {
		var boulder = this.boulders.getFirstExists(false);
		boulder.reset(50, game.world.height - 106);
		boulder.checkWorldBounds = true;
		boulder.outOfBoundsKill = true;
		boulder.scale.setTo(.8);
		boulder.anchor.setTo(.5);
		boulder.body.velocity.x = game.rnd.integerInRange(300, 500);
		boulder.animations.add('boulder', [0, 1, 2, 3], 8, true);
		boulder.animations.play('boulder');
		boulder.body.setSize(100, 100);
		this.music = game.add.audio('boulderRoll');
		this.music.play();
	},

	hitFire: function(player, fire) {
		fire.kill();
		game.state.start('win');
	},

	hitBoulder: function(player, boulder) {
		boulder.kill();
		game.state.start('win');
	},

	hitGhost: function(player, ghost) {
		ghost.kill();
		game.state.start('win');
	},

	update: function() {
		//scroll background
		this.background.tilePosition.x -= 1;
		//scroll ground
		this.ground.tilePosition.x -= 2;

		//collide player with ground fire tile
		this.game.physics.arcade.collide(this.player, this.ground);
		this.game.physics.arcade.overlap(this.player, this.fires, this.hitFire, null, this);
		this.game.physics.arcade.collide(this.player, this.tiles);
		this.game.physics.arcade.overlap(this.player, this.boulders, this.hitBoulder, null, this);
		this.game.physics.arcade.overlap(this.player, this.ghosts, this.hitGhost, null, this);
		this.game.physics.arcade.collide(this.fire.children, this.ground);
		//reset velocity
		this.player.body.velocity.x = 0;

		//checks is player is at the death zone...
		if (this.player.position.x < 42) {
			game.state.start('win');
		}

		if (this.cursors.left.isDown) {
			//background.tilePosition.x += 1;
			//ground.tilePosition.x += .5;
			//move left
			this.player.body.velocity.x = -270;
			this.player.scale.x = -this.PLAYER_SCALE;
			this.player.animations.play('walk');

		} else if (this.cursors.right.isDown) {
			//background.tilePosition.x -= 1;
			//ground.tilePosition.x -= .5;
			//move right
			this.player.body.velocity.x = 150;
			this.player.scale.x = this.PLAYER_SCALE;
			this.player.animations.play('walk');

		} else {
			//stands still
			this.player.animations.stop();
			this.player.frame = 0;
			this.player.body.velocity.x = -120;
		}
		//allow player to jump if touching the ground
		if (this.cursors.up.isDown && this.player.body.touching.down){
			this.music = game.add.audio('jump');
			this.music.play();
			this.player.body.velocity.y = -325;
		}

	},

	// render: function() {
	// 	for(var i = 0; i < this.boulders.children.length; i++) {
	// 		var boulder = this.boulders.children[i];
	// 		game.debug.body(boulder);
	// 		var fire = this.fires.children[i];
	// 		game.debug.body(fire);
	// 		// var ghost = this.ghosts.children[i];
	// 		// game.debug.body(ghost);
	// 	}
	// },

	win: function() {
		game.state.start('win');
		this.score = 0;
	}
}









