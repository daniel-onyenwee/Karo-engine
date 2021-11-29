"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require(".");
var __1 = require("..");
var math_1 = require("../math");
var Arc = /** @class */ (function (_super) {
    __extends(Arc, _super);
    /**
     * a character use to draw arcs and circles
     * @param propertyOption property of the arc character
     */
    function Arc(propertyOption) {
        var _this = _super.call(this, {
            name: propertyOption.name,
            position: propertyOption.position,
            scale: propertyOption.scale,
            rotation: propertyOption.rotation,
            "z index": propertyOption["z index"],
            opacity: propertyOption.opacity,
            visible: propertyOption.visible
        }) || this;
        _this._type = "Arc";
        _this.propertyManager.scheme({
            fill: propertyOption.fill != undefined ? propertyOption.fill : true,
            "shadow offset": propertyOption["shadow offset"] != undefined ? propertyOption["shadow offset"] : new math_1.Vector2(0, 0),
            "shadow blur": propertyOption["shadow blur"] != undefined ? propertyOption["shadow blur"] : 0,
            "line width": propertyOption["line width"] != undefined ? propertyOption["line width"] : 1,
            anticlockwise: propertyOption.anticlockwise != undefined ? propertyOption.anticlockwise : false,
            color: propertyOption.color != undefined ? propertyOption.color : new math_1.Color(0, 0, 0, 1),
            radius: propertyOption.radius != undefined ? propertyOption.radius : 10,
            "shadow color": propertyOption["shadow color"] != undefined ? propertyOption["shadow color"] : new math_1.Color(0, 0, 0, 0),
            "start angle": propertyOption["start angle"] != undefined ? propertyOption["start angle"] : 0,
            "end angle": propertyOption["end angle"] != undefined ? propertyOption["end angle"] : 360,
        });
        return _this;
    }
    /**
     * public method to render the character
     * @param graphic instance of `CanvasRenderingContext2D` use to draw the character
     * @param displayPosition actual position of the character on the canvas
     * @param displayScale actual scale of the character
     * @param displayRotation actual rotation of the character
     */
    Arc.prototype.render = function (graphics, displayPosition, displayScale, displayRotation) {
        if (this.get("is initialize") && !this.get("is destroyed") && this.get("visible")) {
            this.displayPosition = displayPosition.add(this.get("position"));
            this.displayScale = displayScale.multiply(this.get("scale"));
            this.displayRotation = displayRotation + this.get("rotation");
            graphics.save();
            graphics.translate(this.displayPosition.x, this.displayPosition.y);
            graphics.rotate(this.displayRotation * Math.PI / 180);
            graphics.scale(this.displayScale.x, this.displayScale.y);
            graphics.translate(-this.displayPosition.x, -this.displayPosition.y);
            graphics.globalAlpha = (this.parent instanceof __1.Game ? this.get("opacity") : this.parent.get("opacity") * this.get("opacity"));
            graphics.shadowBlur = this.get("shadow blur");
            graphics.shadowColor = this.get("shadow color").toString();
            graphics.shadowOffsetX = this.get("shadow offset").x;
            graphics.shadowOffsetY = this.get("shadow offset").y;
            graphics.beginPath();
            if (this.get("fill") == true) {
                graphics.fillStyle = this.get("color").toString();
                graphics.arc(this.displayPosition.x - this.game.offset.x, this.displayPosition.y - this.game.offset.y, this.get("radius"), this.get("start angle"), this.get("end angle"), this.get("anticlockwise"));
                graphics.fill();
            }
            else if (this.get("fill") == false) {
                graphics.lineWidth = this.get("line width");
                graphics.strokeStyle = this.get("color").toString();
                graphics.arc(this.displayPosition.x - this.game.offset.x, this.displayPosition.y - this.game.offset.y, this.get("radius"), this.get("start angle"), this.get("end angle"), this.get("anticlockwise"));
                graphics.stroke();
            }
            graphics.restore();
            var pointerEvent = this.game.pointerEventDetector.inputEvent;
            if (pointerEvent != null) {
                var inPoint = graphics.isPointInPath(pointerEvent.position.x, pointerEvent.position.y) ?
                    true : graphics.isPointInStroke(pointerEvent.position.x, pointerEvent.position.y) ?
                    true : false;
                var alpha = (this.parent instanceof __1.Game ? this.get("opacity") : this.parent.get("opacity") * this.get("opacity"));
                var color = this.get("color");
                if (inPoint && alpha > 0 && color.alpha > 0) {
                    this.game.pointerEventDetector.characterDetected = this;
                }
            }
            this.Render.render(graphics, this.displayPosition, this.displayScale, this.displayRotation);
        }
    };
    return Arc;
}(_1.Container));
exports.default = Arc;
