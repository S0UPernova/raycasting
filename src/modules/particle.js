import { Vector } from '../../node_modules/vector2d/src/Vector';
import { Ray } from './ray';
var Particle = /** @class */ (function () {
    function Particle(pos, angle) {
        this.getVector = function (A) {
            var V = {};
            V.x = Math.cos(A);
            V.y = Math.sin(A);
            return new Vector(V.x, V.y);
        };
        this.dir = this.getVector(angle);
        var canvas = document.getElementById('canvas');
        var ctx = canvas.getContext("2d");
        this.ctx = ctx;
        this.pos = new Vector(canvas.width / 2, canvas.height / 2);
        this.rays = [];
        for (var a = 0; a < 360; a += 10) {
            var ray = new Ray(this.pos, this.radians(a));
            if (ray) {
                this.rays.push(ray);
            }
        }
    }
    Particle.prototype.radians = function (degrees) {
        return degrees * (Math.PI / 180);
    };
    Particle.prototype.getDistance = function (pos1, pos2) {
        var x1 = pos1.x;
        var y1 = pos1.y;
        var x2 = pos2.x;
        var y2 = pos2.y;
        return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
    };
    Particle.prototype.update = function (x, y) {
        this.pos.setX(x);
        this.pos.setY(y);
    };
    Particle.prototype.lookAt = function (x, y) {
        this.dir.x = x - this.pos.x;
        this.dir.y = y - this.pos.y;
        this.dir = this.dir.normalize();
    };
    Particle.prototype.look = function (walls) {
        var arrOfClosests = [];
        for (var _i = 0, _a = this.rays; _i < _a.length; _i++) {
            var ray = _a[_i];
            var record = Infinity;
            var closest = null;
            for (var _b = 0, walls_1 = walls; _b < walls_1.length; _b++) {
                var wall = walls_1[_b];
                var pt = ray.cast(wall);
                if (pt) {
                    var d = this.getDistance(this.pos, pt);
                    if (d < record) {
                        record = d;
                        closest = { pt: pt, wall: wall };
                    }
                    record = Math.min(d, record);
                    // wall.show()
                }
            }
            arrOfClosests.push({ closest: closest });
            if (this.ctx && closest) {
                this.ctx.strokeStyle = 'grey';
                this.ctx.beginPath();
                this.ctx.moveTo(this.pos.x, this.pos.y);
                this.ctx.lineTo(closest.pt.x, closest.pt.y);
                this.ctx.stroke();
                this.ctx.closePath();
            }
        }
        this.seeWalls(arrOfClosests);
    };
    Particle.prototype.seeWalls = function (arrOffClosests) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        for (var i = 0; i < arrOffClosests.length; i++) {
            // console.log(arrOffClosests[i])
            //   // let wall = arrOffClosests[i].wall
            for (var j = 0; j < arrOffClosests.length; j++) {
                if (((_c = (_b = (_a = arrOffClosests[i]) === null || _a === void 0 ? void 0 : _a.closest) === null || _b === void 0 ? void 0 : _b.wall) === null || _c === void 0 ? void 0 : _c.id) === ((_f = (_e = (_d = arrOffClosests[j]) === null || _d === void 0 ? void 0 : _d.closest) === null || _e === void 0 ? void 0 : _e.wall) === null || _f === void 0 ? void 0 : _f.id)
                    && ((_h = (_g = arrOffClosests[i]) === null || _g === void 0 ? void 0 : _g.closest) === null || _h === void 0 ? void 0 : _h.pt)
                    && ((_k = (_j = arrOffClosests[j]) === null || _j === void 0 ? void 0 : _j.closest) === null || _k === void 0 ? void 0 : _k.pt)) {
                    // this.ctx.fillStyle = "red"
                    // this.ctx.fillRect(arrOffClosests[i].closest.pt.x, arrOffClosests[i].closest.pt.y, 8, 8)
                    this.ctx.strokeStyle = "red";
                    this.ctx.beginPath();
                    // this.ctx.moveTo(100, 200)
                    // this.ctx.lineTo(200, 100)
                    this.ctx.moveTo(arrOffClosests[i].closest.pt.x, arrOffClosests[i].closest.pt.y);
                    this.ctx.lineTo(arrOffClosests[j].closest.pt.x, arrOffClosests[j].closest.pt.y);
                    this.ctx.stroke();
                    this.ctx.closePath();
                }
            }
        }
    };
    Particle.prototype.show = function () {
        if (this.ctx) {
            this.ctx.beginPath();
            this.ctx.arc(this.pos.x, this.pos.y, 8, 0, 2 * Math.PI);
            this.ctx.fill();
            if (this.rays) {
                for (var _i = 0, _a = this.rays; _i < _a.length; _i++) {
                    var ray = _a[_i];
                    ray.show();
                }
            }
        }
    };
    return Particle;
}());
export { Particle };
