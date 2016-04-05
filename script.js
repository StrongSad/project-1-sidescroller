var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

var platforms;
var player;
var cursors;
var stars;
var score = 0;
var scoreText;



function preload() {
	game.load.image('background', 'assets/layer-1.png');
	game.load.image('foreground', 'assets/layer-2.png');
	game.load.spritesheet('char', 'assets/walk-transparent.png', 84.375, 160);
}

function create() {
	//physics type
	game.physics.startSystem(Phaser.Physics.ARCADE);
	//background
	game.add.sprite(0, 0, 'background').scale.setTo(.4);
	//enabling tiles to walk on
	platforms = game.add.group();
	platforms.enableBody = true;
	//creating ground
	var ground = platforms.create(0, game.world.height - 58, 'foreground');
	//scaling ground
	ground.scale.setTo(.9);
	//make ground permenant
	ground.body.immovable = true;

	//add sprite
	player = game.add.sprite(25, game.world.height - 178, 'char');
	//seta anchor
	player.anchor.setTo(.5,.5);
	//give player physics
	game.physics.arcade.enable(player);
	//add bounce and gravity
	player.body.bounce.y = 0.1;
	player.body.gravity.y = 400;
	player.body.collideWorldBounds = true;
	//walking animations
	player.animations.add('walk', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
	


	cursors = game.input.keyboard.createCursorKeys();

}


function update() {
	//reset velocity
	player.body.velocity.x = 0;

	//player movement
	if (cursors.left.isDown) {
		//move left
		player.body.velocity.x = -150;
		player.scale.x = -1;
		player.animations.play('walk');

	} else if (cursors.right. isDown) {
		//move right
		player.body.velocity.x = 150;
		player.scale.x = 1;
		player.animations.play('walk');
	} else {

		//stands still
		player.animations.stop();

		player.frame = 4;
	}

	//allow player to jump if touching the ground
	if (cursors.up.isDown && player.body.touching.down){
		player.body.velocity.y = -350;
	}
}



































