const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

const size = 200;

let circlePos = size/2;

function draw() {

ctx.clearRect(0,0,width,height);

circlePos += 0.5;

ctx.fillStyle = 'black';
ctx.font = '40px Arial';
ctx.fillText ('Ciao', 100, 100);


ctx.save();
ctx.translate(300, 500);

ctx.fillStyle = 'blue';
ctx.fillRect(0, 0, size, size);

ctx.fillStyle = 'orange';
ctx.arc (size/2, size/2, 50, 0, Math.PI * 2)
ctx.fill();

ctx.restore();

requestAnimationFrame (draw);
}

draw();