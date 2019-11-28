/**
* Funcions for draw in Canvas - HTML5
* @author micaellgoms 
*/

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var pathClicks = [];

let pPoint = false;
let pLine = false;
let pPolygon = false;

let polygon = false;
let line = false;
let bezier = false;
let circle = false;

let translate = false;
let rotate = false;
let escale = false;

let enable_hull = true;
let enable_voronoi = true;
let enable_delaunay = true;
let enable_draw = true;
let enable_real = false;
let witdthPoint = 2;
let tol = 10;

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
  line = true;
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
function drawCircle(){
  circle = true;
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
  polygon = true;
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

/*
 * Draw rectangle in canvas
 * @param color and array with (x, y) and base, height
 */
function drawBezier(){
  bezier = true;
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
  polygon = false;
  line = false;
  circle = false;
  bezier = false;
  pPoint = false;
  pLine = false;
  pPolygon = false;
  translate = false;
  rotate = false;
  escale = false;
  ctx.strokeStyle = '#000000';
  document.getElementById('real-polygon').style.backgroundColor = "#666";
  location.reload();

}

function clearScreen(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

/*
 * Events
 */
function mouseLeftClick(event){
  var positionLastClick = getMousePosition(event);
  if(enable_draw) pathClicks.push(positionLastClick);

  if(enable_draw){
    let x = positionLastClick[0];
    let y = positionLastClick[1];

    ctx.fillStyle = '#E84A5F';
    drawPoint(x, y);
  }

  if(enable_real){
    drawPolygonRealTime();
  } 

  if(translate){
    clearScreen();
    ctx.save();
    ctx.translate(positionLastClick[0], positionLastClick[1]);
    
    if(polygon) drawPolygon();
    else if(line) drawLine();
    else if(circle) drawCircle();
    else if(bezier) drawBezier();
    else {
      for(let i=0; i<pathClicks.length; i++){
        drawPoint(pathClicks[i][0], pathClicks[i][1]);
      }
    }
    ctx.restore();
    translate = false;
  }

  if(rotate){
    clearScreen();
    ctx.save();
    ctx.rotate(Math.PI/4);
    
    if(polygon) drawPolygon();
    else if(line) drawLine();
    else if(circle) drawCircle();
    else if(bezier) drawBezier();
    else {
      for(let i=0; i<pathClicks.length; i++){
        drawPoint(pathClicks[i][0], pathClicks[i][1]);
      }
    }
    ctx.restore();
    rotate = false;
  }

  if(escale){
    clearScreen();
    ctx.save();
    ctx.scale(1.5,1.5);
    
    if(polygon) drawPolygon();
    else if(line) drawLine();
    else if(circle) drawCircle();
    else if(bezier) drawBezier();
    else {
      for(let i=0; i<pathClicks.length; i++){
        drawPoint(pathClicks[i][0], pathClicks[i][1]);
      }
    }
    ctx.restore();
    escale = false;
  }

  if(pPoint){
    for(let i=0; i<pathClicks.length; i++){
      if(pickPonto(positionLastClick[0], positionLastClick[1], tol, pathClicks[i][0], pathClicks[i][1])){
        // alert("Point selected!!!!");
        ctx.strokeStyle = '#FF0000';
        ctx.arc(pathClicks[i][0]+1, pathClicks[i][1]+1, 4, 0, 2 * Math.PI);
        // ctx.closePath();
        ctx.stroke();
        break;
      }
    }
  }

  if(pLine){
    // pickLine(x0, y0, x1, y1, cx, cy, tol)
    for(let i=0; i<(pathClicks.length-1); i++){
      if(pickLine(pathClicks[i][0], pathClicks[i][1], pathClicks[i+1][0], pathClicks[i+1][1], positionLastClick[0], positionLastClick[1], tol)){
        console.log('pickLine!');
        ctx.strokeStyle = '#FF0000';
        drawLine(); 
      }
    }
  }

  if(pPolygon){
    if(pickPoligono(positionLastClick[0], positionLastClick[1], pathClicks)){
      console.log('inside Polygon!');
      ctx.strokeStyle = '#FF0000';
      drawPolygon(); 
    }
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

function translation(){
  if(!pathClicks.length < 1){
    enable_draw = false;
    translate = true;
    alert("Click para transladar\n lembrando que será o ponto (0,0) translado para o ponto desejao");
  } else {
    alert("Não há nada desenhado");
  }
}

function rotation(){
  if(!pathClicks.length < 1){
    enable_draw = false;
    rotate = true;
    alert("Click para rotacionar 45º em X");
  } else {
    alert("Não há nada desenhado");
  }
}

function scale(){
  if(!pathClicks.length < 1){
    enable_draw = false;
    escale = true;
    alert("Click para escalar");
  } else {
    alert("Não há nada desenhado");
  }
}

// Selection manage
function selection(option){
  if(!pathClicks.length < 1){
    if (option === "point"){
      alert("pickPoint selecionado!\nclick para selecionar");
      pPoint = true;
      enable_draw = false;
    } else if (option === "line") {
      alert("pickLine selecionado!\nclick para selecionar");
      pLine = true;
      enable_draw = false;
    } else if (option === "polygon") {
      alert("pickPolygon selecionado!\nclick para selecionar");
      pPolygon = true;
      enable_draw = false;
    }

  } else {
    alert("não há nada desenhado\n\nDesenhe pontos para usar o pickPonto\nDesenhe Linhas para usar o pickLine\nDesenhe um poligono para usar pickPolygon");
  }
}

/**
 *  PICK - FUNCTIONS
 */

function pickPonto(x1, y1, d, x2, y2){
  if( ((x2 <= (x1 + d)) && (x2 >= (x1 - d))) && ((y2 <= (y1 + d)) && (y2 >= (y1 - d))) ){
      // console.log("pick");
      return true;
  }

  return false;
}

function pickPoligono(mx, my,vetor_pontos_obj) {
  let ni = 0;
  let fst = vetor_pontos_obj.length -1;
  let xc;
  let p1, p2;

  for (let i = 0; i <vetor_pontos_obj.length; i++) {
      p1 = vetor_pontos_obj[i];
      p2 = vetor_pontos_obj[fst];

      if (!(p1[1] == p2[1]) && !((p1[1] > my) && (p2[1] > my)) &&
          !((p1[1] < my) && (p2[1] < my)) && !((p1[0] < mx) && (p2[0] < mx))) {
          if (p1[1] == my) {
              if ((p1[0] > mx) && (p2[1] > my))
                  ni++;
          } else {
              if (p2[1] == my) {
                  if ((p2[0] > mx) && (p1[1] > my))
                      ni++;
              } else {
                  if ((p1[0] > mx) && (p2[0] > mx)) {
                      ni++;
                  } else {
                      let dx = p1[0] - p2[0];
                      xc = p1[0];
                      if (dx != 0) {
                          xc += (my - p1[1]) * dx / (p1[1] - p2[1]);
                          if (xc > mx)
                              ni++;
                      }
                  }
              }
          }
      }
      fst = i;
  }
  return (ni%2!=0);
}

function binCode(x, y, xmin, xmax, ymin, ymax) {
  var cod = [0, 0, 0, 0];
  if (x < xmin)
      cod[0] = 1;
  if (x > xmax)
      cod[1] = 1;
  if (y > ymax)
      cod[2] = 1;
  if (y < ymin)
      cod[3] = 1;
  return cod;
}

// c -> mouse coordinate
function pickLine(x0, y0, x1, y1, cx, cy, tol) {
  var j;
  var cod0 = [];
  var cod1 = [];
  var xmin, xmax, ymin, ymax;

  xmin = cx - tol;
  xmax = cx + tol;
  ymin = cy - tol;
  ymax = cy + tol;

  cod1 = binCode(x1, y1, xmin, xmax, ymin, ymax);

  do {
      cod0 = binCode(x0, y0, xmin, xmax, ymin, ymax);

      for (j = 0; j < 4; j++) {
          if (cod0[j] && cod1[j]) {
              break;
          }
      }
      if (j != 4) {
          break;
      }
      if (cod0[0]) {
          y0 += (xmin - x0) * (y1 - y0) / (x1 - x0);
          x0 = xmin;
      }
      else if (cod0[1]) {
          y0 += (xmax - x0) * (y1 - y0) / (x1 - x0);
          x0 = xmax;
      }
      else if (cod0[2]) {
          x0 += (ymin - y0) * (x1 - x0) / (y1 - y0);
          y0 = ymin;
      }
      else if (cod0[3]) {
          x0 += (ymax - y0) * (x1 - x0) / (y1 - y0);
          y0 = ymax;
      }
      else {
          return true;
      }
  } while (1);
  return false;
}

// Geometria Computacional
function generate(){
  if(enable_draw){
    // alert('Agora será desenhado os pontos no Canvas...');

    for (let i = 0; i < 100; i++) {
      coordinates = [];
      coordinates[0] = Math.floor((Math.random() * 550) + 50);
      coordinates[1] = Math.floor((Math.random() * 450) + 50);
      pathClicks.push(coordinates);
    }

    for (let i = 0; i < pathClicks.length; i++) {
      drawPoint(pathClicks[i][0], pathClicks[i][1]);
    }

  } else {
    alert('Reset to Draw!');
  }
}

// Fecho Convexo
function findHull(){
  if(enable_hull && enable_draw){
    if(pathClicks.length >= 3){
      var hull = d3.polygonHull(pathClicks);

      ctx.strokeStyle = '#FF0000';
      ctx.beginPath();
      ctx.moveTo(hull[0][0], hull[0][1]);
      hull.forEach(getElement);
      ctx.closePath();
      ctx.stroke();
  
      enable_hull = false;
      enable_draw = false;
    } else {
      alert('Need 3 points!');
    }
  } else {
    alert('Reset to Draw!');
  }
}

// voronoi
function voronoi(){
  if(enable_voronoi){
    if(pathClicks.length >= 3){
      var voronoi = d3.voronoi();
      voronoi.extent([[0, 0], [canvas.width, canvas.height]]);
      
      var polygon_voronoi = voronoi(pathClicks).polygons();

      ctx.strokeStyle = '#0000FF';
      ctx.beginPath();
      for(let i=0; i<polygon_voronoi.length; i++){
        ctx.moveTo(polygon_voronoi[i][0][0], polygon_voronoi[i][0][1]);
        for(let j=0; j<polygon_voronoi[i].length; j++){
          ctx.lineTo(polygon_voronoi[i][j][0], polygon_voronoi[i][j][1]);
        }
      }
      ctx.closePath();
      ctx.stroke();

      enable_voronoi = false;
      enable_draw = false;
    } else {
      alert('Need 3 points!');
    }
  } else {
    alert('Reset to Draw!');
  }
}

// delaunay
function delaunay(){
  if(enable_delaunay && enable_draw){
    if(pathClicks.length >= 3){
      var voronoi = d3.voronoi();
      voronoi.extent([[0, 0], [canvas.width, canvas.height]]);
      
      try {
        var polygon_delaunay = voronoi(pathClicks).triangles();

        console.log(polygon_delaunay);

        ctx.strokeStyle = '#00FF00';
        ctx.beginPath();
        for(let i=0; i<polygon_delaunay.length; i++){
          ctx.moveTo(polygon_delaunay[i][0][0], polygon_delaunay[i][0][1]);
          for(let j=0; j<polygon_delaunay[i].length; j++){
            ctx.lineTo(polygon_delaunay[i][j][0], polygon_delaunay[i][j][1]);
          }
          ctx.lineTo(polygon_delaunay[i][0][0], polygon_delaunay[i][0][1]);
        }
        ctx.closePath();
        ctx.stroke();
  
        enable_delaunay = false;
        enable_draw = false;
      } catch(e){
        alert('tente novamente');
        console.error(e);
      }

    } else {
      alert('Need 3 points!');
    }
  } else {
    alert('Reset to Draw!');
  }
}
