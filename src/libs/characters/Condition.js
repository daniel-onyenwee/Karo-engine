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
var Condition = /** @class */ (function (_super) {
    __extends(Condition, _super);
    function Condition(propertyOption) {
        var _this = _super.call(this, {
            name: propertyOption.name,
            "z index": propertyOption["z index"],
            opacity: propertyOption.opacity,
            visible: propertyOption.visible
        }) || this;
        _this._type = "Condition";
        _this.propertyManager.scheme({
            play: propertyOption.play != undefined ? propertyOption.play : false,
            condition: propertyOption.condition != undefined ? propertyOption.condition : "equal to",
            "left side": propertyOption["left side"] != undefined ? propertyOption["left side"] : 0,
            "right side": propertyOption["right side"] != undefined ? propertyOption["right side"] : 0
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
    Condition.prototype.update = function (dt) {
        if (this.get("is initalize") && !this.get("is destroyed")) {
            var condition = this.get("condition");
            var rightSide = this.get("right side");
            var leftSide = this.get("left side");
            if (this.get("play") == true) {
                if (condition == "equal to") {
                    if (leftSide == rightSide) {
                    }
                    else {
                    }
                }
                else if (condition == "greater than") {
                    if (typeof leftSide == "number" && typeof rightSide == "number") {
                        if (leftSide > rightSide) {
                        }
                        else {
                        }
                    }
                }
                else if (condition == "greater than or equal to") {
                    if (typeof leftSide == "number" && typeof rightSide == "number") {
                        if (leftSide >= rightSide) {
                        }
                        else {
                        }
                    }
                }
                else if (condition == "less than") {
                    if (typeof leftSide == "number" && typeof rightSide == "number") {
                        if (leftSide < rightSide) {
                        }
                        else {
                        }
                    }
                }
                else if (condition == "less than or equal to") {
                    if (typeof leftSide == "number" && typeof rightSide == "number") {
                        if (leftSide <= rightSide) {
                        }
                        else {
                        }
                    }
                }
                else if (condition == "not") {
                    if (leftSide != rightSide) {
                    }
                    else {
                    }
                }
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
    Condition.prototype.render = function (graphics, displayPosition, displayScale, displayRotation) {
        if (this.get("is initalize") && !this.get("is destroyed") && this.get("visible")) {
            this.displayPosition = displayPosition;
            this.displayScale = displayScale;
            this.displayRotation = displayRotation;
            this.Render.render(graphics, this.displayPosition, this.displayScale, this.displayRotation);
        }
    };
    return Condition;
}(_1.Container));
exports.default = Condition;
