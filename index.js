const clearButton = document.querySelector("#clear-btn");
const container = document.querySelector(".container");
const result = document.querySelector("#result");

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let isDrawing = false;

canvas.addEventListener("mousedown", start);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stop);

clearButton.addEventListener("click", clearCanvas);

function start(e) {
  isDrawing = true;
  draw(e);
}

function draw({ clientX: x, clientY: y }) {
  if (!isDrawing) return;
  ctx.lineWidth = 18;
  ctx.lineCap = "round";

  x -= this.offsetLeft;
  y -= this.offsetTop;
  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x, y);
}

function stop() {
  isDrawing = false;
  ctx.beginPath();
  classifier.classify(document.querySelector("canvas"), gotResults);
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

window.addEventListener("resize", resizeCanvas);

function resizeCanvas() {
  let rect = canvas.parentNode.getBoundingClientRect();
  canvas.width = rect.width * 0.6;
  canvas.height = rect.height;
  // canvas.width = window.innerWidth - 100;
  canvas.height = 500;
}

resizeCanvas();

const classifier = ml5.imageClassifier("DoodleNet", modelLoaded);

function modelLoaded() {
  classifier.classify(canvas, gotResults);
}

function gotResults(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  console.log(results);
  result.textContent = results[0].label;
}
