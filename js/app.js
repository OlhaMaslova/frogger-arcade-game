// Variables declaration
const boyIcon = document.querySelector('.boy');
const princessIcon = document.querySelector('.princess');
const catIcon = document.querySelector('.cat'); 
const gameStart = document.querySelector('.game-start');
const gameEnd = document.querySelector('.game-over');
const heartsContainer = document.querySelector('.hearts');
const playAgainBtn = document.querySelector('.play-again-button');
let playerImg;
let hearts = 3;
let allEnemies = [];

// Enemies our player must avoid
class Enemy {
    constructor(x,y){
        //Set image for enemy
        this.sprite = 'images/enemy-bug.png';
        //Set initial location
        this.x = x;
        this.y = y;
        //Randomly set the speed 
        this.speed = 100 + Math.floor(Math.random() * 222);
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt){
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        this.x +=this.speed * dt;

        //Reset position if enemeny goes off screen
        if (this.x > 550){
            this.x = -100;
        }

        // Detect collisions
        if (player.x < this.x + 60 &&
            player.x + 30 > this.x &&
            player.y < this.y + 20 &&
            player.y + 30 > this.y) {
                player.sprite = 'images/explosion.png';
                this.x = -100;
                lives();
                setTimeout(function(){
                    player.sprite = playerImg;
                    player.x = 200;
                    player.y = 400;
                }, 500);
        }
    }

    // Draw the enemy on the screen, required method for game
    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Instantiate Enemies
let enemy = new Enemy (-100, 310);
let enemy1 = new Enemy (-100, 230);
let enemy2 = new Enemy (-100, 140);
let enemy3 = new Enemy (-100, 60);
let enemy4 = new Enemy (-100, 140);
let enemy5 = new Enemy (-100, 60);

allEnemies.push(enemy, enemy5, enemy4, enemy3, enemy2, enemy1);

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method. 
class Player {
    constructor(x, y, speed, sprite) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        // temporary img to be replaced by player icon 
        this.sprite = 'images/grass-block.png';
    }

    update() { 
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(keyEnter) {
        switch (keyEnter) {
            case 'left':
                this.x -= this.speed;
                if (this.x < 0) {
                    this.x = 0;
                }
                break;
            case 'right':
                this.x += this.speed;
                if (this.x > 400) {
                    this.x = 400;
                }
                break;
            case 'up':
                this.y -= this.speed;
                if (this.y < 0) {
                    this.x = 200;
                    this.y = 400;
                }
                break;
            case 'down':
                this.y += this.speed;
                if (this.y > 425) {
                    this.y = 425;
                }
                break;
        }
    }
}

// Instantiate Player
let player  = new Player(202, 415, 50);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// Function startGame function sets the icon chosen by the user
// and once selection is made it hides the modal view
function startGame(icon){
    if(icon==='boy'){
        player.sprite='images/char-boy.png';
        playerImg='images/char-boy.png';
    }
    if(icon==='princess'){
        player.sprite='images/char-princess-girl.png';
        playerImg='images/char-princess-girl.png';
    }
    if(icon==='cat'){
        player.sprite='images/char-cat-girl.png';
        playerImg='images/char-cat-girl.png';
    }
    gameStart.classList.add('hide-modal');
}

// Function to control lives
function lives() {
    hearts--;
    // Display lives
    switch (hearts) {
        case 3: 
            heartsContainer.innerHTML = `<li><i class='fas fa-heart'></i></li>
                                         <li><i class='fas fa-heart'></i></li>
                                         <li><i class='fas fa-heart'></i></li>`;
            break;
        case 2:
            heartsContainer.innerHTML = `<li><i class='fas fa-heart'></i></li>
                                         <li><i class='fas fa-heart'></i></li>
                                         <li><i class='far fa-heart'></i></li>`;
            break;
        case 1:
            heartsContainer.innerHTML = `<li><i class='fas fa-heart'></i></li>
                                         <li><i class='far fa-heart'></i></li>
                                         <li><i class='far fa-heart'></i></li>`;
            break;
        case 0:    
            heartsContainer.innerHTML = `<li><i class='far fa-heart'></i></li>
                                         <li><i class='far fa-heart'></i></li>
                                         <li><i class='far fa-heart'></i></li>`;
            gameOver();                     
    }
}

// Function gameOver shows game over modal view
// and asks user if he/she wants to play again 
function gameOver() {
    gameEnd.classList.remove('hide-modal');
}


// List of Event listeners
boyIcon.addEventListener('click', function() {
    startGame('boy')
});
princessIcon.addEventListener('click', function() {
    startGame('princess')
});

catIcon.addEventListener('click', function() {
    startGame('cat')
});

playAgainBtn.addEventListener('click', function() {
    hearts = 4;
    lives();
    startGame('playerImg');
    gameEnd.classList.add('hide-modal');
})

