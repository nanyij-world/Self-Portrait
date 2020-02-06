let a;
let value = -1;
let fragmentsBack = [];
let fragmentsFront = [];
let xStart, yStart, randSize, randSpeed;

function preload() {
  // Load model with normalise parameter set to true
  paper = loadImage('paper.png', true);
}

function setup() {
  createCanvas(800, 800, WEBGL);

  p = color(255, 200, 200, 120);
  o = color(255, 177, 27, 30);
  g = color(144, 180, 75, 20);

  // define particles
  for (i = 0; i < 50; i++) {
    randSize = random(5, 15);
    randSpeed = random(1, 20);
    xStart = random(width);
    yStart = random(height + 100, height + 1000);
    fragmentsBack[i] = new Fragments(xStart, yStart, randSize, randSpeed, 150);
  }
  for (i = 0; i < 20; i++) {
    randSize = random(10, 20);
    randSpeed = random(1, 10);
    xStart = random(width);
    yStart = random(height + 100, height + 1000);
    fragmentsFront[i] = new Fragments(xStart, yStart, randSize, randSpeed, 150);
  }
}

function draw() {
  background(240);
  print(mouseX);
  noStroke();
  let locX = mouseX - height / 2;
  let locY = mouseY - width / 2;
  ambientLight(200, 200, 200);
  translate(-width / 2, -height / 2);
  pointLight(100, 50, 5, locX, locY, 100);

  // back particles
  for (i = 0; i < 50; i++) {
    fragmentsBack[i].show();
    fragmentsBack[i].rise();
  }

  // human
  push();
  translate(width / 2, height / 2 - 30, -100);
  rotateY(frameCount * 0.005);
  rotateZ(frameCount * 0.0002);
  normalMaterial();
  ellipsoid(18, 20, 20);
  rotateZ(radians(180));
  translate(0, -40, 0);
  cone(25, 120, 20);
  cone(45);
  translate(5, -70, 0);
  rotateZ(radians(0));
  cone(5, 70, 20);
  translate(17, 50, 0);
  cone(5, 45, 20);
  translate(-44, 0, 0);
  cone(5, 45, 20);
  translate(15, -50, 0)
  cone(5, 70, 20);
  pop();

// central sphere
  push();
  translate(width / 2, height / 2);
  // rotateX(frameCount * 0.001);
  rotateY(frameCount * 0.005);
  texture(paper);
//   when mouse clicked
  if(value == 1){
    pointLight(200, 200, 200, 0, 0, 300);
    fill(p);
  }
  ellipsoid(225, 210, 210);
  rotateX(radians(60));
  if (mouseX < width / 2) {
    fill(0,0,150,60);
  }
  if (mouseX > width / 2) {
    fill(180, 180, 180, 30);
  }
  torus(250, 2);
  rotateY(radians(30));
  rotateX(frameCount * 0.001);
  // torus(270, 2);
  normalMaterial();
  pop();

  // front particles
  for (i = 0; i < 20; i++) {
    fragmentsFront[i].show();
    fragmentsFront[i].rise();
  }

  push();
  translate(width / 2, height / 2);

  pop();
}



class Fragments {
  constructor(xpos, ypos, size, randR, yspeed) {
    this.x = xpos;
    this.y = ypos;
    this.size = size;
    this.randR = randR;
    this.yspeed = random(80, yspeed);
  }

  show() {
    push();
    translate(this.x, this.y);
    if (mouseX < width / 2) {
      normalMaterial();
    }
    if (mouseX > width / 2) {
      fill(200);
    }
    rotateZ(frameCount * this.randR / 1000);
    rotateX(frameCount * this.randR / 1000);
    rotateY(frameCount * this.randR / 1000);
    plane(this.size);
    pop();
  }

  rise() {
    if (mouseY < height / 2) {
      this.y = this.y - this.yspeed / 100;
      if (this.y < 0) {
        this.y = random(height+20, height + 500);
        this.x = random(width);
    }
    }
    if (mouseY >height / 2) {
      this.y = this.y + this.yspeed / 100;
      if (this.y > height) {
        this.y = random(-20, -500);
        this.x = random(width);
    }
   }
  }
}

function mouseClicked() {
   value=-value;
}
