"use strict";
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
var EventEmitter = /** @class */ (function () {
    /**
     * 🛠 utility class to handle calling and setting of different event of a character
     * @param character instance of the character
     */
    function EventEmitter(character) {
        this.eventMap = new Map();
        this.character = character;
    }
    /**
     * public method to set an event
     * @param event name of event to add
     * @param callback callback function to call when the event is emitted
     */
    EventEmitter.prototype.on = function (event, callback) {
        this.eventMap.set(event, callback);
    };
    /**
     * public method to call an event
     * @param event name of event to emit
     * @param args function arguments of the event
     * @returns return `true` if the event is emitted else return `false`
     */
    EventEmitter.prototype.emit = function (event) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (this.eventMap.has(event)) {
            var callback = this.eventMap.get(event);
            callback.apply(null, __spreadArray([this.character], args, true));
            return true;
        }
        else {
            return false;
        }
    };
    return EventEmitter;
}());
exports.default = EventEmitter;
