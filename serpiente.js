// 1. Capturamos el canvas y su contexto de dibujo
const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");

// CONSTANTES BASE
const TAMANIO_CELDA = 25;


const serpiente = [
  { x: 12, y: 12 }, // Cabeza
  { x: 11, y: 12 }, // Cuerpo parte 1
  { x: 10, y: 12 }, // Cuerpo parte 2
  { x: 9, y: 12 }   // Cuerpo parte 3
];


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


function pintarParte(lineaX, lineaY, esCabeza = false) {
 
  const posX = lineaX * TAMANIO_CELDA;
  const posY = lineaY * TAMANIO_CELDA;

  
  if (esCabeza) {
    ctx.fillStyle = "#38bdf8";      
    ctx.strokeStyle = "#ffffff";    
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
    
    const esCabeza = (i === 0);
    
    
    pintarParte(serpiente[i].x, serpiente[i].y, esCabeza);
  }
}

function dibujarTodo() {
  limpiarCanvas();
  dibujarTablero();
  
  
  pintarSerpiente();
}


