const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");

const TAMANIO_CELDA = 25;

const serpiente = [
  { x: 12, y: 12 },
  { x: 11, y: 12 },
  { x: 10, y: 12 },
  { x: 9, y: 12 }
];

let intervaloSerpiente = null;
let direccionActual = "derecha";
let comida = { x: 5, y: 5 };
let puntajeActual = 0;

dibujarTodo();

function limpiarCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function dibujarTablero() {
  ctx.strokeStyle = "rgba(56, 189, 248, 0.15)"; 
  ctx.lineWidth = 1;

  for (let x = 0; x <= canvas.width; x += TAMANIO_CELDA) {
    ctx.beginPath();
    ctx.moveTo(x, 0);              
    ctx.lineTo(x, canvas.height); 
    ctx.stroke();                 
  }

  for (let y = 0; y <= canvas.height; y += TAMANIO_CELDA) {
    ctx.beginPath();
    ctx.moveTo(0, y);             
    ctx.lineTo(canvas.width, y);  
    ctx.stroke();                 
  }
}

function pintarParte(lineaX, lineaY, tipo) {
  const posX = lineaX * TAMANIO_CELDA;
  const posY = lineaY * TAMANIO_CELDA;

  if (tipo === "cabeza") {
    ctx.fillStyle = "#38bdf8";
    ctx.strokeStyle = "#ffffff";
  } else if (tipo === "comida") {
    ctx.fillStyle = "#ef4444";
    ctx.strokeStyle = "#fca5a5";
  } else {
    ctx.fillStyle = "#22c55e";
    ctx.strokeStyle = "#052e16";
  }

  ctx.fillRect(posX, posY, TAMANIO_CELDA, TAMANIO_CELDA);
  ctx.lineWidth = 2;
  ctx.strokeRect(posX, posY, TAMANIO_CELDA, TAMANIO_CELDA);
}

function pintarSerpiente() {
  for (let i = 0; i < serpiente.length; i++) {
    const tipo = (i === 0) ? "cabeza" : "cuerpo";
    pintarParte(serpiente[i].x, serpiente[i].y, tipo);
  }
}

function pintarComida() {
  pintarParte(comida.x, comida.y, "comida");
}

function generarComida() {
  const columnas = canvas.width / TAMANIO_CELDA;
  const filas = canvas.height / TAMANIO_CELDA;
  comida.x = Math.floor(Math.random() * columnas);
  comida.y = Math.floor(Math.random() * filas);
}

function moverDerecha() {
  const cabeza = serpiente[0];
  const nuevaCabeza = { x: cabeza.x + 1, y: cabeza.y };
  serpiente.unshift(nuevaCabeza);
  if (!atrapaComida()) {
    serpiente.pop();
  } else {
    procesarComida();
  }
}

function moverIzquierda() {
  const cabeza = serpiente[0];
  const nuevaCabeza = { x: cabeza.x - 1, y: cabeza.y };
  serpiente.unshift(nuevaCabeza);
  if (!atrapaComida()) {
    serpiente.pop();
  } else {
    procesarComida();
  }
}

function moverArriba() {
  const cabeza = serpiente[0];
  const nuevaCabeza = { x: cabeza.x, y: cabeza.y - 1 };
  serpiente.unshift(nuevaCabeza);
  if (!atrapaComida()) {
    serpiente.pop();
  } else {
    procesarComida();
  }
}

function moverAbajo() {
  const cabeza = serpiente[0];
  const nuevaCabeza = { x: cabeza.x, y: cabeza.y + 1 };
  serpiente.unshift(nuevaCabeza);
  if (!atrapaComida()) {
    serpiente.pop();
  } else {
    procesarComida();
  }
}

function cambiarDireccion(direccion) {
  if (direccion === "arriba" && direccionActual !== "abajo") direccionActual = "arriba";
  if (direccion === "abajo" && direccionActual !== "arriba") direccionActual = "abajo";
  if (direccion === "izquierda" && direccionActual !== "derecha") direccionActual = "izquierda";
  if (direccion === "derecha" && direccionActual !== "izquierda") direccionActual = "derecha";
}

function moverSerpiente() {
  if (direccionActual === "derecha") moverDerecha();
  else if (direccionActual === "izquierda") moverIzquierda();
  else if (direccionActual === "arriba") moverArriba();
  else if (direccionActual === "abajo") moverAbajo();
  
  dibujarTodo();
}

function iniciarJuego() {
  if (!intervaloSerpiente) {
    intervaloSerpiente = setInterval(moverSerpiente, 150);
    document.getElementById("estado").innerText = "Jugando";
    document.getElementById("mensaje").innerText = "Sistema en ejecución.";
  }
}

function pausarJuego() {
  if (intervaloSerpiente) {
    clearInterval(intervaloSerpiente);
    intervaloSerpiente = null;
    document.getElementById("estado").innerText = "Pausado";
    document.getElementById("mensaje").innerText = "Sistema en pausa.";
  }
}

function reiniciarJuego() {
  pausarJuego();
  serpiente.length = 0;
  serpiente.push(
    { x: 12, y: 12 },
    { x: 11, y: 12 },
    { x: 10, y: 12 },
    { x: 9, y: 12 }
  );
  direccionActual = "derecha";
  puntajeActual = 0;
  document.getElementById("puntaje").innerText = "0";
  generarComida();
  document.getElementById("estado").innerText = "Listo";
  document.getElementById("mensaje").innerText = "Presiona iniciar para comenzar.";
  dibujarTodo();
}

function atrapaComida() {
  const cabeza = serpiente[0];
  return cabeza.x === comida.x && cabeza.y === comida.y;
}

function procesarComida() {
  puntajeActual += 10;
  document.getElementById("puntaje").innerText = puntajeActual;
  generarComida();
}

function dibujarTodo() {
  limpiarCanvas();
  dibujarTablero();
  pintarComida();
  pintarSerpiente();
}
