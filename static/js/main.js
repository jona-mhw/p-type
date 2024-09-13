console.log("Juego R-Type cargando...");

window.onload = function() {
    console.log("Página cargada completamente");
    document.getElementById('loading-message').textContent = "¡Juego cargado!";
    document.getElementById('game-canvas').style.display = 'block';
    
    // Iniciar el juego
    startGame();
}
