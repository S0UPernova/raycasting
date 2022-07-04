import { Vector } from '../../node_modules/vector2d/src/Vector';
import { Ray } from './ray';
var Particle = /** @class */ (function () {
    function Particle(ctx, width, height) {
        this.ctx = ctx;
        this.pos = new Vector(width / 2, height / 2);
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
    Particle.prototype.look = function (walls) {
        // ? maybe make this an object with the keys being the walls,
        // ? and the values being an array of the points.
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
            if (this.ctx && closest) {
                var key = closest.wall.id;
                if (arrOfClosests.hasOwnProperty(key)) {
                    arrOfClosests[key].push(closest);
                }
                else {
                    arrOfClosests[key] = [closest];
                }
                // ray.show()
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
        var _a, _b, _c, _d;
        for (var i = 0; i < arrOffClosests.length; i++) {
            if (arrOffClosests === null || arrOffClosests === void 0 ? void 0 : arrOffClosests[i]) {
                for (var j = 0; j < arrOffClosests[i].length; j++) {
                    if (((_b = (_a = arrOffClosests === null || arrOffClosests === void 0 ? void 0 : arrOffClosests[i]) === null || _a === void 0 ? void 0 : _a[j]) === null || _b === void 0 ? void 0 : _b.pt) && ((_d = (_c = arrOffClosests === null || arrOffClosests === void 0 ? void 0 : arrOffClosests[i]) === null || _c === void 0 ? void 0 : _c[j + 1]) === null || _d === void 0 ? void 0 : _d.pt)) {
                        this.ctx.strokeStyle = 'red';
                        this.ctx.beginPath();
                        this.ctx.moveTo(arrOffClosests[i][j].pt.x, arrOffClosests[i][j].pt.y);
                        this.ctx.lineTo(arrOffClosests[i][j + 1].pt.x, arrOffClosests[i][j + 1].pt.y);
                        this.ctx.stroke();
                        this.ctx.closePath();
                    }
                }
            }
        }
    };
    Particle.prototype.show = function () {
        if (this.ctx) {
            // this.ctx.fillRect(this.pos.x, this.pos.y, 8, 8)
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
