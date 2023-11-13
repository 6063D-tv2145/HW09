let sun;
let obstacles = [];
let gameActive = true;

function setup() {
  createCanvas(windowWidth, windowHeight);
  sun = new Sun();
}

function draw() {
  //background & clourds
  background(145,237,255);
  fill(71,208,239,60)
  rect(-25,0,450,75,200)
  rect(-25,150,450,75,200)

  fill(71,208,239,90)
  rect(45,75,450,75,200)

  fill(71,208,239,60)
  rect(width-425,50,450,75,200)
  rect(width-425,200,450,75,200)

  fill(71,208,239,90)
  rect(width-400,125,450,75,200)


  if (gameActive) {
    // create obstacles
    for (let i = obstacles.length - 1; i >= 0; i--) {
      obstacles[i].show();
      obstacles[i].update();

      // Check for collision with sun
      if (obstacles[i].hits(sun)) {
        console.log("Game Over. Press 'R' to restart the game.");
        gameActive = false;
        noLoop(); // Stop 
      }

      // off-screen obstacles deleted
      if (obstacles[i].offscreen()) {
        obstacles.splice(i, 1);
      }
    }

    sun.show();
    sun.update();

    // Create new obstacles
    if (frameCount % 75 === 0) {
      obstacles.push(new Obstacle());
    }
  }
}

//space bar and reset controls
function keyPressed() {
  if (key === ' ' && gameActive) {
    sun.up();
  } else if ((key === 'R' || key === 'r') && !gameActive) {
    resetGame();
  }
}

function resetGame() {
  sun = new Sun();
  obstacles = [];
  gameActive = true;
  loop();
}

function Sun() {
  this.y = height / 2;
  this.x = 150;
  this.gravity = 0.7;
  this.velocity = 0;

  this.show = function() {
    //Sun petals
    fill(255,153,0);
    ellipse(this.x-75, this.y, 100, 100);
    ellipse(this.x+75, this.y, 100, 100);
    ellipse(this.x-40, this.y+65, 100, 100);
    ellipse(this.x+40, this.y+65, 100, 100);
    ellipse(this.x-40, this.y-65, 100, 100);
    ellipse(this.x+40, this.y-65, 100, 100);

    //sun center
    fill(255,176,0);
    noStroke()
    ellipse(this.x, this.y, 160, 160);

    //sun eyes
    fill("white");
    ellipse(this.x-35, this.y-10, 60, 60);
    ellipse(this.x+35, this.y-10, 60, 60);
    fill("black");
    ellipse(this.x-20, this.y-10, 30, 30);
    ellipse(this.x+50, this.y-10, 30, 30);

  };

  this.up = function() {
    this.velocity += -this.gravity * 30;
  };

  this.update = function() {
    this.y += this.velocity;
    this.velocity += this.gravity;

    // floor & ceiling implementation
    if (this.y > height - 100) {
      this.y = height - 100;
      this.velocity = 0;
    }

    if (this.y < 0) {
      this.y = 0;
      this.velocity = 0;
    }
  };
}

function Obstacle() {
  this.width = random(150, 250);
  this.height = random(75, height / 2);
  this.x = width;
  this.y = height - this.height-30;

  this.show = function() {
    fill(0,200,103);
    rect(this.x, this.y, this.width, this.height, 50);

    fill (0, 176, 89)
    rect(this.x+(this.width-60), this.y+(this.height/8), 40, 50, 50);

    fill (175,47,0)
    rect(this.x+(this.width/2.5), this.y+this.height, 50, 75, 0);


  };

  this.update = function() {
    this.x -= 5;
  };

  this.offscreen = function() {
    return this.x < -this.width;
  };

  this.hits = function(sun) {
    // collision detection
    return (
      sun.x < this.x + this.width &&
      sun.x + 120 > this.x &&
      sun.y < this.y + this.height &&
      sun.y + 120 > this.y
    );
  };
}
