const text = document.querySelector(".logo");
const about = document.querySelector(".about");

text.addEventListener("click", () => {
  text.classList.toggle("active");
  about.classList.toggle("hide");
  about.classList.toggle("active");
});

// canvas piece
const canvas = document.querySelector("canvas");
canvas.width = window.innerWidth - 2;
canvas.height = window.innerHeight - 2;

var c = canvas.getContext("2d");

//event listeners
addEventListener("resize", () => {
  init();
  canvas.width = window.innerWidth - 2;
  canvas.height = window.innerHeight - 2;
});

let colorChangeTimer;
text.addEventListener("mouseover", () => {
  colorChangeTimer = setInterval(() => {
    circles.forEach((circle) => {
      circle.color = randomHexColor();
      circle.shadowColor = circle.color;
    });
  }, 500);
});

text.addEventListener("mouseout", () => {
  clearInterval(colorChangeTimer);
  circles.forEach((circle) => {
    circle.color = "#ababab";
    circle.shadowColor = "#e8e8e8";
  });
});

// utility functions
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomValue(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomHexColor() {
  const hexArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
  let hexColor = "#";
  for (let i = 0; i < 6; i++) {
    hexColor += randomValue(hexArr);
  }
  return hexColor;
}

// objects
class Circle {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = "#ababab";
    this.shadowColor = "#e8e8e8";
    this.randomXSpeed = [-0.2, 0.2];
    this.speed = {
      x: randomValue(this.randomXSpeed),
      y: Math.random() * 2,
    };
  }

  update() {
    this.draw();

    this.x -= this.speed.x;
    this.y -= this.speed.y;

    if (this.speed.y < 0.3) {
      this.speed.y = Math.random() * 2;
    }

    // Collisions
    if (this.y < 0 - this.radius) {
      this.y = canvas.height + this.radius;
      this.radius = randomNumber(15, 20);
      this.x = randomNumber(20, canvas.width - 20) - this.radius;
      this.speed.x = randomValue(this.randomXSpeed);
      this.speed.y = Math.random() * 2;
    }

    if (this.x > canvas.width - this.radius || this.x < this.radius) {
      this.speed.x *= -1;
    }
  }

  draw() {
    c.save();
    c.beginPath();
    c.arc(this.x, this.y, this.radius, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.shadowColor = this.shadowColor;
    c.shadowBlur = 15;
    c.closePath();
    c.fill();
    c.restore();
  }
}

// init
let circles = [];
const circleAmount = 40;

function init() {
  cicrles = [];
  for (let i = 0; i < circleAmount; i++) {
    let x = randomNumber(20, canvas.width - 20);
    let y = randomNumber(20, canvas.height - 20);
    let radius = randomNumber(15, 20);
    circles.push(new Circle(x, y, radius));
  }
}

// animate
function animate() {
  c.clearRect(0, 0, canvas.width, canvas.height);
  requestAnimationFrame(animate);

  // update items
  circles.forEach((circle) => {
    circle.update();
  });
}

// call all main functions
init();
animate();
