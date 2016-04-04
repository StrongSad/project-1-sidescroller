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
	//

}


function update() {

}