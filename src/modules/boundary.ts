import { Vector } from '../../node_modules/vector2d/src/Vector';
export class Boundary {
  private ctx: CanvasRenderingContext2D | null
  private a: Vector
  private b: Vector
  public id: number
  constructor(x1: number, y1: number, x2: number, y2: number, id: number) {
    this.id = id
    this.a = new Vector(x1,y1)
    this.b = new Vector(x2,y2)
    let canvas = document.getElementById('canvas') as
      HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");
    this.ctx = ctx;
  }

  show() {
      if (this.ctx) {
        this.ctx.strokeStyle = 'white'
        this.ctx.beginPath()
        this.ctx.moveTo(this.a.x, this.a.y)
        this.ctx.lineTo(this.b.x, this.b.y)
        this.ctx.stroke()
        this.ctx.closePath()
      }
  }
}