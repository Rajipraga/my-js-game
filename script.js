let score = 0;
let timeLeft = 30;
let gameInterval;
let isGameRunning = false;

const gameArea = document.getElementById('game-area');
const scoreElement = document.getElementById('score');
const timeElement = document.getElementById('time');
const gameOverScreen = document.getElementById('game-over');
const finalScoreElement = document.getElementById('final-score');
const playAgainButton = document.getElementById('play-again');

function createBalloon() {
    const balloon = document.createElement('div');
    balloon.className = 'balloon';
    
    // Random gradient colors for each balloon
    const colors = [
        'linear-gradient(135deg, #ff9999, #ff5555)',
        'linear-gradient(135deg, #99ff99, #55ff55)',
        'linear-gradient(135deg, #9999ff, #5555ff)',
        'linear-gradient(135deg, #ffff99, #ffff55)',
        'linear-gradient(135deg, #ff99ff, #ff55ff)'
    ];
    balloon.style.background = colors[Math.floor(Math.random() * colors.length)];
    
    // Add shine effect
    balloon.style.backgroundBlendMode = 'soft-light';
    
    // Random horizontal position
    const leftPosition = Math.random() * (gameArea.offsetWidth - 50);
    balloon.style.left = `${leftPosition}px`;
    
    balloon.addEventListener('click', () => {
        if (!isGameRunning) return;
        balloon.classList.add('pop');
        score++;
        scoreElement.textContent = score;
        
        // Add multiple star effects
        for (let i = 0; i < 5; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            
            // Random position around balloon
            const randomX = Math.random() * 40 - 20; // -20 to 20px
            const randomY = Math.random() * 40 - 20; // -20 to 20px
            
            // Convert left position from percentage to pixels
            const balloonLeft = parseFloat(balloon.style.left);
            star.style.left = `${balloonLeft + randomX}px`;
            star.style.top = `${balloon.offsetTop + randomY}px`;
            
            // Random size
            const scale = 0.5 + Math.random() * 1; // 0.5 to 1.5
            star.style.transform = `scale(${scale})`;
            
            gameArea.appendChild(star);
            
            // Remove star after animation
            setTimeout(() => {
                star.remove();
            }, 800);
        }
        
        setTimeout(() => {
            balloon.remove();
        }, 300);
    });
    
    gameArea.appendChild(balloon);
    
    // Remove balloon after animation
    setTimeout(() => {
        if (balloon.parentNode === gameArea) {
            balloon.remove();
        }
    }, 4000);
}

function startGame() {
    score = 0;
    timeLeft = 30;
    isGameRunning = true;
    
    scoreElement.textContent = score;
    timeElement.textContent = timeLeft;
    gameOverScreen.classList.add('hidden');
    
    // Clear any existing intervals
    clearInterval(gameInterval);
    
    // Start spawning balloons
    gameInterval = setInterval(() => {
        if (timeLeft > 0) {
            createBalloon();
        }
    }, 1000);
    
    // Start timer
    const timerInterval = setInterval(() => {
        timeLeft--;
        timeElement.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            clearInterval(gameInterval);
            endGame();
        }
    }, 1000);
}

function endGame() {
    isGameRunning = false;
    finalScoreElement.textContent = score;
    gameOverScreen.classList.remove('hidden');
}

playAgainButton.addEventListener('click', startGame);

// Start the game when the page loads
startGame();