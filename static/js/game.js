// Código principal del juego R-Type

let score = 0;

function gameLoop() {
    // Lógica principal del juego
    console.log("Game loop running");
    updateScore();
    // Aquí irían otras actualizaciones del juego
}

function updateScore() {
    score += 1;
    console.log("Puntuación actual: " + score);
}

function resetGame() {
    score = 0;
    console.log("Juego reiniciado. Puntuación: " + score);
}

// Iniciar el juego
function startGame() {
    console.log("Iniciando el juego R-Type");
    resetGame();
    // Aquí se inicializarían otros elementos del juego
    setInterval(gameLoop, 1000); // Ejecuta gameLoop cada segundo
}
