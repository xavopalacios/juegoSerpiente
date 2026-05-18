// 1. Capturamos el canvas y su contexto de dibujo
const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");

// PASO 4: Constante para el tamaño de cada celda de la cuadrícula
const TAMANIO_CELDA = 25;

// Primera pintura del juego al cargar la página
dibujarTodo();

// =========================
// FUNCIONES DE DIBUJO
// =========================

function limpiarCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// PASO 5: Función dibujarTablero actualizada con rejilla completa
function dibujarTablero() {
  // Configuración estética: Línea tecnológica/cyberpunk (Cian sutil translúcido)
  ctx.strokeStyle = "rgba(56, 189, 248, 0.15)"; 
  ctx.lineWidth = 1; // Grosor de línea fino y profesional

  // PASO 9: Bucle 'for' para líneas verticales (Eje X)
  for (let x = 0; x <= canvas.width; x += TAMANIO_CELDA) {
    ctx.beginPath();
    ctx.moveTo(x, 0);              
    ctx.lineTo(x, canvas.height); 
    ctx.stroke();                 
  }

  // PASO 10: Bucle 'for' para líneas horizontales (Eje Y)
  // Avanza en el eje Y de 25 en 25 píxeles ocupando todo el ancho (canvas.width)
  for (let y = 0; y <= canvas.height; y += TAMANIO_CELDA) {
    ctx.beginPath();
    ctx.moveTo(0, y);             // Inicio izquierda: X en 0, Y actual
    ctx.lineTo(canvas.width, y);  // Fin derecha: X al final del canvas, Y actual
    ctx.stroke();                 // Dibuja la línea horizontal
  }
}

function dibujarTodo() {
  limpiarCanvas();
  // PASO 7: Invocar dibujarTablero desde dibujarTodo
  dibujarTablero();
}


