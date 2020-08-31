let canvasWidth = 650;
let canvasHeight = 400;
let ctx; // hold canvas context
let allObjArray = [] // containing all objects; initialized as an empty array
let timingId; // identify timing event
let hVelocity; // horizontal velocity
let vVelocityStart; // vertical velocity displacement at start of inteval
let vVelocityEnd; // vertical velocity displacement at end of interval after gravity changes
let gravity = 2;
let iBallX = 15; // initial horizontal coordinate for ball
let iBallY = 295; // initial vertical coordinate for ball

let init = () => {
    ctx = document.getElementById('canvas').getContext('2d');
    drawAll(); // draw everything
}

function Ball(sX,sY,radius,styleString) {
    this.sX = sX;
    this.sY = sY;
    this.radius = radius;
    this.draw = drawBall;
    this.moveIt = moveBall;
    this.fillStyle = styleString;
}

function drawBall() {
    ctx.fillStyle = this.fillStyle;
    ctx.beginPath();
    ctx.arc(this.sX,this.sY,this.radius,0,Math.PI*2,true); // drawing a circle
    ctx.fill();
}

function moveBall(dX,dY) {
    this.sX += dX; // sY increments by dY
    this.sY += dY; // sY increments by sY
}

let cannonball = new Ball(iBallX,iBallY,10,"rgb(128,0,0)");

function Rectangle(sX,sY,sWidth,sHeight,styleString) {
    this.sX = sX;
    this.sY = sY;
    this.sWidth = sWidth;
    this.sHeight = sHeight;
    this.fillStyle = styleString;
    this.draw = drawRects; // draw the rectangles
    this.moveIt = moveBall; // moveIt sets up a method that can be invoked
}

function drawRects() {
    ctx.fillStyle = this.fillStyle; // fillStyle is set
    ctx.fillRect(this.sX,this.sY,this.sWidth,this.sHeight); // draw the rectangle
}

function moveRect(dX,dY) {
    this.sX += dX;
    this.sY += dY;
}

let target = new Rectangle(579.6,50,20,250,"rgb(0, 0, 0)");
let ground = new Rectangle(0,300,600,30,"rgb(0, 255, 255)");

allObjArray.push(target); // target added to array
allObjArray.push(ground); // ground added to array
allObjArray.push(cannonball); // cannonball added to array

function fire() {
    cannonball.sX = iBallX; // reposition ball in the x position
    cannonball.sY = iBallY; // reposition ball in the y position
    hVelocity = Number(document.form.hvelo.value); // set horizotal velocity from the form; make a number
    vVelocityStart = Number(document.form.vvelo.value); // set initial velocity from the form
    drawAll(); // draw everything
    timingId = setInterval(change, 150); // timing event begins
    return false; // prevent refresh of page
}

function drawAll() {
    ctx.clearRect(0,0,canvasWidth,canvasHeight);
    let x; // 'x' declared for the 'for' loop
    for(x=0;x<allObjArray.length;x++) { // for each item in the 'allObjArray'.....
        allObjArray[x].draw(); // invoke the object's 'draw()' method
    }
}

function change() {
    let dX = hVelocity; // dX set to horizonal velocity
    vVelocityEnd = vVelocityStart + gravity; // compute new vertical velocity by adding it
    let dY = (vVelocityStart + vVelocityEnd) * 0.5; // average velocity for the time interval is computed
    vVelocityStart = vVelocityEnd; // set old velocity to new velocity
    cannonball.moveIt(dX,dY); // ball moves at the computed amount
    let bX = cannonball.sX; // bx is set to simplify the 'if' statement
    let bY = cannonball.sY;
    /* 
        if the ball is within the target horizontally and vertically,
        stop the motion. 
    */
   if((bX >= target.sX) && (bX <= (target.sX + target.sWidth)) && 
      (bY >= target.sY) && (bY <= (target.sY + target.sHeight))) {
           clearInterval(timingId); // motion stops
       }
   // if the ball is beyond the ground, stop the motion    
   if(bY >= ground.sY) {
        clearInterval(timingId);
   }
   drawAll(); // draw eveything 
}