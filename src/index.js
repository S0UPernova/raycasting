// 2D Visibility
// Ray Casting
import { Boundary } from "./modules/boundary";
import { Particle } from "./modules/particle";
import { Draw } from "./modules/draw";
import { Vector } from "../node_modules/vector2d/src/Vector";
import "../index.css";
var wall;
var ray;
var particle;
var mouseX = 1;
var mouseY = 1;
var walls = [];
// let xoff: number = 0
// let yoff: number = 0
document.addEventListener("mousemove", function (event) {
    mouseX = event.clientX; // Gets Mouse X
    mouseY = event.clientY; // Gets Mouse Y
});
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
function setup() {
    for (var i = 0; i < 5; i++) {
        var x1 = Math.random() * canvas.width;
        var y1 = Math.random() * canvas.height;
        var x2 = Math.random() * canvas.width;
        var y2 = Math.random() * canvas.height;
        var b = new Boundary(x1, y1, x2, y2, i + 4);
        if (b) {
            walls.push(b);
        }
        walls.push(new Boundary(0, 0, canvas.width, 0, 0));
        walls.push(new Boundary(canvas.width, 0, canvas.width, canvas.height, 1));
        walls.push(new Boundary(canvas.width, canvas.height, 0, canvas.height, 2));
        walls.push(new Boundary(0, canvas.height, 0, 0, 3));
    }
    // walls.push(new Boundary(300, 100, 300, 300, 10))
    // let rVector = new Vector(100, 200)
    // ray = new Ray(rVector, 0)
    particle = new Particle(new Vector(100, 200), [1, 0]);
}
function clearCanvas() {
    if (ctx) {
        var canvas_1 = ctx.canvas;
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, canvas_1.width, canvas_1.height);
        ctx.restore();
    }
}
setup();
function draw() {
    for (var _i = 0, walls_1 = walls; _i < walls_1.length; _i++) {
        var wall_1 = walls_1[_i];
        // wall.show()
        particle.look(walls);
    }
    if (ctx) {
        ctx.fillStyle = "white";
        // wall.show()
        particle.update(mouseX, mouseY);
        particle.show();
        // particle.lookAt(mouseX, mouseY)
        // xoff += 0.01
        // yoff += 0.01
        // particle.look(wall)
        // ray.show()
        // ray.lookAt(mouseX, mouseY)
    }
    // let pt = ray.cast(wall)
    //   if (pt && ctx) {
    //     ctx.fillStyle = 'white'
    //     ctx.fillRect(pt.x, pt.y, 8, 8)
    //   }
    var timer = setTimeout(function () {
        clearCanvas();
        draw();
    }, 50);
}
draw();
var drawCircle = new Draw(canvas);
