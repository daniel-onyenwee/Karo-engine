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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require(".");
var Loop = /** @class */ (function (_super) {
    __extends(Loop, _super);
    /**
     * a character use to repeat a particular task
     * @param propertyOption property of the loop character
     */
    function Loop(propertyOption) {
        var _this = _super.call(this, {
            name: propertyOption.name,
            "z index": propertyOption["z index"],
            opacity: propertyOption.opacity,
            visible: propertyOption.visible
        }) || this;
        _this._type = "Loop";
        _this.propertyManager.scheme({
            time: propertyOption.time != undefined ? propertyOption.time : 0,
            play: propertyOption.play != undefined ? propertyOption.play : false
        });
        _this.propertyManager.delete("position");
        _this.propertyManager.delete("rotation");
        _this.propertyManager.delete("scale");
        return _this;
    }
    /**
     * public method to update the character
     * @param dt time difference between the previous frame and the current time
     */
    Loop.prototype.update = function (dt) {
        var _this = this;
        if (this.get("is initialize") && !this.get("is destroyed")) {
            if (this.get("play") == true) {
                __spreadArray([], Array.from(Array(this.get("time")).keys()), true).forEach(function (i) {
                    i = i + 1;
                    _this.eventEmitter.emit("each", i);
                    if (i == _this.get("time"))
                        _this.eventEmitter.emit("end", i);
                });
                this.set("play", false);
            }
            this.eventEmitter.emit("update", dt);
            this.Updater.update(dt);
        }
    };
    /**
     * public method to render the character
     * @param graphic instance of `CanvasRenderingContext2D` use to draw the character
     * @param displayPosition actual position of the character on the canvas
     * @param displayScale actual scale of the character
     * @param displayRotation actual rotation of the character
     */
    Loop.prototype.render = function (graphics, displayPosition, displayScale, displayRotation) {
        if (this.get("is initialize") && !this.get("is destroyed") && this.get("visible")) {
            this.displayPosition = displayPosition;
            this.displayScale = displayScale;
            this.displayRotation = displayRotation;
            this.Render.render(graphics, this.displayPosition, this.displayScale, this.displayRotation);
        }
    };
    return Loop;
}(_1.Container));
exports.default = Loop;
