const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let gameLoop;
let player;
let bullets = [];
let enemies = [];
let score = 0;
let gameStartTime;
let gameSpeed = 1;
let maxGameTime = 60000; // 60 segundos en milisegundos

class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.speed = 5;
    }

    draw() {
        ctx.fillStyle = 'blue';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    moveLeft() {
        this.x = Math.max(0, this.x - this.speed);
    }

    moveRight() {
        this.x = Math.min(canvas.width - this.width, this.x + this.speed);
    }

    moveUp() {
        this.y = Math.max(0, this.y - this.speed);
    }

    moveDown() {
        this.y = Math.min(canvas.height - this.height, this.y + this.speed);
    }

    shoot() {
        bullets.push(new Bullet(this.x + this.width / 2, this.y));
    }
}

class Bullet {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 5;
        this.height = 15;
        this.speed = 7;
    }

    update() {
        this.y -= this.speed;
    }

    draw() {
        ctx.fillStyle = 'yellow';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

class Enemy {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 30;
        this.height = 30;
        this.baseSpeed = 2;
    }

    update(gameSpeed) {
        this.y += this.baseSpeed * gameSpeed;
    }

    draw() {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

function startGame() {
    player = new Player(canvas.width / 2, canvas.height - 60);
    score = 0;
    gameSpeed = 1;
    gameStartTime = Date.now();
    updateScore();
    gameLoop = setInterval(update, 1000 / 60); // 60 FPS
    spawnEnemies();
    document.getElementById('restartBtn').classList.add('hidden');
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.draw();
    updateBullets();
    updateEnemies();
    checkCollisions();
    
    let elapsedTime = Date.now() - gameStartTime;
    gameSpeed = 1 + (elapsedTime / 10000); // Aumenta en 1 cada 10 segundos
    
    if (elapsedTime >= maxGameTime) {
        endGame();
    }
}

function updateBullets() {
    for (let i = bullets.length - 1; i >= 0; i--) {
        bullets[i].update();
        bullets[i].draw();
        if (bullets[i].y < 0) {
            bullets.splice(i, 1);
        }
    }
}

function updateEnemies() {
    for (let i = enemies.length - 1; i >= 0; i--) {
        enemies[i].update(gameSpeed);
        enemies[i].draw();
        if (enemies[i].y > canvas.height) {
            enemies.splice(i, 1);
        }
    }
}

function spawnEnemies() {
    setInterval(() => {
        const x = Math.random() * (canvas.width - 30);
        enemies.push(new Enemy(x, 0));
    }, 1000);
}

function checkCollisions() {
    for (let i = enemies.length - 1; i >= 0; i--) {
        for (let j = bullets.length - 1; j >= 0; j--) {
            if (
                bullets[j].x < enemies[i].x + enemies[i].width &&
                bullets[j].x + bullets[j].width > enemies[i].x &&
                bullets[j].y < enemies[i].y + enemies[i].height &&
                bullets[j].y + bullets[j].height > enemies[i].y
            ) {
                enemies.splice(i, 1);
                bullets.splice(j, 1);
                score += 10;
                updateScore();
                break;
            }
        }
    }
}

function updateScore() {
    document.getElementById('currentScore').textContent = score;
}

function endGame() {
    clearInterval(gameLoop);
    document.getElementById('initialsModal').style.display = 'block';
    document.getElementById('restartBtn').classList.remove('hidden');
}

function submitScore() {
    const initials = document.getElementById('initialsInput').value.toUpperCase();
    if (initials.length > 0) {
        fetch('/submit-score', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ initials: initials, score: score }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Score submitted successfully');
            document.getElementById('initialsModal').style.display = 'none';
            loadHighScores();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
}

function loadHighScores() {
    fetch('/highscores')
        .then(response => response.json())
        .then(scores => {
            const scoresList = document.getElementById('highScoresList');
            scoresList.innerHTML = '';
            scores.forEach(score => {
                const li = document.createElement('li');
                li.textContent = `${score.initials}: ${score.score}`;
                scoresList.appendChild(li);
            });
        });
}

document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'ArrowLeft':
            player.moveLeft();
            break;
        case 'ArrowRight':
            player.moveRight();
            break;
        case 'ArrowUp':
            player.moveUp();
            break;
        case 'ArrowDown':
            player.moveDown();
            break;
        case ' ':
            player.shoot();
            break;
    }
});

document.getElementById('leftBtn').addEventListener('click', () => player.moveLeft());
document.getElementById('rightBtn').addEventListener('click', () => player.moveRight());
document.getElementById('upBtn').addEventListener('click', () => player.moveUp());
document.getElementById('downBtn').addEventListener('click', () => player.moveDown());
document.getElementById('shootBtn').addEventListener('click', () => player.shoot());

document.getElementById('submitInitials').addEventListener('click', submitScore);
document.getElementById('restartBtn').addEventListener('click', startGame);

loadHighScores();
startGame();
