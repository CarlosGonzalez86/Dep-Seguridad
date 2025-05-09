const gameContainer = document.getElementById('game-container');
const playerCar = document.getElementById('player-car');
const scoreDisplay = document.getElementById('score');
const levelDisplay = document.getElementById('level');
const gameOverDisplay = document.getElementById('game-over');
const restartButton = document.getElementById('restart-btn');
const leftButton = document.getElementById('left-btn');
const rightButton = document.getElementById('right-btn');

const moveSound = document.getElementById('move-sound');
const coinSound = document.getElementById('coin-sound');
const collisionSound = document.getElementById('collision-sound');
const backgroundMusic = document.getElementById('background-music');

const containerWidth = gameContainer.offsetWidth;
const laneWidth = containerWidth / 3;
let playerLane = 1;
let score = 0;
let level = 1;
let enemySpeed = 4;
let gameRunning = true;

const enemyCars = [];
const coins = [];

backgroundMusic.volume = 0.3;
backgroundMusic.play().catch(e => console.log("Audio autoplay bloqueado"));

function setPlayerPosition() {
  const pos = laneWidth * playerLane + laneWidth / 2 - 25;
  playerCar.style.left = `${pos}px`;
}

function createEnemyCar() {
  const lane = Math.floor(Math.random() * 3);
  const enemy = document.createElement('img');
  enemy.src = 'img/enemy-car.svg';
  enemy.classList.add('enemy-car');
  const x = laneWidth * lane + laneWidth / 2 - 25;
  enemy.style.left = `${x}px`;
  enemy.style.top = '-120px';
  gameContainer.appendChild(enemy);
  enemyCars.push({ element: enemy, lane });
}

function createCoin() {
  const lane = Math.floor(Math.random() * 3);
  const coin = document.createElement('div');
  coin.classList.add('coin');
  const x = laneWidth * lane + laneWidth / 2 - 15;
  coin.style.left = `${x}px`;
  coin.style.top = '-50px';
  gameContainer.appendChild(coin);
  coins.push({ element: coin, lane });
}

function moveEnemies() {
  enemyCars.forEach((enemy, i) => {
    let top = parseInt(enemy.element.style.top) + enemySpeed;
    enemy.element.style.top = `${top}px`;

    if (enemy.lane === playerLane && top >= 520 && top <= 620) {
      collisionSound.play();
      endGame();
    }

    if (top > 640) {
      gameContainer.removeChild(enemy.element);
      enemyCars.splice(i, 1);
      score += 10;
      updateScore();
    }
  });
}

function moveCoins() {
  coins.forEach((coin, i) => {
    let top = parseInt(coin.element.style.top) + enemySpeed;
    coin.element.style.top = `${top}px`;

    if (coin.lane === playerLane && top >= 520 && top <= 580) {
      coinSound.play();
      gameContainer.removeChild(coin.element);
      coins.splice(i, 1);
      score += 20;
      updateScore();
    }

    if (top > 640) {
      gameContainer.removeChild(coin.element);
      coins.splice(i, 1);
    }
  });
}

function updateScore() {
  scoreDisplay.textContent = `Puntaje: ${score}`;
  if (score >= level * 100) {
    level++;
    levelDisplay.textContent = `Nivel: ${level}`;
    enemySpeed += 1;
  }
}

function endGame() {
  gameRunning = false;
  gameOverDisplay.style.display = 'block';
  backgroundMusic.pause();
}

function restartGame() {
  gameRunning = true;
  score = 0;
  level = 1;
  enemySpeed = 4;
  scoreDisplay.textContent = "Puntaje: 0";
  levelDisplay.textContent = "Nivel: 1";
  enemyCars.forEach(e => e.element.remove());
  coins.forEach(c => c.element.remove());
  enemyCars.length = 0;
  coins.length = 0;
  playerLane = 1;
  setPlayerPosition();
  gameOverDisplay.style.display = 'none';
  backgroundMusic.play();
  gameLoop();
}

function movePlayer(direction) {
  moveSound.play();
  if (direction === 'left' && playerLane > 0) playerLane--;
  if (direction === 'right' && playerLane < 2) playerLane++;
  setPlayerPosition();
}

leftButton.onclick = () => movePlayer('left');
rightButton.onclick = () => movePlayer('right');
restartButton.onclick = restartGame;

function gameLoop() {
  if (!gameRunning) return;
  if (Math.random() < 0.025) createEnemyCar();
  if (Math.random() < 0.01) createCoin();
  moveEnemies();
  moveCoins();
  requestAnimationFrame(gameLoop);
}

setPlayerPosition();
gameLoop();