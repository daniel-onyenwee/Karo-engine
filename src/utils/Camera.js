"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var math_1 = require("../libs/math");
var Camera = /** @class */ (function () {
    /**
     * 🛠 utility class to act as a 2D camera
     * @param game instance of the `Game`
    */
    function Camera(game) {
        this._offset = new math_1.Vector2(0, 0);
        this.game = game;
    }
    Object.defineProperty(Camera.prototype, "offset", {
        /**
         * public getter to get the camera offset
         */
        get: function () {
            return this._offset;
        },
        /**
         * public setter to set the camera offset
         */
        set: function (value) {
            this._offset = value;
        },
        enumerable: false,
        configurable: true
    });
    return Camera;
}());
exports.default = Camera;
