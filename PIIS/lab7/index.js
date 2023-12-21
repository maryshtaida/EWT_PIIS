const paper = document.querySelector(".paper");
const cordinates = [];
const svgns = "http://www.w3.org/2000/svg";
const buttons = document.querySelectorAll("button");
let currentFigure;

let selectedFigure = "rect";

function addFigure(e) {
  const figure = document.createElementNS(svgns, selectedFigure);
  cordinates[0] = e.clientY;
  cordinates[1] = e.clientX;
  figure.setAttribute("fill", "pink");
  if (selectedFigure === "rect") {
    figure.setAttribute("y", cordinates[0]);
    figure.setAttribute("x", cordinates[1]);
  } else {
    figure.setAttribute("cy", cordinates[0]);
    figure.setAttribute("cx", cordinates[1]);
  }
  paper.append(figure);
  currentFigure = figure;
  paper.addEventListener(
    "mousemove",
    selectedFigure === "rect" ? trackRectangleSize : trackCircleSize
  );
}

function trackRectangleSize(e) {
  const width = Math.abs(e.clientX - cordinates[1]);
  const height = Math.abs(e.clientY - cordinates[0]);
  const rect = currentFigure;
  rect.setAttribute("width", width);
  rect.setAttribute("height", height);
  if (e.clientX - cordinates[1] < 0) rect.setAttribute("x", e.clientX);
  if (e.clientY - cordinates[0] < 0) rect.setAttribute("y", e.clientY);
}

function trackCircleSize(e) {
  const width = Math.abs(e.clientX - cordinates[1]) ** 2;
  const height = Math.abs(e.clientY - cordinates[0]) ** 2;
  const circle = currentFigure;
  circle.setAttribute("r", Math.sqrt(width + height));
}

paper.addEventListener("mousedown", addFigure);
paper.addEventListener("mouseup", () => {
  cordinates.length = 0;
  paper.removeEventListener(
    "mousemove",
    selectedFigure === "rect" ? trackRectangleSize : trackCircleSize
  );
});
console.log(buttons);
buttons.forEach((button) => {
  button.addEventListener("click", (e) => (selectedFigure = e.target.id));
});
