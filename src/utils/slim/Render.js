"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 🛠 utility class to handle the rendering of a character and its children
 */
var Render = /** @class */ (function () {
    function Render() {
        this.renderMap = new Map();
        this.renderIndexArray = Array();
    }
    /**
     * public method to add a character to the `Render` instance
     * @param zIndex the character stack level number
     * @param character character instance to add
     */
    Render.prototype.add = function (zIndex, character) {
        if (this.renderMap.has(zIndex)) {
            var renderCharacterList = this.renderMap.get(zIndex);
            renderCharacterList.push(character);
            if (!this.renderIndexArray.includes(zIndex)) {
                this.renderIndexArray.push(zIndex);
            }
        }
        else {
            this.renderIndexArray.push(zIndex);
            this.renderMap.set(zIndex, [character]);
        }
    };
    /**
    * public method to render character
    * @param graphic instance of `CanvasRenderingContext2D` class use to draw
    * @param displayPosition actual position of the character on the canvas
    * @param displayScale actual scale of the character
    * @param displayRotation actual rotation of the character
    */
    Render.prototype.render = function (graphic, displayPosition, displayScale, displayRotation) {
        var _this = this;
        this.renderIndexArray.sort();
        this.renderIndexArray.forEach(function (zIndex) {
            if (_this.renderMap.has(zIndex)) {
                var renderCharacterList = _this.renderMap.get(zIndex);
                renderCharacterList.forEach(function (character) {
                    if (!character.get("is destroyed"))
                        character.render(graphic, displayPosition, displayScale, displayRotation);
                });
            }
        });
        this.renderIndexArray.length = 0;
        this.renderMap.clear();
    };
    return Render;
}());
exports.default = Render;
