
var r, g, b, a, randomSaturatedColors, randomUnsaturatedColors;
var x;
var y;
var PreviousXPosition;
var PreviousYPosition;
//let lapse = 0;    // mouse timer


var slowDraw = false
var step = 150;
var overallLength
var piece
var framesPerSide = 20

function setup() {
    createCanvas(windowWidth, windowHeight);
    x = width / 2;
    y = height / 2;
    background(250);
    frameRate(10)
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
    if (slowDraw) {
        slowDrawSquare(PreviousXPosition, PreviousYPosition, step, framesPerSide);
    } else {
        setupForNextSquare();
    }
}

function setupForNextSquare() {
    PreviousXPosition = x;
    PreviousYPosition = y;
    r = random(50,150);
    g = random(255);
    b = random(50,200);
    a = random(50, 150);
    randomSaturatedColors = color(r, g, b);
    randomUnsaturatedColors = color(r, g, b, a);

    var stepDirection = random(1);

    if (stepDirection < 0.25 && x < width) {
        x += step;
    } else if (stepDirection < 0.5 && x > 0) {
        x -= step;
    } else if (stepDirection < 0.75 && y < height) {
        y += step;
    } else if (y > 0) {
        y -= step;
    }

    //fill(randomUnsaturatedColors);
    //noStroke();
    //circle(x, y, 40);
    stroke(randomUnsaturatedColors);
    setLineDash([5, 5]);
    strokeWeight(3);

    overallLength = 0
    piece = 0
    slowDraw = true
}

// Draws a square with corner at x,y and sides of length s.  Takes f frames to draw a side.
function slowDrawSquare(x, y, s, f) {
    itty = s / f
    piece += itty

    // draw the four sides of the square.  We redraw from the beginning of the side every time...
    if (overallLength < s) {
        xStart = x
        yStart = y
        xEnd = x + piece
        yEnd = y
    } else if (overallLength < 2*s) {
        xStart = x + s
        yStart = y
        xEnd = x + s
        yEnd = y + piece
    } else if (overallLength < 3*step) {
        xStart = x + s
        yStart = y + s
        xEnd = x + s - piece
        yEnd = y + s
    } else if (overallLength < 4*step) {
        xStart = x
        yStart = y + s
        xEnd = x
        yEnd = y + s - piece
    }
    line(xStart, yStart, xEnd, yEnd)

    overallLength += itty

    if (piece >= s) {
        piece = 0
    }
    if (overallLength >= 4*s) {
        slowDraw = false
    }
}

function setLineDash(list) {
    drawingContext.setLineDash(list);
}

//function mousePressed(){
// prevents mouse press from registering twice
// if (millis() - lapse > 500){
// save('pix.jpg');
// lapse = millis();
// }
//}
function mousePressed() {
  if (mouseX > 0 && mouseX < 100 && mouseY > 0 && mouseY < 100) {
    let fs = fullscreen();
    fullscreen(!fs);}
}
