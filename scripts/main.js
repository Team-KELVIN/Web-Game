var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'game');
var counter = 0;
var lives = 3;
var scoreText;
var livesText;
var introText;
var score = 0;
var music;

var JumpGame = function () {

    this.player = null;
    this.platforms = null;
    this.background = null;

    this.facing = 'left';
    this.edgeTimer = 0;
    this.jumpTimer = 0;

    this.wasStanding = false;
    this.cursors = null;

    this.stationaryPlat = 200;
};

JumpGame.prototype = {

    init: function () {

        this.game.renderer.renderSession.roundPixels = true;

        this.world.resize(800, 2400);

        this.physics.startSystem(Phaser.Physics.ARCADE);

        this.physics.arcade.gravity.y = 650;
        this.physics.arcade.skipQuadTree = false;

    },

    preload: function () {

        game.load.audio('music', 'assets/03-ape-quest.mp3');

        this.load.spritesheet('player', 'assets/posum-guy.png', 100, 100);
        this.load.image('small-orange', 'assets/small-orange.png');
        this.load.image('orange', 'assets/orange.png');
        this.load.image('trees', 'assets/trees.png');
        this.load.image('background', 'assets/background-forest.png');
        this.load.image('platform', 'assets/platform.png');
        this.load.image('dark-platform', 'assets/dark-platform.png');

    },

    create: function () {

<<<<<<< HEAD

=======
>>>>>>> c35d9bd3eb03652e77ea9a7558483959d2fb7903
        music = game.add.audio('music',1,true);

        music.play();

        this.background = this.add.tileSprite(0, 0, 800, 600, 'background');
        this.background.fixedToCamera = true;

        this.add.sprite(0, 2100, 'trees');

        this.platforms = this.add.physicsGroup();

        var x = 0;
        var y = 64;

        for (var i = 0; i < 19; i++) {
            var platform = this.platforms.create(x, y, 'dark-platform');

            platform.body.velocity.x = this.rnd.between(50, 100);

            if (Math.random() < 0.5) {
                platform.body.velocity.x *= -1;
            }

            x += 400;

            if (x >= 800) {
                x = 0;
            }

            y += 150;
        }

        this.fruit = game.add.physicsGroup(Phaser.Physics.ARCADE);

        for (var i = 0; i < 10; i++)
        {
            var c = this.fruit.create(game.rnd.integerInRange(30, 800-30), game.rnd.integerInRange(200, 2000), 'small-orange', 1);
        }

        var big = this.fruit.create(300, 200, 'orange', 1);

        this.fruit.setAll('body.allowGravity', false);
        this.fruit.setAll('body.immovable', true);
        

        for (i = 0; i < 19; i++) {
            if(i % 2 == 0) {
                this.platforms.create(0, this.stationaryPlat, 'platform');
            }
            else {
                this.platforms.create(650, this.stationaryPlat, 'platform');
            }
            this.stationaryPlat += 250;
        }
        this.stationaryPlat = 200;


        this.platforms.setAll('body.allowGravity', false);
        this.platforms.setAll('body.immovable', true);

        this.player = this.add.sprite(game.world.centerX - 100, 2300, 'player');

        this.physics.arcade.enable(this.player);

        this.player.body.collideWorldBounds = true;
        this.player.body.setSize(100, 100, 0, 0);

        this.player.animations.add('right', [6, 7, 8, 9, 10, 11], 7, true);
        this.player.animations.add('left', [12, 13, 14, 15, 16, 17], 7, true);
        this.player.animations.add('down', [20, 20], 2, true);
        this.player.animations.add('dead', [21, 21], 2, true);

        this.camera.follow(this.player);

        this.cursors = this.input.keyboard.createCursorKeys();
<<<<<<< HEAD

=======
>>>>>>> c35d9bd3eb03652e77ea9a7558483959d2fb7903

    },

    wrapPlatform: function (platform) {

        if (platform.body.velocity.x < 0 && platform.x <= -160) {
            platform.x = 800;
        }
        else if (platform.body.velocity.x > 0 && platform.x >= 800) {
            platform.x = -160;
        }

    },

    collisionHandler: function (player, fruit) {
        fruit.kill();
        score += 15;
    },

    update: function () {


        this.background.tilePosition.y = -(this.camera.y * 0.7);

        this.platforms.forEach(this.wrapPlatform, this);

        this.physics.arcade.collide(this.player, this.platforms);

        this.physics.arcade.collide(this.player, this.fruit, this.collisionHandler, null, this);
        
        var standing = this.player.body.blocked.down || this.player.body.touching.down;

        this.player.body.velocity.x = 0;

        if (this.cursors.left.isDown) {
            this.player.body.velocity.x = -200;

            if (this.facing !== 'left') {
                this.player.play('left');
                this.facing = 'left';
            }
        }
        else if (this.cursors.right.isDown) {
            this.player.body.velocity.x = 200;

            if (this.facing !== 'right') {
                this.player.play('right');
                this.facing = 'right';
            }
        }
        else {
            if (this.facing !== 'idle') {
                this.player.animations.stop();

                if (this.facing === 'left') {
                    this.player.frame = 0;
                }
                else {
                    this.player.frame = 1;
                }

                this.facing = 'idle';
            }
        }

        if (!standing && this.wasStanding) {
            this.edgeTimer = this.time.time + 250;
        }

        if ((standing || this.time.time <= this.edgeTimer) && this.cursors.up.isDown && this.time.time > this.jumpTimer) {

            this.player.body.velocity.y = -500;
            this.jumpTimer = this.time.time + 750;
        }

        this.wasStanding = standing;

        if (this.player.body.velocity.y >= 700) {
            counter++;
        }


        game.world.remove(scoreText);
        scoreText = game.add.text(10, this.camera.y + 550, 'score:' + score, {
            font: "25px Candara",
            fill: "#FF9933",
            align: "left"
        });

        game.world.remove(livesText);
        livesText = game.add.text(720, this.camera.y + 550, 'lives:' + lives, {
            font: "25px Candara",
            fill: "#FF9933",
            align: "left"
        });


        if (counter > 0 && this.player.body.velocity.y === 0) {
            counter = 0;
            lives--;
            this.player.play('down');
            if (lives === 0) {
                introText = game.add.text(300, this.player.y, 'Game Over!', {
                    font: "40px Candara",
                    fill: "#FF9933",
                    align: "center"
                });
                introText.visible = true;

                this.player.play('dead');// rip animation
                this.player.kill(standing);
        }

        }
    }
};

game.state.add('Game', JumpGame, true);
