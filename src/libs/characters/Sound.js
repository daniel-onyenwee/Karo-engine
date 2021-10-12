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
var Sound = /** @class */ (function (_super) {
    __extends(Sound, _super);
    /**
     * a character use to play sounds
     * @param propertyOption property of the sound character
     */
    function Sound(propertyOption) {
        var _this = _super.call(this, {
            name: propertyOption.name,
            "z index": propertyOption["z index"],
            opacity: propertyOption.opacity,
            visible: propertyOption.visible
        }) || this;
        _this.audio = null;
        _this._type = "Sound";
        _this.propertyManager.scheme({
            source: propertyOption.source != undefined ? propertyOption.source : String(),
            repeat: propertyOption.repeat != undefined ? propertyOption.repeat : false,
            rate: propertyOption.rate != undefined ? propertyOption.rate : 1,
            volume: propertyOption.volume != undefined ? propertyOption.volume : 100,
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
    Sound.prototype.update = function (dt) {
        var _this = this;
        if (this.get("is initalize") && !this.get("is destroyed")) {
            if (this.audio == null) {
                var audioSource = this.get("source");
                var audioAsset = this.game.asset(audioSource);
                if (audioAsset != null) {
                    if (audioAsset.type == "audio") {
                        this.audio = audioAsset.data.cloneNode(true);
                    }
                }
            }
            else {
                this.audio.volume = this.get("volume") / 100;
                this.audio.loop = this.get("repeat");
                this.audio.playbackRate = this.get("rate");
                this.audio.onended = function () {
                    var _a;
                    if (!_this.get("repeat")) {
                        _this.set("play", false);
                        (_a = _this.audio) === null || _a === void 0 ? void 0 : _a.pause();
                    }
                };
            }
            if (this.audio != null) {
                if (this.get("play") == true) {
                    if (this.audio.paused)
                        this.audio.play();
                }
                else if (this.get("play") == false) {
                    this.audio.pause();
                }
            }
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
    Sound.prototype.render = function (graphics, displayPosition, displayScale, displayRotation) {
        if (this.get("is initalize") && !this.get("is destroyed") && this.get("visible")) {
            this.displayPosition = displayPosition;
            this.displayScale = displayScale;
            this.displayRotation = displayRotation;
            this.Render.render(graphics, this.displayPosition, this.displayScale, this.displayRotation);
        }
    };
    return Sound;
}(_1.Container));
exports.default = Sound;
