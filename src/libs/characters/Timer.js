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
var Timer = /** @class */ (function (_super) {
    __extends(Timer, _super);
    /**
     * a character use to create a timer
     * @param propertyOption property of the timer character
     */
    function Timer(propertyOption) {
        var _this = _super.call(this, {
            name: propertyOption.name,
            "z index": propertyOption["z index"],
            opacity: propertyOption.opacity,
            visible: propertyOption.visible
        }) || this;
        _this.currentTime = 0;
        _this._type = "Timer";
        _this.propertyManager.scheme({
            "wait time": propertyOption["wait time"] != undefined ? propertyOption["wait time"] : 1,
            play: propertyOption.play != undefined ? propertyOption.play : false,
            repeat: propertyOption.repeat != undefined ? propertyOption.repeat : false
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
    Timer.prototype.update = function (dt) {
        var waitTime = this.get("wait time");
        var repeat = this.get("repeat");
        if (this.get("is initalize") && !this.get("is destroyed")) {
            if (this.get("play") == true) {
                this.currentTime += dt;
                if (this.currentTime >= waitTime) {
                    this.currentTime = 0;
                    this.eventEmitter.emit("timeout");
                    if (!repeat) {
                        this.set("play", false);
                    }
                }
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
    Timer.prototype.render = function (graphics, displayPosition, displayScale, displayRotation) {
        if (this.get("is initalize") && !this.get("is destroyed") && this.get("visible")) {
            this.displayPosition = displayPosition;
            this.displayScale = displayScale;
            this.displayRotation = displayRotation;
            this.Render.render(graphics, this.displayPosition, this.displayScale, this.displayRotation);
        }
    };
    return Timer;
}(_1.Container));
exports.default = Timer;
