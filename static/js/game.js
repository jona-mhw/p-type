function endGame() {
    clearInterval(gameLoop);
    alert(`¡Juego terminado! Tu puntuación final es: ${score}`);
    // Aquí puedes añadir lógica adicional para guardar la puntuación, mostrar un modal, etc.
}
