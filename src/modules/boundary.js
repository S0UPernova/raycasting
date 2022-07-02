import { Vector } from '../../node_modules/vector2d/src/Vector';
var Boundary = /** @class */ (function () {
    function Boundary(x1, y1, x2, y2, id) {
        this.id = id;
        this.a = new Vector(x1, y1);
        this.b = new Vector(x2, y2);
        var canvas = document.getElementById('canvas');
        var ctx = canvas.getContext("2d");
        this.ctx = ctx;
    }
    Boundary.prototype.show = function () {
        if (this.ctx) {
            this.ctx.strokeStyle = 'white';
            this.ctx.beginPath();
            this.ctx.moveTo(this.a.x, this.a.y);
            this.ctx.lineTo(this.b.x, this.b.y);
            this.ctx.stroke();
            this.ctx.closePath();
        }
    };
    return Boundary;
}());
export { Boundary };
