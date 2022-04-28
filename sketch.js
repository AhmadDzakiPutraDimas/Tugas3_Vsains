let Planet_pusat 
let satelit1
let satelit2
let G = 100
function setup() {
  createCanvas(windowWidth,windowHeight);
  Planet_pusat = new Body(150,createVector(0,0),createVector(0,0))
  
  //satelit1  posisi
  let r1 = (Planet_pusat.r,min(windowWidth/4, windowHeight/4))
  let theta1 = random(TWO_PI)
  let planetPos1 = createVector(r1*cos(theta1), r1*sin(theta1))
  
  //satelit2  posisi
  let r2 = (Planet_pusat.r,min(windowWidth/2, windowHeight/2))
  let theta2 = random(TWO_PI)
  let planetPos2 = createVector(r2*cos(theta2), r2*sin(theta2))
  
  
  //satelit1 velocity
  let planetVel1 = planetPos1.copy()
  planetVel1.rotate(HALF_PI)
  planetVel1.setMag( sqrt(G*Planet_pusat.mass/planetPos1.mag()))
  satelit1 = new Body(25, planetPos1, planetVel1)
  
  //satelit2 velocity
  let planetVel2 = planetPos2.copy()
  planetVel2.rotate(HALF_PI)
  planetVel2.setMag( sqrt(G*Planet_pusat.mass/planetPos2.mag()))
  satelit2 = new Body(25, planetPos2, planetVel2)
  
}

function draw() {
  translate(width/2, height/2)
  background(100);
  Planet_pusat.attract(satelit1)
  Planet_pusat.attract(satelit2)
  Planet_pusat.show()
  satelit1.update()
  satelit2.update()
  satelit1.show()
  satelit2.show()
}

function Body(_mass, _pos, _vel){
  this.mass = _mass
  this.pos = _pos
  this.vel = _vel
  this.r = this.mass
  
  this.show = function() {
    fill(205); noStroke();
    ellipse(this.pos.x, this.pos.y, this.r, this.r)
  }
  
  this.update = function(){
    // update posisi
    this.pos.x += this.vel.x
    this.pos.y += this.vel.y
  }
  this.applyForce = function(f) {
    this.vel.x += f.x / this.mass
    this.vel.y += f.y / this.mass
  }
  
  this.attract = function(child) {
    let r = dist(this.pos.x, this.pos.y, child.pos.x, child.pos.y)
    let f = this.pos.copy().sub(child.pos)
    f.setMag( (G * this.mass * child.mass)/(r * r) )
    child.applyForce(f)
  }
}