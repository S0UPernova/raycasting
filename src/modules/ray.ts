import { Vector } from '../../node_modules/vector2d/src/Vector';
export class Ray {
  private ctx: CanvasRenderingContext2D | null
  private pos: any
  private dir: any
  constructor(pos: Vector, angle: any) {
    this.pos = pos
    this.dir = this.getVector(angle)
    let canvas = document.getElementById('canvas') as
      HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");
    this.ctx = ctx;


  }
  private getVector = function (A: number) {
    let V: any = {}
    V.x = Math.cos(A)
    V.y = Math.sin(A)
    return new Vector(V.x, V.y)
  }

  lookAt(x: number, y: number) {
    this.dir.x = x - this.pos.x
    this.dir.y = y - this.pos.y
    this.dir = this.dir.normalize()
  }

  show() {
    if (this.ctx) {
      this.ctx.strokeStyle = 'white'
      this.ctx.beginPath()
      this.ctx.moveTo(this.pos.x, this.pos.y)
      this.ctx.translate(this.pos.x, this.pos.y)
      this.ctx.lineTo(this.dir.x * 10, this.dir.y * 10)
      this.ctx.stroke()
      this.ctx.translate(-this.pos.x, -this.pos.y)
      this.ctx.closePath()
    }
  }

  cast(wall: any) {
    const x1 = wall.a.x
    const y1 = wall.a.y
    const x2 = wall.b.x
    const y2 = wall.b.y

    const x3 = this.pos.x
    const y3 = this.pos.y
    const x4 = this.pos.x + this.dir.x
    const y4 = this.pos.y + this.dir.y

    const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4)
    if (den === 0) {
      return
    }

    const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den
    const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den
    if (t > 0 && t < 1 && u > 0) {
      let x = x1 + t * (x2 - x1)
      let y = y1 + t * (y2 - y1)
      const pt = new Vector(x, y)
      return pt
    } else {
      return
    }
  }
}