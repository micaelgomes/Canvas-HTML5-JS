/**
* Funcions for draw in Canvas - HTML5
* @author micaellgoms 
*/


var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var pathClicks = [];

let enable_draw = true;
let enable_real = false;
let witdthPoint = 2;

document.getElementById('canvas').addEventListener('click', mouseLeftClick, false);

/*
 * Draw rectangle in canvas
 * @param color and array with (x, y) and base, height
 */
function drawBackground() {
  ctx.fillStyle = '#E84A5F';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

/*
 * Draw point in canvas
 * @param color and array with (x, y) and base, height
 */
function drawPoint(mouseX, mouseY){
  ctx.fillStyle = '#000';
  ctx.fillRect(mouseX, mouseY, witdthPoint, witdthPoint);
}

/*
 * Draw rectangle in canvas
 * @param color and array with (x, y) and base, height
 */
function drawLine(){
  clearScreen();
  ctx.beginPath();
  ctx.moveTo(pathClicks[0][0], pathClicks[0][1]);
  pathClicks.forEach(getElement);
  ctx.stroke();
  enable_draw = false;
}

/*
 * Draw rectangle in canvas
 * @param color and array with (x, y) and base, height
 */
function drawCircle(mouseX, mouseY){
  // clearScreen();
  ctx.beginPath();
  ctx.arc(pathClicks[0][0], pathClicks[0][1], getRadius(), 0, 2*Math.PI);
  ctx.stroke();
  enable_draw = false;
}

function getRadius(){
  let radius;
  radius = Math.sqrt(Math.pow((pathClicks[1][0]-pathClicks[0][0]),2)+Math.pow((pathClicks[1][1]-pathClicks[1][1]),2));
  return radius;
}

/*
 * Draw rectangle in canvas
 * @param color and array with (x, y) and base, height
 */
function drawPolygon(){
  clearScreen();
  ctx.beginPath();
  ctx.moveTo(pathClicks[0][0], pathClicks[0][1]);
  pathClicks.forEach(getElement);
  ctx.closePath();
  ctx.stroke();
  enable_draw = false;
}

function hasInstersct(){
  let lengthPathClicks = pathClicks.length - 1;
  let diffX = pathClicks[lengthPathClicks][0] - pathClicks[0][0];
  let diffY = pathClicks[lengthPathClicks][1] - pathClicks[0][1];

  console.log("x: " + diffX + "| y: " + diffY);

  return true;
}

function drawPolygonRealTime(){
  var positionLastClick = getMousePosition(event);
  pathClicks.push(positionLastClick);
  
  if(pathClicks.length <= 2){
    let x = positionLastClick[0];
    let y = positionLastClick[1];

    drawPoint(x, y);
  } else if (pickPonto(positionLastClick[0], positionLastClick[1], 5, pathClicks[0][0], pathClicks[0][1])){
    clearScreen();
    ctx.beginPath();
    ctx.moveTo(pathClicks[0][0], pathClicks[0][1]);
    pathClicks.forEach(getElement);
    ctx.closePath();
    ctx.stroke();
    enable_real = false;
  } else {
    clearScreen();
    ctx.beginPath();
    ctx.moveTo(pathClicks[0][0], pathClicks[0][1]);
    pathClicks.forEach(getElement);
    ctx.stroke();
  }
}

function pickPonto(x1, y1, d, x2, y2){
  if( ((x2 <= (x1 + d)) && (x2 >= (x1 - d))) && ((y2 <= (y1 + d)) && (y2 >= (y1 - d))) ){
    console.log("pick");
    return true;
  }

  return false;
}

/*
 * Draw rectangle in canvas
 * @param color and array with (x, y) and base, height
 */
function drawBezier(){
  if(pathClicks.length >=4){
    clearScreen();
    ctx.beginPath();
    ctx.moveTo(pathClicks[0][0], pathClicks[0][1]);
    ctx.bezierCurveTo(pathClicks[1][0], pathClicks[1][1], pathClicks[2][0], pathClicks[2][1], pathClicks[3][0], pathClicks[3][1]);
    ctx.stroke();
  } else {
    alert('need 4 points!');
  }
}

/*
 * Draw rectangle in canvas
 * @param color and array with (x, y) and base, height
 */
function clearAll(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  pathClicks = [];
  enable_draw = true;
  document.getElementById('real-polygon').style.backgroundColor = "#666";
}

function clearScreen(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

/*
 * Events
 */
function mouseLeftClick(event){
  var positionLastClick = getMousePosition(event);
  pathClicks.push(positionLastClick);

  if(enable_draw){
    let x = positionLastClick[0];
    let y = positionLastClick[1];

    ctx.fillStyle = '#E84A5F';
    drawPoint(x, y);
  }

  if(enable_real){
    drawPolygonRealTime();
  } 
}

function mouseRightClick(event){}

function buttonLine(event){
  if(enable_draw){
    drawLine();
  } else {
    alert("Reset to Draw!");
  }
}

function buttonPolygon(event){
  if(enable_draw){
    if (pathClicks.length > 2) {
      if(hasInstersct()){
        drawPolygon();
      } else {
        alert("Invalid Polygon");  
      }
    } else {
      alert("Only 2 point");
    }
  } else {
    alert("Reset to Draw!");
  }
}

function buttonRPolygon(event){
  if(enable_draw){
    enable_draw = false;
    enable_real = true;

    document.getElementById('real-polygon').style.backgroundColor = "red";
    alert("this option allows you to draw in real time!");

  } else {
    alert("Reset to Draw!");
  }
}

function buttonCircle(event){
  if(enable_draw){
    drawCircle();
  } else {
    alert("Reset to Draw!");
  }
}

function buttonBezier(event){
  if(enable_draw){
    drawBezier();
  } else {
    alert("Reset to Draw!");
  }
}

function getElement(element){
  ctx.lineTo(element[0], element[1]);
}

function getMousePosition(event){
  var mouseX, mouseY;
  var rect = canvas.getBoundingClientRect();
    
    mouseX = event.clientX;
    mouseY = event.clientY;

    return [mouseX, mouseY];
}
