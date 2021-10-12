"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("../..");
var Updater = /** @class */ (function () {
    /**
     * 🛠 utility class to handle the updating of a character and its children
     * @param canvas instance of the `HTMLCanvasElement`
     * @param game instance of the `Game`
     * @param character the instance of the character
     * @param storage instance of the `Slim.Storage` object
     * @param render instance of the `Slim.Render` object
     */
    function Updater(canvas, game, character, storage, render) {
        this.canvas = canvas;
        this.game = game;
        this.character = character;
        this.render = render;
        this.storage = storage;
    }
    /**
     * public method to update the character
     * @param dt time difference between the previous frame and the current time
     */
    Updater.prototype.update = function (dt) {
        var _this = this;
        var characterList = this.storage.list();
        var predefineCharacterList = this.storage.listPredefineCharacter();
        predefineCharacterList.forEach(function (character) {
            if (!character.get("is initalize")) {
                character.initalize(_this.canvas, _this.game, _this.character);
                characterList.push(character);
            }
        });
        predefineCharacterList.length = 0;
        this.storage.clear();
        characterList.forEach(function (character) {
            if (!character.get("is destroyed")) {
                var path = String();
                if (!(_this.character instanceof __1.Game))
                    path = path.concat(_this.character.get("path")).concat("/").concat(character.get("name"));
                else
                    path = path.concat(character.get("name"));
                character.set("path", path);
                character.update(dt);
                _this.storage.nativeAdd(character);
                _this.render.add(character.get("z index"), character);
            }
        });
    };
    return Updater;
}());
exports.default = Updater;
