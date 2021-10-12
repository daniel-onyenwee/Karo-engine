"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Vector2 = /** @class */ (function () {
    function Vector2(x, y) {
        x != undefined ? this._x = x : this._x = 0;
        y != undefined ? this._y = y : this._y = 0;
    }
    Object.defineProperty(Vector2.prototype, "x", {
        get: function () {
            return this._x;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "y", {
        get: function () {
            return this._y;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "setX", {
        set: function (x) {
            this._x = x;
            2;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "setY", {
        set: function (y) {
            this._y = y;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * public method to add other vectors to this vector
     * @returns `Vector2`
     */
    Vector2.prototype.add = function () {
        var others = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            others[_i] = arguments[_i];
        }
        var returnValue = this;
        if (others.length == 1) {
            var other = others[0];
            returnValue = new Vector2(returnValue.x + other.x, returnValue.y + other.y);
        }
        else if (others.length > 1) {
            others.forEach(function (other) {
                returnValue = returnValue.add(other);
            });
        }
        return returnValue;
    };
    /**
     * public method to substr other vectors to this vector
     * @returns `Vector2`
     */
    Vector2.prototype.substr = function () {
        var others = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            others[_i] = arguments[_i];
        }
        var returnValue = this;
        if (others.length == 1) {
            var other = others[0];
            returnValue = new Vector2(returnValue.x - other.x, returnValue.y - other.y);
        }
        else if (others.length > 1) {
            others.forEach(function (other) {
                returnValue = returnValue.substr(other);
            });
        }
        return returnValue;
    };
    /**
     * public method to find the dot product between this vector and another vector
     * @param other the other vector to find the dot product with
     * @returns `Vector2`
     */
    Vector2.prototype.dot = function (other) {
        return ((this._x * other.x) + (this._y * other.y));
    };
    /**
     * public method to divide other vectors to this vector
     * @returns `Vector2`
     */
    Vector2.prototype.divide = function () {
        var others = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            others[_i] = arguments[_i];
        }
        var returnValue = this;
        if (others.length == 1) {
            var other = others[0];
            returnValue = new Vector2(returnValue.x / other.x, returnValue.y / other.y);
        }
        else if (others.length > 1) {
            others.forEach(function (other) {
                returnValue = returnValue.divide(other);
            });
        }
        return returnValue;
    };
    /**
     * public method to multiply other vectors or number to this vector
     * @returns `Vector2`
     */
    Vector2.prototype.multiply = function () {
        var others = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            others[_i] = arguments[_i];
        }
        var returnValue = this;
        if (others.length == 1) {
            var other = others[0];
            if (typeof other == "number") {
                returnValue = new Vector2(returnValue.x * other, returnValue.y * other);
            }
            else {
                returnValue = new Vector2(returnValue.x * other.x, returnValue.y * other.y);
            }
        }
        else if (others.length > 1) {
            others.forEach(function (other) {
                returnValue = returnValue.multiply(other);
            });
        }
        return returnValue;
    };
    /**
     * public method to convert this vector to an number type array
     * @returns `number[]`
     */
    Vector2.prototype.toArray = function () {
        return [this._x, this._y];
    };
    /**
     * public method to convert this vector to a string
     * @returns `string`
     */
    Vector2.prototype.toString = function () {
        return "(" + this._x + ", " + this._y + ")";
    };
    /**
     * public method to convert this vector to an object
     * @returns `object`
     */
    Vector2.prototype.toObject = function () {
        return {
            x: this._x,
            y: this._y
        };
    };
    /**
     * public method to find the angle of this vector
     * @returns `number`
     */
    Vector2.prototype.angle = function () {
        ;
        return Math.tan((this._y / this._x));
    };
    /**
     * public method to find the magnitude of this vector
     * @returns `number`
     */
    Vector2.prototype.magnitude = function () {
        return Math.sqrt(Math.pow(Math.abs(this._x), 2) + Math.pow(Math.abs(this._y), 2));
    };
    /**
     * public method to normalize this vector
     * @returns
     */
    Vector2.prototype.normalize = function () {
        var length = this.magnitude();
        var returnVector2 = new Vector2(0, 0);
        if (length > 0.00001) {
            returnVector2.setX = this.x / length;
            returnVector2.setY = this.y / length;
        }
        return returnVector2;
    };
    return Vector2;
}());
exports.default = Vector2;
