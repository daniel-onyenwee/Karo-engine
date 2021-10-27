"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PointerInputEvent = exports.PointerEventDetector = void 0;
var math_1 = require("../../libs/math");
/**
 * 🛠 utility class use to detect mouse, pen and touch event
 */
var PointerEventDetector = /** @class */ (function () {
    function PointerEventDetector() {
        this._inputEvent = null;
        this._characterDetected = null;
    }
    Object.defineProperty(PointerEventDetector.prototype, "inputEvent", {
        get: function () {
            return this._inputEvent;
        },
        set: function (inputEvent) {
            this._inputEvent = inputEvent;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PointerEventDetector.prototype, "characterDetected", {
        get: function () {
            return this._characterDetected;
        },
        set: function (characterDetected) {
            this._characterDetected = characterDetected;
        },
        enumerable: false,
        configurable: true
    });
    return PointerEventDetector;
}());
exports.PointerEventDetector = PointerEventDetector;
var PointerInputEvent = /** @class */ (function () {
    /**
     * 🛠 utility class that contain information about a pointer(mouse, pen, touch) event
     * @param device indicates the device type that caused the event (mouse, pen, touch, etc.)
     * @param pressure the normalized pressure of the pointer input in the range of 0 to 1, where 0 and 1 represent the minimum and maximum pressure the hardware is capable of detecting, respectively
     * @param height the height (magnitude on the Y axis), in CSS pixels, of the contact geometry of the pointer
     * @param width the width (magnitude on the X axis), in CSS pixels, of the contact geometry of the pointer
     * @param position the X-Y position on the screen the device touch/hit
     * @param otherPosition a vector type array of the other position the device touch/hit after the first touch/hit
     * @param tiltPosition a vector object containing the plane angle (in degrees, in the range of -90 to 90) between the Y–Z plane and the plane containing both the pointer (e.g. pen stylus) axis and the Y axis as the `y` value and between the X–Z plane and the plane containing both the pointer (e.g. pen stylus) axis and the X axis as the `x` value
     * @param twist the clockwise rotation of the pointer (e.g. pen stylus) around its major axis in degrees, with a value in the range 0 to 359
     * @param time the number of time in seconds the event happed
     * @param type indicates the type of event canused device (move, drag, press, release, right press, right release, swipe up, swipe down, swipe right, swipe left)
     */
    function PointerInputEvent(device, pressure, height, width, position, otherPosition, tiltPosition, twist, time, type) {
        this._device = "mouse";
        this._otherPosition = Array();
        this._tiltPosition = new math_1.Vector2();
        this._twist = 0;
        this._device = device;
        this._pressure = pressure;
        this._height = height;
        this._width = width;
        this._position = position;
        this._otherPosition = otherPosition;
        this._tiltPosition = tiltPosition;
        this._twist = twist;
        this._time = time;
        this._type = type;
    }
    Object.defineProperty(PointerInputEvent.prototype, "device", {
        /**
         * indicates the device type that caused the event (mouse, pen, touch, etc.)
         */
        get: function () {
            return this._device;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PointerInputEvent.prototype, "pressure", {
        /**
         * the normalized pressure of the pointer input in the range of 0 to 1, where 0 and 1 represent the minimum and maximum pressure the hardware is capable of detecting, respectively
         */
        get: function () {
            return this._pressure;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PointerInputEvent.prototype, "height", {
        /**
         * the height (magnitude on the Y axis), in CSS pixels, of the contact geometry of the pointer
         */
        get: function () {
            return this._height;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PointerInputEvent.prototype, "width", {
        /**
         * the width (magnitude on the X axis), in CSS pixels, of the contact geometry of the pointer
         */
        get: function () {
            return this._width;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PointerInputEvent.prototype, "position", {
        /**
         * the X-Y position on the screen the device touch/hit
         */
        get: function () {
            return this._position;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PointerInputEvent.prototype, "otherPosition", {
        /**
         * a vector type array of the other position the device touch/hit after the first touch/hit
         */
        get: function () {
            return this._otherPosition;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PointerInputEvent.prototype, "tiltPosition", {
        /**
         * a vector object containing the plane angle (in degrees, in the range of -90 to 90) between the Y–Z plane and the plane containing both the pointer (e.g. pen stylus) axis and the Y axis as the `y` value and between the X–Z plane and the plane containing both the pointer (e.g. pen stylus) axis and the X axis as the `x` value
         */
        get: function () {
            return this._tiltPosition;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PointerInputEvent.prototype, "twist", {
        /**
         * the clockwise rotation of the pointer (e.g. pen stylus) around its major axis in degrees, with a value in the range 0 to 359
         */
        get: function () {
            return this._twist;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PointerInputEvent.prototype, "time", {
        /**
         * the number of time in seconds the event happed
         */
        get: function () {
            return this._time;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PointerInputEvent.prototype, "type", {
        /**
         * indicates the type of event canused device (move, drag, press, release, right press, right release, swipe up, swipe down, swipe right, swipe left)
         */
        get: function () {
            return this._type;
        },
        enumerable: false,
        configurable: true
    });
    return PointerInputEvent;
}());
exports.PointerInputEvent = PointerInputEvent;
var PointerEventManager = /** @class */ (function () {
    /**
     * 🛠 utility class to mouse, pen and touch event
     * @param canvas instance of the `HTMLCanvasElement`
     * @param game instance of the `Game` object
     * @param gameInputHandle callback function called when the event is trigged
     */
    function PointerEventManager(canvas, game, gameInputHandle) {
        this.swipeStartPosition = new math_1.Vector2();
        this.swipeStarted = false;
        this.isPointerPressed = false;
        this.device = "mouse";
        this.position = new math_1.Vector2();
        this.otherPosition = Array();
        this.tiltPosition = new math_1.Vector2();
        this.isDraging = false;
        this.twist = 0;
        this.canvas = canvas;
        this.game = game;
        this.gameInputHandle = gameInputHandle;
        this.setEventListeners();
    }
    /**
     * private method to handle browser pointer event
     * @param event instance of the `PointerEvent` object
     */
    PointerEventManager.prototype.pointerEventHandle = function (event) {
        var time = 0, type = "move";
        this.device = event.pointerType;
        this.position.setX = event.clientX - this.canvas.getBoundingClientRect().left;
        this.position.setY = event.clientY - -this.canvas.getBoundingClientRect().top;
        time = event.timeStamp / 1000;
        this.height = event.height;
        this.width = event.width;
        this.pressure = event.pressure;
        this.tiltPosition.setY = event.tiltY;
        this.tiltPosition.setX = event.tiltX;
        this.twist = event.twist;
        if (event.type == "pointermove" || event.type == "pointerover") {
            if (this.isPointerPressed) {
                type = "drag";
                this.isDraging = true;
            }
            else if (!this.isPointerPressed)
                type = "move";
        }
        if (event.type == "pointerdown") {
            type = "press";
            this.isPointerPressed = true;
            if (event.button == 2) {
                type = "right press";
                this.isPointerPressed = false;
            }
        }
        if (event.type == "pointerup") {
            if (!this.isDraging) {
                type = "release";
                if (event.button == 2)
                    type = "right release";
            }
            this.isPointerPressed = false;
            this.isDraging = false;
        }
        this.gameInputHandle(new PointerInputEvent(this.device, this.pressure, this.height, this.width, this.position, this.otherPosition, this.tiltPosition, this.twist, time, type));
    };
    /**
     * private method to handle touch device swipe event
     * @eventName name of the touch event trigged
     * @param event instance of the `TouchEvent` object
     */
    PointerEventManager.prototype.swipeEventHandle = function (eventName, event) {
        var swipePositionDiff = new math_1.Vector2(), type = "move", time = event.timeStamp / 1000;
        if (eventName == "touchstart") {
            this.swipeStartPosition.setX = event.touches[0].clientX;
            this.swipeStartPosition.setY = event.touches[0].clientY;
            this.position = this.swipeStartPosition;
            this.swipeStarted = true;
        }
        else if (eventName == "touchmove") {
            if (this.swipeStarted) {
                var otherSwipePosition = new math_1.Vector2(event.touches[0].clientX, event.touches[0].clientY);
                this.otherPosition = Array();
                this.otherPosition.push(otherSwipePosition);
                swipePositionDiff = this.swipeStartPosition.substr(otherSwipePosition);
                swipePositionDiff = new math_1.Vector2(Math.abs(swipePositionDiff.x), Math.abs(swipePositionDiff.y));
                if (swipePositionDiff.x > swipePositionDiff.y) {
                    if (swipePositionDiff.x > 0)
                        type = "swipe right";
                    else
                        type = "swipe left";
                }
                else {
                    if (swipePositionDiff.y > 0)
                        type = "swipe down";
                    else
                        type = "swipe up";
                }
                this.swipeStartPosition = new math_1.Vector2();
                this.swipeStarted = false;
            }
        }
        this.gameInputHandle(new PointerInputEvent(this.device, this.pressure, this.height, this.width, this.position, this.otherPosition, this.tiltPosition, this.twist, time, type));
    };
    /**
     * public method to set the mouse, pen and touch event listeners
     */
    PointerEventManager.prototype.setEventListeners = function () {
        var _this = this;
        this.canvas.ondragstart = function () { return false; };
        this.canvas.style.touchAction = "none";
        this.canvas.addEventListener("touchstart", function (ev) {
            if (_this.game.isplaying)
                _this.swipeEventHandle("touchstart", ev);
        }, false);
        this.canvas.addEventListener("touchmove", function (ev) {
            if (_this.game.isplaying)
                _this.swipeEventHandle("touchmove", ev);
        }, false);
        this.canvas.addEventListener("pointerdown", function (ev) {
            if (_this.game.isplaying)
                _this.pointerEventHandle(ev);
        });
        this.canvas.addEventListener("pointermove", function (ev) {
            if (_this.game.isplaying)
                _this.pointerEventHandle(ev);
        });
        this.canvas.addEventListener("pointerover", function (ev) {
            if (_this.game.isplaying)
                _this.pointerEventHandle(ev);
        });
        this.canvas.addEventListener("pointerup", function (ev) {
            if (_this.game.isplaying)
                _this.pointerEventHandle(ev);
        });
    };
    return PointerEventManager;
}());
exports.default = PointerEventManager;
