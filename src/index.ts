// 2D Visibility
// Ray Casting
import { Boundary } from "./modules/boundary"
// import { Ray } from "./modules/ray"
import { Particle } from "./modules/particle"
import { Draw } from "./modules/draw"
import { Vector } from "../node_modules/vector2d/src/Vector"
import "../index.css"
// let wall: Boundary
// let ray: Ray
let particle: Particle
let mouseX: number = 1
let mouseY: number = 1
let walls: Array<Boundary> = []
document.addEventListener("mousemove", (event) => {
  mouseX = event.clientX // Gets Mouse X
  mouseY = event.clientY // Gets Mouse Y
})
let canvas = document.getElementById('canvas') as
  HTMLCanvasElement;
let ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");
canvas.height = window.innerHeight
canvas.width = window.innerWidth

function setup() {
  for(let i = 0; i < 5; i++) {
    let x1: number = Math.random() * canvas.width
    let y1: number = Math.random() * canvas.height
    let x2: number = Math.random() * canvas.width
    let y2: number = Math.random() * canvas.height
    let b = new Boundary(x1, y1, x2, y2, i + 4)
    if (b) {
      walls.push(b)
    }
    walls.push(new Boundary(0, 0, canvas.width, 0, 0))
    walls.push(new Boundary(canvas.width, 0, canvas.width, canvas.height, 1))
    walls.push(new Boundary(canvas.width, canvas.height, 0, canvas.height, 2))
    walls.push(new Boundary(0, canvas.height, 0, 0, 3))

  }
  // walls.push(new Boundary(300, 100, 300, 300, 10))
  // let rVector = new Vector(100, 200)
  // ray = new Ray(rVector, 0)
  particle = new Particle(ctx, canvas.width, canvas.height)
}
function clearCanvas() {
  if(ctx) {
    const canvas: HTMLCanvasElement = ctx.canvas
    ctx.save()
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.restore()
  }
}
setup()

function draw() {
  for (let wall of walls) {
    wall.show()
    particle.look(walls)
  }
  if (ctx) {
    ctx.fillStyle = "white"
    // wall.show()
    particle.update(mouseX, mouseY)
    particle.show()
  }

  // framerate
  let timer = setTimeout(() => {
    clearCanvas()
    draw()
  }, 50)
}
draw()
let drawCircle = new Draw(canvas)