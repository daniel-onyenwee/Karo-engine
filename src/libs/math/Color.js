"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Color = /** @class */ (function () {
    /**
     * 🛠 utility to class to handle color related issues
     * @param red the saturation of red in the color
     * @param green the saturation of green in the color
     * @param blue the saturation of blue in the color
     * @param alpha the range of transparency of the color
     */
    function Color(red, green, blue, alpha) {
        if (red === void 0) { red = 0; }
        if (green === void 0) { green = 0; }
        if (blue === void 0) { blue = 0; }
        if (alpha === void 0) { alpha = 1; }
        this.red = red;
        this.blue = blue;
        this.green = green;
        this.alpha = alpha;
    }
    /**
     * public method to convert the color to string
     * @returns `string` format of rgba(r, g, b, a)
     */
    Color.prototype.toString = function () {
        return "rgba(" + this.red + ", " + this.green + ", " + this.blue + ", " + this.alpha + ")";
    };
    /**
     * public method to convert the color to a number type array
     * @returns `Array` of 4 numeric values `[red, green, blue, alpha]`
     */
    Color.prototype.toArray = function () {
        return [this.red, this.green, this.blue, this.alpha];
    };
    /**
     * public method to generate `Color` from a number type array
     * @param colorArray `Array` of 4 numeric values `[red, green, blue, alpha]`
     * @returns `Color`
     */
    Color.prototype.fromArray = function (colorArray) {
        return new Color((colorArray[0] != undefined ? colorArray[0] : 0), (colorArray[1] != undefined ? colorArray[1] : 0), (colorArray[2] != undefined ? colorArray[2] : 0), (colorArray[3] != undefined ? colorArray[3] : 1));
    };
    /**
     * public method to convert the color to a `Object`
     * @returns an `Object` of key `red`, `green`, `blue`, `alpha`
     */
    Color.prototype.toObject = function () {
        return {
            red: this.red,
            green: this.green,
            blue: this.blue,
            alpha: this.alpha
        };
    };
    /**
     * public method to generate `Color` from an `Object` of key `red`, `green`, `blue`, `alpha`
     * @param colorObject an `Object` of key `red`, `green`, `blue`, `alpha`
     * @returns `Color`
     */
    Color.prototype.fromObject = function (colorObject) {
        return new Color(colorObject.red, colorObject.green, colorObject.blue, colorObject.alpha);
    };
    return Color;
}());
exports.default = Color;
