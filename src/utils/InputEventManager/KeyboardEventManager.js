"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var KeyboardEventManager = /** @class */ (function () {
    /**
     * 🛠 utility class to handle the keyboard input from the user
     * @param game instance of the `Game`
    */
    function KeyboardEventManager(game) {
        this.keyMap = new Map();
        this.game = game;
    }
    /**
     * public method to register a key combination from the keyboard
     * @param keyCombination the key combination to register
     */
    KeyboardEventManager.prototype.register = function (keyCombination) {
        this.keyMap.set(keyCombination, String());
    };
    /**
     * public method to remove a registered key combination
     * @param keyCombination the key combination to remove
     */
    KeyboardEventManager.prototype.unregister = function (keyCombination) {
        this.keyMap.delete(keyCombination);
    };
    /**
     * public method to called when the user interaction with the keyboard
     * @param ev Javascript object that describe the user interaction with the keyboard
     */
    KeyboardEventManager.prototype.onKeyPress = function (ev) {
        var notAccepted = new Set([
            "Shift",
            "Control",
            "Alt"
        ]);
        var keyCombination = String();
        if (ev.ctrlKey)
            keyCombination = keyCombination.concat("CTRL+".toUpperCase());
        if (ev.shiftKey)
            keyCombination = keyCombination.concat("SHIFT+".toUpperCase());
        if (ev.altKey)
            keyCombination = keyCombination.concat("ALT+".toUpperCase());
        if (!notAccepted.has(ev.key))
            keyCombination = keyCombination.concat(ev.key.toUpperCase());
        if (this.keyMap.has(keyCombination))
            console.log(keyCombination);
    };
    return KeyboardEventManager;
}());
exports.default = KeyboardEventManager;
