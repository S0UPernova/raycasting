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

  look(walls: any) {
    let arrOfClosests: Array<object> = []
    for (let ray of this.rays) {
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
      arrOfClosests.push({ closest })
      if (this.ctx && closest) {
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
    // work in progress on speeding this up
    // let wallArrs: any = {}
    // for (let i = 0; i < arrOffClosests.length; i++) {
    //   let id: string 
    //   if (arrOffClosests[i]?.closest?.wall?.id) {

    //     id = `${arrOffClosests[i].closest.wall.id}`
    //       if (wallArrs?.[id]) {
    //         console.log("has Id")
    //       } else if (wallArrs?.[id]) {
    //         wallArrs[id] = [`${arrOffClosests[i].closest.wall.id}`] //= [`${arrOffClosests[i].closest.wall.id}`]
    //       }
    //   }
    // }
    // wallArrs !== {} && console.log(wallArrs)

    for (let i = 0; i < arrOffClosests.length; i++) {
      for (let j = 0; j < arrOffClosests.length; j++) {
        if (arrOffClosests[i]?.closest?.wall?.id === arrOffClosests[j]?.closest?.wall?.id
          && arrOffClosests[i]?.closest?.pt
          && arrOffClosests[j]?.closest?.pt) {
          this.ctx.strokeStyle = "red"
          this.ctx.beginPath()
          this.ctx.moveTo(arrOffClosests[i].closest.pt.x, arrOffClosests[i].closest.pt.y)
          this.ctx.lineTo(arrOffClosests[j].closest.pt.x, arrOffClosests[j].closest.pt.y)
          this.ctx.stroke()
          this.ctx.closePath()
        }
      }
    }
  }

  show() {
    if (this.ctx) {
      this.ctx.fillRect(this.pos.x, this.pos.y, 8, 8)
      // this.ctx.beginPath();
      // this.ctx.arc(this.pos.x, this.pos.y, 8, 0, 2 * Math.PI);
      // this.ctx.fill()
      if (this.rays) {

        for (let ray of this.rays) {
          ray.show()
        }
      }
    }
  }
}