import { Vector } from '../../node_modules/vector2d/src/Vector';
var Ray = /** @class */ (function () {
    function Ray(pos, angle) {
        this.getVector = function (A) {
            var V = {};
            V.x = Math.cos(A);
            V.y = Math.sin(A);
            return new Vector(V.x, V.y);
        };
        this.pos = pos;
        this.dir = this.getVector(angle);
        var canvas = document.getElementById('canvas');
        var ctx = canvas.getContext("2d");
        this.ctx = ctx;
    }
    Ray.prototype.lookAt = function (x, y) {
        this.dir.x = x - this.pos.x;
        this.dir.y = y - this.pos.y;
        this.dir = this.dir.normalize();
    };
    Ray.prototype.show = function () {
        if (this.ctx) {
            this.ctx.strokeStyle = 'white';
            this.ctx.beginPath();
            this.ctx.moveTo(this.pos.x, this.pos.y);
            this.ctx.translate(this.pos.x, this.pos.y);
            this.ctx.lineTo(this.dir.x * 10, this.dir.y * 10);
            this.ctx.stroke();
            this.ctx.translate(-this.pos.x, -this.pos.y);
            this.ctx.closePath();
        }
    };
    Ray.prototype.cast = function (wall) {
        var x1 = wall.a.x;
        var y1 = wall.a.y;
        var x2 = wall.b.x;
        var y2 = wall.b.y;
        var x3 = this.pos.x;
        var y3 = this.pos.y;
        var x4 = this.pos.x + this.dir.x;
        var y4 = this.pos.y + this.dir.y;
        var den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
        if (den === 0) {
            return;
        }
        var t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
        var u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;
        if (t > 0 && t < 1 && u > 0) {
            var x = x1 + t * (x2 - x1);
            var y = y1 + t * (y2 - y1);
            var pt = new Vector(x, y);
            return pt;
        }
        else {
            return;
        }
    };
    return Ray;
}());
export { Ray };
