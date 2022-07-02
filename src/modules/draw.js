var Draw = /** @class */ (function () {
    function Draw(canvas) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
    }
    Draw.prototype.prim = function () {
        function circle() {
            console.log("here");
        }
    };
    return Draw;
}());
export { Draw };
