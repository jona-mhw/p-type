function endGame() {
    clearInterval(gameLoop);
    document.getElementById('initialsModal').style.display = 'block';
    document.getElementById('restartBtn').classList.remove('hidden');
}

function submitScore() {
    const initials = document.getElementById('initialsInput').value.toUpperCase();
    if (initials.length > 0) {
        // Aquí enviarías el puntaje al servidor
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

document.getElementById('submitInitials').addEventListener('click', submitScore);
document.getElementById('restartBtn').addEventListener('click', startGame);

// Cargar puntuaciones al iniciar la página
loadHighScores();
