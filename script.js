var game = new Phaser.Game(1200, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

var PLAYER_SCALE = 2;
var PLAYER_SPEED = 150;

var platforms;
var player;
var cursors;
var stars;
var score = 0;
var scoreText;
var background;
var ground;


function preload() {
	game.load.image('background', 'assets/layer-1-update.png');
	game.load.image('foreground', 'assets/layer-2.png');
	game.load.spritesheet('char', 'assets/koopa-sprite-walk.png', 40.25, 32);
}

function create() {
	//physics type
	game.physics.startSystem(Phaser.Physics.ARCADE);
	//repeating background
	background = game.add.tileSprite(0, 0, 1200, 600, 'background');
	
	//create a repeating ground
	ground = game.add.tileSprite(0, game.world.height - 58, 1200, 68, 'foreground');
	//scaling ground
	//ground.scale.setTo(1);
	game.physics.arcade.enable(ground);
	//make ground permenant
	ground.body.immovable = true;

	//add sprite
	player = game.add.sprite(450, game.world.height - 178, 'char');
	//set an anchor
	player.anchor.setTo(.5,.5);
	//give player physics
	game.physics.arcade.enable(player);
	//Make koopa bigger
	player.scale.setTo(PLAYER_SCALE);
	//add bounce and gravity
	player.body.bounce.y = 0.1;
	player.body.gravity.y = 600;
	player.body.collideWorldBounds = true;
	//walking animations
	player.animations.add('walk', [0, 1, 2, 3], 8, true);
	


	cursors = game.input.keyboard.createCursorKeys();

}


function update() {
	//scroll background
	background.tilePosition.x -= 1.4;
	//scroll ground
	ground.tilePosition.x -= .9;

	//collide player with ground
	game.physics.arcade.collide(player, ground);

	//reset velocity
	player.body.velocity.x = 0;

	//player movement
	if (cursors.left.isDown) {
		//background.tilePosition.x += 1;
		//ground.tilePosition.x += .5;
		//move left
		player.body.velocity.x = -150;
		player.scale.x = -PLAYER_SCALE;
		player.animations.play('walk');

	} else if (cursors.right. isDown) {
		//background.tilePosition.x -= 1;
		//ground.tilePosition.x -= .5;
		//move right
		player.body.velocity.x = 150;
		player.scale.x = PLAYER_SCALE;
		player.animations.play('walk');
	} else {

		//stands still
		player.animations.stop();
		player.frame = 0;
		player.body.velocity.x = -54;
	}
	//allow player to jump if touching the ground
	if (cursors.up.isDown && player.body.touching.down){
		player.body.velocity.y = -350;
	}

	//console.log(player.position.x);

	if(player.position.x < 42) {
		console.log('GAME_OVER');
	}
}



































