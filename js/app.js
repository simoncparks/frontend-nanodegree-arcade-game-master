var Enemy = function () {
    //Three variable to track the position and speed of the enemy
    var x, y, speed;
    //Creates an enemy when the game is first run.
    this.create();
};

Enemy.prototype.create = function (){
    //Sets the speed to 100, 200, or 300 - chosen randomly
    this.speed = (Math.floor(Math.random() * 3) + 1) * 100;
    //y values of 50, 135 or 220 correspond to 2nd, 3rd or 4th rows.
    //worked out via 50 + random int between zero and 2 times 85.
    this.y = 50 + ((Math.floor(Math.random() * 3)) * 85);
    //x values of 1 or 2 correspond to either a left or right hand
    //starting position
    this.x = Math.floor(Math.random() * 2) + 1;
    //x will equal 1 or 2. If it is 2, this sets the starting position
    //to the right of the screen, loads a flipped sprite and inverts
    //the speed. If it is 1, it just sets a starting position on the
    //left and loads the regular sprite.
    if(this.x === 2) {
        this.speed *= -1;
        this.sprite = 'images/enemy-bug-flip.png';
        this.x = 500;
    } else {
        this.x = -100;
        this.sprite = 'images/enemy-bug.png';
    };
};

Enemy.prototype.update = function(dt) {
    //Moves the enemy
    this.x += (this.speed * dt);
    //Resets the enemy's position when it goes off screen
    if(this.x > 550) {
        this.x = -100;
    } else if (this.x < -150) {
        this.x = 500;
    };
    //Checks if they player and any enemies are in a collison state
    //There is a y displacement of 10 and an x displacement of +- 50
    //If a collision occurs the player's position is reset, enemies
    //are cleared and one new one is spawned randomly effectively starting
    //a new game
    if ((this.x >= (player.x - 50)) && (this.x <= (player.x + 50)) && (this.y === (player.y - 10))){
        player.reset();
        allEnemies = [];
        allEnemies.push(new Enemy());
    };
};

Enemy.prototype.render = function() {
    //Draws the enemy on the screen
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function() {
    //position variables for the player
    var x, y;
    //player sprite
    this.sprite = 'images/char-boy.png';
    //Creates the player the first time the game is run
    this.reset();
};

Player.prototype.reset = function(){
    //the default y position will always be 400 because we always
    //want to start on the bottom row
    this.y = 400;
    //default x positions will be 0, 100, 200, 300 or 400 - chosen randomly
    this.x = (Math.floor(Math.random() * 5)) * 100;
};

Player.prototype.update = function(keyPressed){
    //Moves the player when the arrow keys are pressed
    //won't let them move out of bounds
    if ((keyPressed === 'left') && (this.x - 100 > -1)) {
        this.x -= 100;
    } else if ((keyPressed === 'right') && (this.x + 100 < 401)) {
        this.x += 100;
    } else if ((keyPressed === 'up')  && (this.y - 85 > -100)) {
        this.y -= 85;
    } else if ((keyPressed === 'down') && (this.y + 85 < 401)) {
        this.y += 85;
    };
    //When the player reaches the water, they are moved back to the
    //beginning and a new enemy is added up to a maximum of 10.
    if(this. y < -1){
        this.reset();
        if(allEnemies.length < 10) {
            allEnemies.push(new Enemy());
        };
    };
};

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyPressed) {
    this.update(keyPressed);
};

var allEnemies = [new Enemy()];
var player = new Player();

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
