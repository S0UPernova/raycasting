import { Vector } from '../../node_modules/vector2d/src/Vector';
import { Boundary } from './boundary';
import { Ray } from './ray';
export class Particle {
  private ctx: CanvasRenderingContext2D
  private pos: Vector | undefined
  private rays: Array<Ray>

  constructor(ctx: CanvasRenderingContext2D, width: number, height: number) {
    this.ctx = ctx
    this.pos = new Vector(width / 2, height / 2)
    this.rays = []
    for (let a = 0; a < 360; a += 10) {
      let ray = new Ray(this.pos, this.radians(a))
      if (ray) {
        this.rays.push(ray)
      }
    }
  }
  private radians(degrees: number) {
    return degrees * (Math.PI / 180)
  }
  private getDistance(pos1: Vector, pos2: Vector) {
    let x1: number = pos1.x
    let y1: number = pos1.y
    let x2: number = pos2.x
    let y2: number = pos2.y
    return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2))
  }

  update(x: number, y: number) {
    this.pos.setX(x)
    this.pos.setY(y)
  }

  look(walls: Array<Boundary>) {
    // ? maybe make this an object with the keys being the walls,
    // ? and the values being an array of the points.
    let arrOfClosests: Array<object[]> = []
    for (const ray of this.rays) {
      let record = Infinity
      let closest = null
      for (let wall of walls) {
        const pt = ray.cast(wall)
        if (pt) {
          const d = this.getDistance(this.pos, pt)
          if (d < record) {
            record = d
            closest = { pt: pt, wall: wall }
          }
          record = Math.min(d, record)

          // wall.show()
        }
      }
      if (this.ctx && closest) {
        let key: number = closest.wall.id
        if (arrOfClosests.hasOwnProperty(key)) {
          arrOfClosests[key].push(closest)
        } else {
          arrOfClosests[key] = [closest]
        }
        // ray.show()
        this.ctx.strokeStyle = 'grey'
        this.ctx.beginPath()
        this.ctx.moveTo(this.pos.x, this.pos.y)
        this.ctx.lineTo(closest.pt.x, closest.pt.y)
        this.ctx.stroke()
        this.ctx.closePath()
      }
    }
    this.seeWalls(arrOfClosests)
  }
  private seeWalls(arrOffClosests: any) {
    for (let i = 0; i < arrOffClosests.length; i++) {
      if (arrOffClosests?.[i]) {
      for(let j = 0; j < arrOffClosests[i].length; j++) {
        if(arrOffClosests?.[i]?.[j]?.pt && arrOffClosests?.[i]?.[j + 1]?.pt) {
          this.ctx.strokeStyle = 'red'
          this.ctx.beginPath()
          this.ctx.moveTo(arrOffClosests[i][j].pt.x, arrOffClosests[i][j].pt.y)
          this.ctx.lineTo(arrOffClosests[i][j + 1].pt.x, arrOffClosests[i][j + 1].pt.y)
          this.ctx.stroke()
          this.ctx.closePath()
        }
      }

      }
    }
  }

  show() {
    if (this.ctx) {
      // this.ctx.fillRect(this.pos.x, this.pos.y, 8, 8)
      if (this.rays) {

        for (let ray of this.rays) {
          ray.show()
        }
      }
    }
  }
}