const canvas = document.querySelector(".paper");
const ctx = canvas.getContext("2d");
const cordinates = [];
const buttons = document.querySelectorAll("button");
let currentFigure;

let selectedFigure = "rect";

function addFigure(e) {
  cordinates[0] = e.clientY;
  cordinates[1] = e.clientX;
  ctx.fillStyle = "purple";
  if (selectedFigure === "rect") {
    ctx.fillRect(cordinates[1], cordinates[0], 0, 0);
    currentFigure = { x: cordinates[1], y: cordinates[0], width: 0, height: 0 };
  } else {
    ctx.beginPath();
    ctx.arc(cordinates[1], cordinates[0], 0, 0, 2 * Math.PI);
    ctx.fill();
    currentFigure = { x: cordinates[1], y: cordinates[0], r: 0 };
  }

  canvas.addEventListener(
    "mousemove",
    selectedFigure === "rect" ? trackRectangleSize : trackCircleSize
  );
}

function drawRect(element) {
  currentFigure = element;
  ctx.fillStyle = "purple";
  ctx.fillRect(element.x, element.y, element.width, element.height);
}
function drawCircle(element) {
  currentFigure = element;
  ctx.beginPath();
  ctx.fillStyle = "purple";
  ctx.arc(element.x, element.y, element.r, 0, 2 * Math.PI);
  ctx.fill();
  ctx.closePath();
}

function deleteResizedFigure() {
  if (selectedFigure === "rect") {
    ctx.clearRect(
      currentFigure.x,
      currentFigure.y,
      currentFigure.width,
      currentFigure.height
    );
  } else if (selectedFigure === "circle") {
    ctx.save();
    ctx.beginPath();
    ctx.arc(
      currentFigure.x,
      currentFigure.y,
      currentFigure.r + 1,
      0,
      Math.PI * 2
    );
    ctx.closePath();
    ctx.fillStyle = "white"; 
    ctx.fill();
    ctx.restore();
  }
}

function trackRectangleSize(e) {
  deleteResizedFigure();
  const width = Math.abs(e.clientX - cordinates[1]);
  const height = Math.abs(e.clientY - cordinates[0]);
  if (e.clientX - cordinates[1] > 0 && e.clientY - cordinates[0] > 0)
    drawRect({
      width: width,
      height: height,
      x: cordinates[1],
      y: cordinates[0],
    });
  if (e.clientX - cordinates[1] < 0 && e.clientY - cordinates[0] < 0)
    drawRect({
      width: width,
      height: height,
      x: e.clientX,
      y: e.clientY,
    });
  if (e.clientX - cordinates[1] < 0 && e.clientY - cordinates[0] > 0)
    drawRect({ width: width, height: height, x: e.clientX, y: cordinates[0] });
  if (e.clientY - cordinates[0] < 0 && e.clientX - cordinates[1] > 0)
    drawRect({ width: width, height: height, x: cordinates[1], y: e.clientY });
}

function trackCircleSize(e) {
  deleteResizedFigure();
  const width = Math.abs(e.clientX - cordinates[1]) ** 2;
  const height = Math.abs(e.clientY - cordinates[0]) ** 2;
  drawCircle({
    r: Math.sqrt(width + height),
    x: cordinates[1],
    y: cordinates[0],
  });
}

canvas.addEventListener("mousedown", addFigure);
canvas.addEventListener("mouseup", () => {
  cordinates.length = 0;
  canvas.removeEventListener(
    "mousemove",
    selectedFigure === "rect" ? trackRectangleSize : trackCircleSize
  );
});
buttons.forEach((button) => {
  button.addEventListener("click", (e) => (selectedFigure = e.target.id));
});
