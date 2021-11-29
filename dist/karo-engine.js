var KaroEngine;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Math = exports.Character = exports.Game = void 0;
var libs_1 = __webpack_require__(/*! ./libs */ "./src/libs/index.ts");
Object.defineProperty(exports, "Game", ({ enumerable: true, get: function () { return libs_1.Game; } }));
Object.defineProperty(exports, "Character", ({ enumerable: true, get: function () { return libs_1.Character; } }));
Object.defineProperty(exports, "Math", ({ enumerable: true, get: function () { return libs_1.Math; } }));


/***/ }),

/***/ "./src/libs/Game.ts":
/*!**************************!*\
  !*** ./src/libs/Game.ts ***!
  \**************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var Slim = __importStar(__webpack_require__(/*! ../utils/slim */ "./src/utils/slim/index.ts"));
var math_1 = __webpack_require__(/*! ./math */ "./src/libs/math/index.ts");
var AssetLoader_1 = __importDefault(__webpack_require__(/*! ../utils/AssetLoader */ "./src/utils/AssetLoader.ts"));
var InputEventManager_1 = __webpack_require__(/*! ../utils/InputEventManager */ "./src/utils/InputEventManager/index.ts");
var PointerEventManager_1 = __webpack_require__(/*! ../utils/InputEventManager/PointerEventManager */ "./src/utils/InputEventManager/PointerEventManager.ts");
var Camera_1 = __importDefault(__webpack_require__(/*! ../utils/Camera */ "./src/utils/Camera.ts"));
var PropertyManager_1 = __importDefault(__webpack_require__(/*! ../utils/PropertyManager */ "./src/utils/PropertyManager.ts"));
var DataManager_1 = __importDefault(__webpack_require__(/*! ../utils/DataManager */ "./src/utils/DataManager.ts"));
var EventEmitter_1 = __importDefault(__webpack_require__(/*! ../utils/EventEmitter */ "./src/utils/EventEmitter.ts"));
var Game = /** @class */ (function () {
    /**
     * a javascript class to create the karo engine game object
     * @param propertyOption property of game class
     */
    function Game(propertyOption) {
        var _this_1 = this;
        this.oldTime = 0;
        this.assetsLoader = new AssetLoader_1.default();
        this.Render = new Slim.Render();
        this.Storage = new Slim.Storage(this);
        this.camera = new Camera_1.default(this);
        this.propertyManager = new PropertyManager_1.default();
        this.eventEmitter = new EventEmitter_1.default(this);
        this.isReady = false;
        this._isplaying = true;
        /**
         * public method to set an event
         * @param event name of event to add
         * @param callback callback function to call when the event is emitted
         */
        this.on = this.eventEmitter.on.bind(this.eventEmitter);
        /**
         * public method to call an event
         * @param event name of event to emit
         * @param args function arguments of the event
         * @returns return `true` if the event is emitted else return `false`
         */
        this.emit = this.eventEmitter.emit.bind(this.eventEmitter);
        /**
         * public method to set a property
         * @param name name name of the property to set
         * @param value value to set the property with
         */
        this.set = this.propertyManager.set.bind(this.propertyManager);
        this.store = new DataManager_1.default(this);
        /**
         * public method to get a property
         * @param name name name of the property to get
         * @returns if property exist return it value else return `null`
         */
        this.get = this.propertyManager.get.bind(this.propertyManager);
        /**
         * public method to load a list of assets
         * @param assets list of assets to load
         */
        this.load = this.assetsLoader.load.bind(this.assetsLoader);
        /**
         * public method to delete a list of assets
         * @param assets list of assets to delete
         */
        this.delete = this.assetsLoader.delete.bind(this.assetsLoader);
        /**
         * public method to get an assets
         * @param asset name of asset to get
         * @returns if asset exist return a Javascript object containing the asset data else return `null`
         */
        this.asset = this.assetsLoader.asset.bind(this.assetsLoader);
        /**
         * public method to check if an asset exist
         * @param asset name of asset to check if exist
         * @returns if asset exist return `true` else return `false`
         */
        this.check = this.assetsLoader.asset.bind(this.assetsLoader);
        /**
         * public method add a character to the `Storage` instance
         * @param character character to add
         */
        this.add = this.Storage.add.bind(this.Storage);
        /**
         * public method to get a character
         * @param path character path (e.g `character/character_child`)
         * @returns return the character instance if the character exist else return `null`
         */
        this.child = this.Storage.child.bind(this.Storage);
        /**
         * public method to check if a character exist
         * @param path character path (e.g `character/character_child`)
         * @returns return `true` if character exist else return `false`
        */
        this.has = this.Storage.has.bind(this.Storage);
        /**
         * public method to get all the character properties
         * @returns return an `Array` of type object
         */
        this.allProperties = this.propertyManager.allProperties.bind(this.propertyManager);
        this.keyboardEvent = new InputEventManager_1.KeyboardEventManager(this);
        this.pointerEventDetector = new PointerEventManager_1.PointerEventDetector();
        /**
         * public method to register a key combination from the keyboard
         * @param keyCombination the key combination to register
         */
        this.register = this.keyboardEvent.register.bind(this.keyboardEvent);
        /**
         * public method to remove a registered key combination
         * @param keyCombination the key combination to remove
         */
        this.unregister = this.keyboardEvent.unregister.bind(this.keyboardEvent);
        this.propertyManager.scheme({
            "background color": propertyOption["background color"] != undefined ? propertyOption["background color"] : new math_1.Color(255, 255, 255, 1),
            name: propertyOption.name != undefined ? propertyOption.name : "New Game",
            author: propertyOption.author != undefined ? propertyOption.author : "Quality Builder",
            description: propertyOption.description != undefined ? propertyOption.description : String(),
            version: propertyOption.version != undefined ? propertyOption.version : "1.0.0",
            icon: propertyOption.icon != undefined ? propertyOption.icon : String()
        });
        this.canvas = propertyOption.canvas;
        this.graphic = this.canvas.getContext("2d");
        this.Updater = new Slim.Updater(this.canvas, this, this, this.Storage, this.Render);
        this.pointerEvent = new InputEventManager_1.PointerEventManager(this.canvas, this, function (event) { return _this_1.pointerEventDetector.inputEvent = event; });
    }
    Object.defineProperty(Game.prototype, "isplaying", {
        get: function () {
            return this._isplaying;
        },
        set: function (value) {
            this._isplaying = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "tree", {
        /**
         * public getter to character tree structure
         */
        get: function () {
            return this.Storage.characterTree;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "type", {
        /**
         * public getter to get the type of the character
         */
        get: function () {
            return "Game";
        },
        enumerable: false,
        configurable: true
    });
    /**
     * public method to play the game loop
     */
    Game.prototype.play = function () {
        this.isplaying = true;
    };
    /**
     * public method to stop the game loop
     */
    Game.prototype.stop = function () {
        this.isplaying = false;
    };
    /**
     * public method to fix blurry nature of the canvas
     * @param canvas instance of `HTMLCanvasElement` to sharpen
     * @returns the sharpen html canvas element `CanvasRenderingContext2D` instance
     */
    Game.prototype.sharpenCanvas = function (canvas) {
        var dpr = window.devicePixelRatio || 1;
        var rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        var ctx = canvas.getContext('2d');
        ctx.constructor.prototype.isGraphicInPath = function (x, y, region) {
            var _this = this;
            if (region != undefined) {
                _this.beginPath();
                _this.rect(region.x, region.y, region.w, region.h);
            }
            return _this.isPointInPath(x, y) ? true : _this.isPointInStroke(x, y) ? true : false;
        };
        ctx.constructor.prototype.devicePixelRatio = dpr;
        ctx.scale(dpr, dpr);
        return ctx;
    };
    /**
     * public method to draw the game
     * @param time number of second since the browser was last rendered
     */
    Game.prototype.draw = function (time) {
        var _this_1 = this;
        if (this.isplaying) {
            var dt_1 = (time - this.oldTime) / 1000;
            this.oldTime = time;
            this.graphic = this.sharpenCanvas(this.canvas);
            this.canvas.style.backgroundColor = this.get("background color").toString();
            this.assetsLoader.isAssetsLoaded()
                .then(function () {
                if (!_this_1.isReady) {
                    _this_1.eventEmitter.emit("ready");
                    _this_1.isReady = true;
                }
                _this_1.graphic.clearRect(0, 0, _this_1.canvas.width, _this_1.canvas.height);
                _this_1.eventEmitter.emit("update", dt_1);
                _this_1.Updater.update(dt_1);
                _this_1.Render.render(_this_1.graphic, new math_1.Vector2(0, 0), new math_1.Vector2(1, 1), 0);
                if (_this_1.pointerEventDetector.characterDetected != null && _this_1.pointerEventDetector.inputEvent != null) {
                    _this_1.pointerEventDetector.characterDetected.emit("input", _this_1.pointerEventDetector.inputEvent);
                }
                else {
                    if (_this_1.pointerEventDetector.inputEvent != null)
                        _this_1.emit("input", _this_1.pointerEventDetector.inputEvent);
                }
                _this_1.pointerEventDetector.characterDetected = null;
                _this_1.pointerEventDetector.inputEvent = null;
            });
        }
    };
    /**
     * public method to called when the user interaction with the keyboard
     * @param ev Javascript object that describe the user interaction with the keyboard
     */
    Game.prototype.onKeyPress = function (ev) {
        this.keyboardEvent.onKeyPress(ev);
    };
    Object.defineProperty(Game.prototype, "offset", {
        /**
        * public getter to get the camera offset
        */
        get: function () {
            return this.camera.offset;
        },
        /**
         * public setter to set the camera offset
         */
        set: function (value) {
            this.camera.offset = value;
        },
        enumerable: false,
        configurable: true
    });
    return Game;
}());
exports["default"] = Game;


/***/ }),

/***/ "./src/libs/characters/Arc.ts":
/*!************************************!*\
  !*** ./src/libs/characters/Arc.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
var _1 = __webpack_require__(/*! . */ "./src/libs/characters/index.ts");
var __1 = __webpack_require__(/*! .. */ "./src/libs/index.ts");
var math_1 = __webpack_require__(/*! ../math */ "./src/libs/math/index.ts");
var Arc = /** @class */ (function (_super) {
    __extends(Arc, _super);
    /**
     * a character use to draw arcs and circles
     * @param propertyOption property of the arc character
     */
    function Arc(propertyOption) {
        var _this = _super.call(this, {
            name: propertyOption.name,
            position: propertyOption.position,
            scale: propertyOption.scale,
            rotation: propertyOption.rotation,
            "z index": propertyOption["z index"],
            opacity: propertyOption.opacity,
            visible: propertyOption.visible
        }) || this;
        _this._type = "Arc";
        _this.propertyManager.scheme({
            fill: propertyOption.fill != undefined ? propertyOption.fill : true,
            "shadow offset": propertyOption["shadow offset"] != undefined ? propertyOption["shadow offset"] : new math_1.Vector2(0, 0),
            "shadow blur": propertyOption["shadow blur"] != undefined ? propertyOption["shadow blur"] : 0,
            "line width": propertyOption["line width"] != undefined ? propertyOption["line width"] : 1,
            anticlockwise: propertyOption.anticlockwise != undefined ? propertyOption.anticlockwise : false,
            color: propertyOption.color != undefined ? propertyOption.color : new math_1.Color(0, 0, 0, 1),
            radius: propertyOption.radius != undefined ? propertyOption.radius : 10,
            "shadow color": propertyOption["shadow color"] != undefined ? propertyOption["shadow color"] : new math_1.Color(0, 0, 0, 0),
            "start angle": propertyOption["start angle"] != undefined ? propertyOption["start angle"] : 0,
            "end angle": propertyOption["end angle"] != undefined ? propertyOption["end angle"] : 360,
        });
        return _this;
    }
    /**
     * public method to render the character
     * @param graphic instance of `CanvasRenderingContext2D` use to draw the character
     * @param displayPosition actual position of the character on the canvas
     * @param displayScale actual scale of the character
     * @param displayRotation actual rotation of the character
     */
    Arc.prototype.render = function (graphics, displayPosition, displayScale, displayRotation) {
        if (this.get("is initialize") && !this.get("is destroyed") && this.get("visible")) {
            this.displayPosition = displayPosition.add(this.get("position"));
            this.displayScale = displayScale.multiply(this.get("scale"));
            this.displayRotation = displayRotation + this.get("rotation");
            graphics.save();
            graphics.translate(this.displayPosition.x, this.displayPosition.y);
            graphics.rotate(this.displayRotation * Math.PI / 180);
            graphics.scale(this.displayScale.x, this.displayScale.y);
            graphics.translate(-this.displayPosition.x, -this.displayPosition.y);
            graphics.globalAlpha = (this.parent instanceof __1.Game ? this.get("opacity") : this.parent.get("opacity") * this.get("opacity"));
            graphics.shadowBlur = this.get("shadow blur");
            graphics.shadowColor = this.get("shadow color").toString();
            graphics.shadowOffsetX = this.get("shadow offset").x;
            graphics.shadowOffsetY = this.get("shadow offset").y;
            graphics.beginPath();
            if (this.get("fill") == true) {
                graphics.fillStyle = this.get("color").toString();
                graphics.arc(this.displayPosition.x - this.game.offset.x, this.displayPosition.y - this.game.offset.y, this.get("radius"), this.get("start angle"), this.get("end angle"), this.get("anticlockwise"));
                graphics.fill();
            }
            else if (this.get("fill") == false) {
                graphics.lineWidth = this.get("line width");
                graphics.strokeStyle = this.get("color").toString();
                graphics.arc(this.displayPosition.x - this.game.offset.x, this.displayPosition.y - this.game.offset.y, this.get("radius"), this.get("start angle"), this.get("end angle"), this.get("anticlockwise"));
                graphics.stroke();
            }
            graphics.restore();
            var pointerEvent = this.game.pointerEventDetector.inputEvent;
            if (pointerEvent != null) {
                var inPoint = graphics.isPointInPath(pointerEvent.position.x, pointerEvent.position.y) ?
                    true : graphics.isPointInStroke(pointerEvent.position.x, pointerEvent.position.y) ?
                    true : false;
                var alpha = (this.parent instanceof __1.Game ? this.get("opacity") : this.parent.get("opacity") * this.get("opacity"));
                var color = this.get("color");
                if (inPoint && alpha > 0 && color.alpha > 0) {
                    this.game.pointerEventDetector.characterDetected = this;
                }
            }
            this.Render.render(graphics, this.displayPosition, this.displayScale, this.displayRotation);
        }
    };
    return Arc;
}(_1.Container));
exports["default"] = Arc;


/***/ }),

/***/ "./src/libs/characters/Box.ts":
/*!************************************!*\
  !*** ./src/libs/characters/Box.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
var _1 = __webpack_require__(/*! . */ "./src/libs/characters/index.ts");
var __1 = __webpack_require__(/*! .. */ "./src/libs/index.ts");
var math_1 = __webpack_require__(/*! ../math */ "./src/libs/math/index.ts");
var Box = /** @class */ (function (_super) {
    __extends(Box, _super);
    /**
     * a character use to draw a box
     * @param propertyOption property of the box character
     */
    function Box(propertyOption) {
        var _this = _super.call(this, {
            name: propertyOption.name,
            position: propertyOption.position,
            scale: propertyOption.scale,
            rotation: propertyOption.rotation,
            "z index": propertyOption["z index"],
            opacity: propertyOption.opacity,
            visible: propertyOption.visible
        }) || this;
        _this._type = "Box";
        _this.propertyManager.scheme({
            height: propertyOption.height != undefined ? propertyOption.height : 40,
            width: propertyOption.width != undefined ? propertyOption.width : 40,
            fill: propertyOption.fill != undefined ? propertyOption.fill : true,
            "shadow offset": propertyOption["shadow offset"] != undefined ? propertyOption["shadow offset"] : new math_1.Vector2(0, 0),
            "shadow blur": propertyOption["shadow blur"] != undefined ? propertyOption["shadow blur"] : 0,
            "line width": propertyOption["line width"] != undefined ? propertyOption["line width"] : 1,
            color: propertyOption.color != undefined ? propertyOption.color : new math_1.Color(0, 0, 0, 1),
            "shadow color": propertyOption["shadow color"] != undefined ? propertyOption["shadow color"] : new math_1.Color(0, 0, 0, 0)
        });
        return _this;
    }
    /**
     * public method to render the character
     * @param graphic instance of `CanvasRenderingContext2D` use to draw the character
     * @param displayPosition actual position of the character on the canvas
     * @param displayScale actual scale of the character
     * @param displayRotation actual rotation of the character
     */
    Box.prototype.render = function (graphics, displayPosition, displayScale, displayRotation) {
        if (this.get("is initialize") && !this.get("is destroyed") && this.get("visible")) {
            this.displayPosition = displayPosition.add(this.get("position"));
            this.displayScale = displayScale.multiply(this.get("scale"));
            this.displayRotation = displayRotation + this.get("rotation");
            graphics.save();
            graphics.translate(this.displayPosition.x, this.displayPosition.y);
            graphics.rotate(this.displayRotation * Math.PI / 180);
            graphics.scale(this.displayScale.x, this.displayScale.y);
            graphics.translate(-this.displayPosition.x, -this.displayPosition.y);
            graphics.globalAlpha = (this.parent instanceof __1.Game ? this.get("opacity") : this.parent.get("opacity") * this.get("opacity"));
            graphics.shadowBlur = this.get("shadow blur");
            graphics.shadowColor = this.get("shadow color").toString();
            graphics.shadowOffsetX = this.get("shadow offset").x;
            graphics.shadowOffsetY = this.get("shadow offset").y;
            graphics.lineWidth = this.get("line width");
            var x = ((this.displayPosition.x) - this.get("width") / 2) - this.game.offset.x;
            var y = ((this.displayPosition.y) - this.get("height") / 2) - this.game.offset.y;
            graphics.beginPath();
            if (this.get("fill") == true)
                graphics.fillStyle = this.get("color").toString();
            else if (this.get("fill") == false)
                graphics.strokeStyle = this.get("color").toString();
            graphics.rect(x, y, this.get("width"), this.get("height"));
            if (this.get("fill") == true)
                graphics.fill();
            else if (this.get("fill") == false)
                graphics.stroke();
            var pointerEvent = this.game.pointerEventDetector.inputEvent;
            if (pointerEvent != null) {
                var inPoint = Object(graphics).isGraphicInPath((pointerEvent.position.x + x), (pointerEvent.position.y + y));
                var alpha = (this.parent instanceof __1.Game ? this.get("opacity") : this.parent.get("opacity") * this.get("opacity"));
                var color = this.get("color");
                if (inPoint && alpha > 0 && color.alpha > 0) {
                    this.game.pointerEventDetector.characterDetected = this;
                }
            }
            graphics.restore();
            this.Render.render(graphics, this.displayPosition, this.displayScale, this.displayRotation);
        }
    };
    return Box;
}(_1.Container));
exports["default"] = Box;


/***/ }),

/***/ "./src/libs/characters/Condition.ts":
/*!******************************************!*\
  !*** ./src/libs/characters/Condition.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
var _1 = __webpack_require__(/*! . */ "./src/libs/characters/index.ts");
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
        if (this.get("is initialize") && !this.get("is destroyed")) {
            var condition = this.get("condition");
            var rightSide = this.get("right side");
            var leftSide = this.get("left side");
            if (this.get("play") == true) {
                if (condition == "equal to") {
                    if (leftSide == rightSide) {
                        this.eventEmitter.emit("is true");
                    }
                    else {
                        this.eventEmitter.emit("is false");
                    }
                }
                else if (condition == "greater than") {
                    if (typeof leftSide == "number" && typeof rightSide == "number") {
                        if (leftSide > rightSide) {
                            this.eventEmitter.emit("is true");
                        }
                        else {
                            this.eventEmitter.emit("is false");
                        }
                    }
                }
                else if (condition == "greater than or equal to") {
                    if (typeof leftSide == "number" && typeof rightSide == "number") {
                        if (leftSide >= rightSide) {
                            this.eventEmitter.emit("is true");
                        }
                        else {
                            this.eventEmitter.emit("is false");
                        }
                    }
                }
                else if (condition == "less than") {
                    if (typeof leftSide == "number" && typeof rightSide == "number") {
                        if (leftSide < rightSide) {
                            this.eventEmitter.emit("is true");
                        }
                        else {
                            this.eventEmitter.emit("is false");
                        }
                    }
                }
                else if (condition == "less than or equal to") {
                    if (typeof leftSide == "number" && typeof rightSide == "number") {
                        if (leftSide <= rightSide) {
                            this.eventEmitter.emit("is true");
                        }
                        else {
                            this.eventEmitter.emit("is false");
                        }
                    }
                }
                else if (condition == "not") {
                    if (leftSide != rightSide) {
                        this.eventEmitter.emit("is true");
                    }
                    else {
                        this.eventEmitter.emit("is false");
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
        if (this.get("is initialize") && !this.get("is destroyed") && this.get("visible")) {
            this.displayPosition = displayPosition;
            this.displayScale = displayScale;
            this.displayRotation = displayRotation;
            this.Render.render(graphics, this.displayPosition, this.displayScale, this.displayRotation);
        }
    };
    return Condition;
}(_1.Container));
exports["default"] = Condition;


/***/ }),

/***/ "./src/libs/characters/Container.ts":
/*!******************************************!*\
  !*** ./src/libs/characters/Container.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var PropertyManager_1 = __importDefault(__webpack_require__(/*! ../../utils/PropertyManager */ "./src/utils/PropertyManager.ts"));
var math_1 = __webpack_require__(/*! ../math */ "./src/libs/math/index.ts");
var Slim = __importStar(__webpack_require__(/*! ../../utils/slim */ "./src/utils/slim/index.ts"));
var DataManager_1 = __importDefault(__webpack_require__(/*! ../../utils/DataManager */ "./src/utils/DataManager.ts"));
var EventEmitter_1 = __importDefault(__webpack_require__(/*! ../../utils/EventEmitter */ "./src/utils/EventEmitter.ts"));
var Container = /** @class */ (function () {
    /**
     * a character with no special meaning at all but used to group other characters
     * @param propertyOption property of container character
     */
    function Container(propertyOption) {
        this.Render = new Slim.Render();
        this.Storage = new Slim.Storage(this);
        this.propertyManager = new PropertyManager_1.default();
        /**
         * public method to set a property
         * @param name name name of the property to set
         * @param value value to set the property with
         */
        this.set = this.propertyManager.set.bind(this.propertyManager);
        /**
         * public method to get a property
         * @param name name name of the property to get
         * @returns if property exist return it value else return `null`
         */
        this.get = this.propertyManager.get.bind(this.propertyManager);
        /**
         * public method add a character to the `Storage` instance
         * @param character character to add
         */
        this.add = this.Storage.add.bind(this.Storage);
        /**
         * public method to get all the character properties
         * @returns return an `Array` of type object
         */
        this.allProperties = this.propertyManager.allProperties.bind(this.propertyManager);
        /**
         * public method to get a character
         * @param path character path (e.g `character/character_child`)
         * @returns return the character instance if the character exist else return `null`
         */
        this.child = this.Storage.child.bind(this.Storage);
        this.eventEmitter = new EventEmitter_1.default(this);
        /**
         * public method to set an event
         * @param event name of event to add
         * @param callback callback function to call when the event is emitted
         */
        this.on = this.eventEmitter.on.bind(this.eventEmitter);
        /**
         * public method to call an event
         * @param event name of event to emit
         * @param args function arguments of the event
         * @returns return `true` if the event is emitted else return `false`
         */
        this.emit = this.eventEmitter.emit.bind(this.eventEmitter);
        this.store = new DataManager_1.default(this);
        /**
         * public method to check if a character exist
         * @param path character path (e.g `character/character_child`)
         * @returns return `true` if character exist else return `false`
         */
        this.has = this.Storage.has.bind(this.Storage);
        this._type = "Container";
        this.propertyManager.scheme({
            name: propertyOption.name,
            "is destroyed": { value: false, readonly: true, type: "boolean" },
            "is initialize": { value: false, readonly: true, type: "boolean" },
            path: String(),
            opacity: propertyOption.opacity != undefined ? propertyOption.opacity : 1,
            position: propertyOption.position != undefined ? propertyOption.position : new math_1.Vector2(0, 0),
            scale: propertyOption.scale != undefined ? propertyOption.scale : new math_1.Vector2(1, 1),
            rotation: propertyOption.rotation != undefined ? propertyOption.rotation : 0,
            visible: propertyOption.visible != undefined ? propertyOption.visible : true,
            "z index": propertyOption["z index"] != undefined ? propertyOption["z index"] : 1
        });
    }
    Object.defineProperty(Container.prototype, "tree", {
        /**
         * public getter to character tree structure
         */
        get: function () {
            return this.Storage.characterTree;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "type", {
        /**
         * public getter to get the type of the character
         */
        get: function () {
            return this._type;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "parent", {
        /**
         * public getter to get the parent of the character
         */
        get: function () {
            return this._parent;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "game", {
        /**
         * public getter to get the game instance
         */
        get: function () {
            return this._game;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * public method to initialize the character
     * @param canvas instance of the `HTMLCanvasElement`
     * @param game instance of the `Game`
     * @param parent parent character instance of the character
     */
    Container.prototype.initialize = function (canvas, game, parent) {
        if (!this.get("is initialize")) {
            this._parent = parent;
            this._game = game;
            this.canvas = canvas;
            this.propertyManager.override("is initialize", true);
            this.Updater = new Slim.Updater(this.canvas, this._game, this, this.Storage, this.Render);
            this.eventEmitter.emit("init");
        }
    };
    /**
     * public method to destroy the character
     */
    Container.prototype.destroy = function () {
        this.propertyManager.override("is destroyed", true);
    };
    /**
     * public method to update the character
     * @param dt time difference between the previous frame and the current time
     */
    Container.prototype.update = function (dt) {
        if (this.get("is initialize") && !this.get("is destroyed")) {
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
    Container.prototype.render = function (graphics, displayPosition, displayScale, displayRotation) {
        if (this.get("is initialize") && !this.get("is destroyed") && this.get("visible")) {
            this.displayPosition = displayPosition.add(this.get("position"));
            this.displayScale = displayScale.multiply(this.get("scale"));
            this.displayRotation = displayRotation + this.get("rotation");
            this.Render.render(graphics, this.displayPosition, this.displayScale, this.displayRotation);
        }
    };
    return Container;
}());
exports["default"] = Container;


/***/ }),

/***/ "./src/libs/characters/Image.ts":
/*!**************************************!*\
  !*** ./src/libs/characters/Image.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
var _1 = __webpack_require__(/*! . */ "./src/libs/characters/index.ts");
var __1 = __webpack_require__(/*! .. */ "./src/libs/index.ts");
var math_1 = __webpack_require__(/*! ../math */ "./src/libs/math/index.ts");
var Image = /** @class */ (function (_super) {
    __extends(Image, _super);
    /**
     * a character use to draw an image or group of images
     * @param propertyOption property of the image character
     */
    function Image(propertyOption) {
        var _this = _super.call(this, {
            name: propertyOption.name,
            position: propertyOption.position,
            scale: propertyOption.scale,
            rotation: propertyOption.rotation,
            "z index": propertyOption["z index"],
            opacity: propertyOption.opacity,
            visible: propertyOption.visible
        }) || this;
        _this.currentTime = 0;
        _this.currentIndex = 0;
        _this._type = "Image";
        _this.propertyManager.scheme({
            source: propertyOption.source != undefined ? { type: "Array<string>", readonly: false, value: propertyOption.source } : { type: "Array<string>", readonly: false, value: Array() },
            rate: propertyOption.rate != undefined ? propertyOption.rate : 1,
            height: propertyOption.height != undefined ? propertyOption.height : 40,
            width: propertyOption.width != undefined ? propertyOption.width : 40,
            "shadow offset": propertyOption["shadow offset"] != undefined ? propertyOption["shadow offset"] : new math_1.Vector2(0, 0),
            "shadow blur": propertyOption["shadow blur"] != undefined ? propertyOption["shadow blur"] : 0,
            "line width": propertyOption["line width"] != undefined ? propertyOption["line width"] : 1,
            "shadow color": propertyOption["shadow color"] != undefined ? propertyOption["shadow color"] : new math_1.Color(0, 0, 0, 0),
        });
        return _this;
    }
    /**
     * public method to update the character
     * @param dt time difference between the previous frame and the current time
     */
    Image.prototype.update = function (dt) {
        if (this.get("is initialize") && !this.get("is destroyed")) {
            if (this.get("source").length == 1) {
                this.currentIndex = 0;
            }
            else if (this.get("source").length > 1) {
                this.currentTime += dt;
                var rate = this.get("rate");
                if (this.currentTime >= rate) {
                    this.currentIndex += 1;
                    this.currentTime = 0;
                    this.currentIndex = this.currentIndex > (this.get("source").length - 1) ? 0 : this.currentIndex;
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
    Image.prototype.render = function (graphics, displayPosition, displayScale, displayRotation) {
        if (this.get("is initialize") && !this.get("is destroyed") && this.get("visible")) {
            this.displayPosition = displayPosition.add(this.get("position"));
            this.displayScale = displayScale.multiply(this.get("scale"));
            this.displayRotation = displayRotation + this.get("rotation");
            graphics.save();
            graphics.translate(this.displayPosition.x, this.displayPosition.y);
            graphics.rotate(this.displayRotation * Math.PI / 180);
            graphics.scale(this.displayScale.x, this.displayScale.y);
            graphics.translate(-this.displayPosition.x, -this.displayPosition.y);
            graphics.globalAlpha = (this.parent instanceof __1.Game ? this.get("opacity") : this.parent.get("opacity") * this.get("opacity"));
            graphics.shadowBlur = this.get("shadow blur");
            graphics.shadowColor = this.get("color").toString();
            graphics.shadowOffsetX = this.get("shadow offset").x;
            graphics.shadowOffsetY = this.get("shadow offset").y;
            var imageAssetsName = this.get("source")[this.currentIndex];
            if (imageAssetsName != undefined) {
                var imageAsset = this.game.asset(imageAssetsName);
                if (imageAsset != null) {
                    if (imageAsset.type == "image") {
                        graphics.drawImage(imageAsset.data, ((this.displayPosition.x) - this.get("width") / 2) - this.game.offset.x, ((this.displayPosition.y) - this.get("height") / 2) - this.game.offset.y, this.get("width"), this.get("height"));
                    }
                }
            }
            graphics.restore();
            var pointerEvent = this.game.pointerEventDetector.inputEvent;
            if (pointerEvent != null) {
                var inPoint = graphics.isPointInPath(pointerEvent.position.x, pointerEvent.position.y) ?
                    true : graphics.isPointInStroke(pointerEvent.position.x, pointerEvent.position.y) ?
                    true : false;
                var alpha = (this.parent instanceof __1.Game ? this.get("opacity") : this.parent.get("opacity") * this.get("opacity"));
                var color = this.get("color");
                if (inPoint && alpha > 0 && color.alpha > 0) {
                    this.game.pointerEventDetector.characterDetected = this;
                }
            }
            this.Render.render(graphics, this.displayPosition, this.displayScale, this.displayRotation);
        }
    };
    return Image;
}(_1.Container));
exports["default"] = Image;


/***/ }),

/***/ "./src/libs/characters/Loop.ts":
/*!*************************************!*\
  !*** ./src/libs/characters/Loop.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var _1 = __webpack_require__(/*! . */ "./src/libs/characters/index.ts");
var Loop = /** @class */ (function (_super) {
    __extends(Loop, _super);
    /**
     * a character use to repeat a particular task
     * @param propertyOption property of the loop character
     */
    function Loop(propertyOption) {
        var _this = _super.call(this, {
            name: propertyOption.name,
            "z index": propertyOption["z index"],
            opacity: propertyOption.opacity,
            visible: propertyOption.visible
        }) || this;
        _this._type = "Loop";
        _this.propertyManager.scheme({
            time: propertyOption.time != undefined ? propertyOption.time : 0,
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
    Loop.prototype.update = function (dt) {
        var _this = this;
        if (this.get("is initialize") && !this.get("is destroyed")) {
            if (this.get("play") == true) {
                __spreadArray([], Array.from(Array(this.get("time")).keys()), true).forEach(function (i) {
                    i = i + 1;
                    _this.eventEmitter.emit("each", i);
                    if (i == _this.get("time"))
                        _this.eventEmitter.emit("end", i);
                });
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
    Loop.prototype.render = function (graphics, displayPosition, displayScale, displayRotation) {
        if (this.get("is initialize") && !this.get("is destroyed") && this.get("visible")) {
            this.displayPosition = displayPosition;
            this.displayScale = displayScale;
            this.displayRotation = displayRotation;
            this.Render.render(graphics, this.displayPosition, this.displayScale, this.displayRotation);
        }
    };
    return Loop;
}(_1.Container));
exports["default"] = Loop;


/***/ }),

/***/ "./src/libs/characters/Sound.ts":
/*!**************************************!*\
  !*** ./src/libs/characters/Sound.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
var _1 = __webpack_require__(/*! . */ "./src/libs/characters/index.ts");
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
        if (this.get("is initialize") && !this.get("is destroyed")) {
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
                        _this.eventEmitter.emit("finished");
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
    Sound.prototype.render = function (graphics, displayPosition, displayScale, displayRotation) {
        if (this.get("is initialize") && !this.get("is destroyed") && this.get("visible")) {
            this.displayPosition = displayPosition;
            this.displayScale = displayScale;
            this.displayRotation = displayRotation;
            this.Render.render(graphics, this.displayPosition, this.displayScale, this.displayRotation);
        }
    };
    return Sound;
}(_1.Container));
exports["default"] = Sound;


/***/ }),

/***/ "./src/libs/characters/Text.ts":
/*!*************************************!*\
  !*** ./src/libs/characters/Text.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
var _1 = __webpack_require__(/*! . */ "./src/libs/characters/index.ts");
var __1 = __webpack_require__(/*! .. */ "./src/libs/index.ts");
var math_1 = __webpack_require__(/*! ../math */ "./src/libs/math/index.ts");
var Text = /** @class */ (function (_super) {
    __extends(Text, _super);
    /**
     * a character use to draw texts
     * @param propertyOption property of the text character
     */
    function Text(propertyOption) {
        var _this = _super.call(this, {
            name: propertyOption.name,
            position: propertyOption.position,
            scale: propertyOption.scale,
            rotation: propertyOption.rotation,
            "z index": propertyOption["z index"],
            opacity: propertyOption.opacity,
            visible: propertyOption.visible
        }) || this;
        _this._type = "Text";
        _this.propertyManager.scheme({
            fill: propertyOption.fill != undefined ? propertyOption.fill : true,
            "shadow offset": propertyOption["shadow offset"] != undefined ? propertyOption["shadow offset"] : new math_1.Vector2(0, 0),
            "shadow blur": propertyOption["shadow blur"] != undefined ? propertyOption["shadow blur"] : 0,
            "line width": propertyOption["line width"] != undefined ? propertyOption["line width"] : 1,
            color: propertyOption.color != undefined ? propertyOption.color : new math_1.Color(0, 0, 0, 1),
            "shadow color": propertyOption["shadow color"] != undefined ? propertyOption["shadow color"] : new math_1.Color(0, 0, 0, 0),
            "font size": propertyOption["font size"] != undefined ? propertyOption["font size"] : 16,
            "font style": propertyOption["font style"] != undefined ? propertyOption["font style"] : "normal",
            "font variant": propertyOption["font variant"] != undefined ? propertyOption["font variant"] : "normal",
            "font weight": propertyOption["font weight"] != undefined ? propertyOption["font weight"] : "normal",
            "font family": propertyOption["font family"] != undefined ? propertyOption["font family"] : "sans-serif",
            "text align": propertyOption["text align"] != undefined ? propertyOption["text align"] : "center",
            "text baseline": propertyOption["text baseline"] != undefined ? propertyOption["text baseline"] : "middle",
            text: propertyOption.text != undefined ? propertyOption.text : "Hello, world!",
        });
        return _this;
    }
    /**
     * public method to render the character
     * @param graphic instance of `CanvasRenderingContext2D` use to draw the character
     * @param displayPosition actual position of the character on the canvas
     * @param displayScale actual scale of the character
     * @param displayRotation actual rotation of the character
     */
    Text.prototype.render = function (graphics, displayPosition, displayScale, displayRotation) {
        if (this.get("is initialize") && !this.get("is destroyed") && this.get("visible")) {
            this.displayPosition = displayPosition.add(this.get("position"));
            this.displayScale = displayScale.multiply(this.get("scale"));
            this.displayRotation = displayRotation + this.get("rotation");
            graphics.save();
            graphics.translate(this.displayPosition.x, this.displayPosition.y);
            graphics.rotate(this.displayRotation * Math.PI / 180);
            graphics.scale(this.displayScale.x, this.displayScale.y);
            graphics.translate(-this.displayPosition.x, -this.displayPosition.y);
            graphics.globalAlpha = (this.parent instanceof __1.Game ? this.get("opacity") : this.parent.get("opacity") * this.get("opacity"));
            graphics.shadowBlur = this.get("shadow blur");
            graphics.shadowColor = this.get("shadow color").toString();
            graphics.shadowOffsetX = this.get("shadow offset").x;
            graphics.shadowOffsetY = this.get("shadow offset").y;
            graphics.font = this.get("font style") + " " + this.get("font variant") + " " + this.get("font weight") + " " + this.get("font size") + "px " + this.get("font family");
            graphics.textAlign = this.get("text align");
            graphics.textBaseline = this.get("text baseline");
            if (this.get("fill") == true) {
                graphics.fillStyle = this.get("color").toString();
                graphics.fillText(this.get("text"), this.displayPosition.x - this.game.offset.x, this.displayPosition.y - this.game.offset.y);
            }
            else if (this.get("fill") == false) {
                graphics.lineWidth = this.get("line width");
                graphics.strokeStyle = this.get("color").toString();
                graphics.strokeText(this.get("text"), this.displayPosition.x - this.game.offset.x, this.displayPosition.y - this.game.offset.y);
            }
            var textWidth = graphics.measureText(this.get("text")).width;
            var regionX = (this.displayPosition.x - this.game.offset.x) - textWidth * 0.5;
            var regionY = (this.displayPosition.x - this.game.offset.x) - this.get("font size") / 2;
            if (graphics.textAlign == "center")
                regionX = (this.displayPosition.x - this.game.offset.x) - textWidth * 0.5;
            else if (graphics.textAlign == "end" || graphics.textAlign == "right")
                regionX = (this.displayPosition.x - this.game.offset.x) - textWidth;
            else if (graphics.textAlign == "start" || graphics.textAlign == "left")
                regionX = (this.displayPosition.x - this.game.offset.x);
            if (graphics.textBaseline == "middle")
                regionY = (this.displayPosition.x - this.game.offset.x) - this.get("font size") / 2;
            else if (graphics.textBaseline == "top" || graphics.textBaseline == "hanging")
                regionY = (this.displayPosition.x - this.game.offset.x);
            else if (graphics.textBaseline == "bottom" || graphics.textBaseline == "alphabetic" || graphics.textBaseline == "ideographic")
                regionY = (this.displayPosition.x - this.game.offset.x) - this.get("font size");
            var region = {
                x: regionX,
                y: regionY,
                w: textWidth,
                h: this.get("font size")
            };
            graphics.restore();
            var pointerEvent = this.game.pointerEventDetector.inputEvent;
            if (pointerEvent != null) {
                var inPoint = Object(graphics).isTextInPath(region, pointerEvent.position.x, pointerEvent.position.y);
                var alpha = (this.parent instanceof __1.Game ? this.get("opacity") : this.parent.get("opacity") * this.get("opacity"));
                var color = this.get("color");
                if (inPoint && alpha > 0 && color.alpha > 0) {
                    this.game.pointerEventDetector.characterDetected = this;
                }
            }
            this.Render.render(graphics, this.displayPosition, this.displayScale, this.displayRotation);
        }
    };
    return Text;
}(_1.Container));
exports["default"] = Text;


/***/ }),

/***/ "./src/libs/characters/Timer.ts":
/*!**************************************!*\
  !*** ./src/libs/characters/Timer.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
var _1 = __webpack_require__(/*! . */ "./src/libs/characters/index.ts");
var Timer = /** @class */ (function (_super) {
    __extends(Timer, _super);
    /**
     * a character use to create a timer
     * @param propertyOption property of the timer character
     */
    function Timer(propertyOption) {
        var _this = _super.call(this, {
            name: propertyOption.name,
            "z index": propertyOption["z index"],
            opacity: propertyOption.opacity,
            visible: propertyOption.visible
        }) || this;
        _this.currentTime = 0;
        _this._type = "Timer";
        _this.propertyManager.scheme({
            "wait time": propertyOption["wait time"] != undefined ? propertyOption["wait time"] : 1,
            play: propertyOption.play != undefined ? propertyOption.play : false,
            repeat: propertyOption.repeat != undefined ? propertyOption.repeat : false
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
    Timer.prototype.update = function (dt) {
        var waitTime = this.get("wait time");
        var repeat = this.get("repeat");
        if (this.get("is initialize") && !this.get("is destroyed")) {
            if (this.get("play") == true) {
                this.currentTime += dt;
                if (this.currentTime >= waitTime) {
                    this.currentTime = 0;
                    this.eventEmitter.emit("timeout");
                    if (!repeat) {
                        this.set("play", false);
                    }
                }
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
    Timer.prototype.render = function (graphics, displayPosition, displayScale, displayRotation) {
        if (this.get("is initialize") && !this.get("is destroyed") && this.get("visible")) {
            this.displayPosition = displayPosition;
            this.displayScale = displayScale;
            this.displayRotation = displayRotation;
            this.Render.render(graphics, this.displayPosition, this.displayScale, this.displayRotation);
        }
    };
    return Timer;
}(_1.Container));
exports["default"] = Timer;


/***/ }),

/***/ "./src/libs/characters/index.ts":
/*!**************************************!*\
  !*** ./src/libs/characters/index.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Sound = exports.Image = exports.Condition = exports.Timer = exports.Loop = exports.Box = exports.Text = exports.Arc = exports.Container = void 0;
var Container_1 = __importDefault(__webpack_require__(/*! ./Container */ "./src/libs/characters/Container.ts"));
exports.Container = Container_1.default;
var Arc_1 = __importDefault(__webpack_require__(/*! ./Arc */ "./src/libs/characters/Arc.ts"));
exports.Arc = Arc_1.default;
var Text_1 = __importDefault(__webpack_require__(/*! ./Text */ "./src/libs/characters/Text.ts"));
exports.Text = Text_1.default;
var Box_1 = __importDefault(__webpack_require__(/*! ./Box */ "./src/libs/characters/Box.ts"));
exports.Box = Box_1.default;
var Loop_1 = __importDefault(__webpack_require__(/*! ./Loop */ "./src/libs/characters/Loop.ts"));
exports.Loop = Loop_1.default;
var Condition_1 = __importDefault(__webpack_require__(/*! ./Condition */ "./src/libs/characters/Condition.ts"));
exports.Condition = Condition_1.default;
var Timer_1 = __importDefault(__webpack_require__(/*! ./Timer */ "./src/libs/characters/Timer.ts"));
exports.Timer = Timer_1.default;
var Image_1 = __importDefault(__webpack_require__(/*! ./Image */ "./src/libs/characters/Image.ts"));
exports.Image = Image_1.default;
var Sound_1 = __importDefault(__webpack_require__(/*! ./Sound */ "./src/libs/characters/Sound.ts"));
exports.Sound = Sound_1.default;


/***/ }),

/***/ "./src/libs/index.ts":
/*!***************************!*\
  !*** ./src/libs/index.ts ***!
  \***************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Math = exports.Character = exports.Game = void 0;
var Game_1 = __importDefault(__webpack_require__(/*! ./Game */ "./src/libs/Game.ts"));
exports.Game = Game_1.default;
var Character = __importStar(__webpack_require__(/*! ./characters */ "./src/libs/characters/index.ts"));
exports.Character = Character;
var Math = __importStar(__webpack_require__(/*! ./math */ "./src/libs/math/index.ts"));
exports.Math = Math;


/***/ }),

/***/ "./src/libs/math/Color.ts":
/*!********************************!*\
  !*** ./src/libs/math/Color.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
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
exports["default"] = Color;


/***/ }),

/***/ "./src/libs/math/Vector2.ts":
/*!**********************************!*\
  !*** ./src/libs/math/Vector2.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
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
exports["default"] = Vector2;


/***/ }),

/***/ "./src/libs/math/constants.ts":
/*!************************************!*\
  !*** ./src/libs/math/constants.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LOG10E = exports.LN2 = exports.LN10 = exports.LOG2E = exports.SQRT2 = exports.SQRT1_2 = exports.E = exports.PI = void 0;
var PI = Math.PI, E = Math.E, SQRT1_2 = Math.SQRT1_2, SQRT2 = Math.SQRT2, LN10 = Math.LN10, LN2 = Math.LN2, LOG10E = Math.LOG10E, LOG2E = Math.LOG2E;
exports.PI = PI;
exports.E = E;
exports.SQRT1_2 = SQRT1_2;
exports.SQRT2 = SQRT2;
exports.LN10 = LN10;
exports.LN2 = LN2;
exports.LOG10E = LOG10E;
exports.LOG2E = LOG2E;
Math.floor;


/***/ }),

/***/ "./src/libs/math/functions.ts":
/*!************************************!*\
  !*** ./src/libs/math/functions.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.random = exports.ceil = exports.expm1 = exports.exp = exports.abs = void 0;
var _1 = __webpack_require__(/*! . */ "./src/libs/math/index.ts");
/**
 * Returns the absolute value of a number (the value without regard to whether it is positive or negative)
 * @param x A number or `Vector2` expression for which the absolute value is needed
 */
var abs = function (x) {
    var value = typeof x == "number" ?
        Math.abs(x) :
        new _1.Vector2(Math.abs(x.x), Math.abs(x.y));
    return value;
};
exports.abs = abs;
/**
 * Returns e (the base of natural logarithms) raised to a power
 * @param x A number or `Vector2` expression representing the power of e
 */
var exp = function (x) {
    var value = typeof x == "number" ?
        Math.exp(x) :
        new _1.Vector2(Math.exp(x.x), Math.exp(x.y));
    return value;
};
exports.exp = exp;
/**
 * Returns the result of (e^x - 1), which is an implementation-dependent approximation to subtracting 1 from the exponential function of x (e raised to the power of x, where e is the base of the natural logarithms)
 * @param x A number or `Vector2` expression
 */
var expm1 = function (x) {
    var value = typeof x == "number" ?
        Math.expm1(x) :
        new _1.Vector2(Math.expm1(x.x), Math.expm1(x.y));
    return value;
};
exports.expm1 = expm1;
/**
 * Returns the smallest integer greater than or equal to its numeric argument
 * @param x A number or `Vector2` expression
 */
var ceil = function (x) {
    var value = typeof x == "number" ?
        Math.ceil(x) :
        new _1.Vector2(Math.ceil(x.x), Math.ceil(x.y));
    return value;
};
exports.ceil = ceil;
/**
 * Returns a pseudorandom number between x and y
 * @param x A number expression
 * @param y A number expression
 */
var random = function (x, y) {
    return x + Math.random() * (y - x);
};
exports.random = random;
///stopped at R


/***/ }),

/***/ "./src/libs/math/index.ts":
/*!********************************!*\
  !*** ./src/libs/math/index.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ceil = exports.abs = exports.random = exports.expm1 = exports.exp = exports.LOG10E = exports.LN2 = exports.LN10 = exports.LOG2E = exports.SQRT2 = exports.SQRT1_2 = exports.E = exports.PI = exports.Color = exports.Vector2 = void 0;
var Color_1 = __importDefault(__webpack_require__(/*! ./Color */ "./src/libs/math/Color.ts"));
exports.Color = Color_1.default;
var constants_1 = __webpack_require__(/*! ./constants */ "./src/libs/math/constants.ts");
Object.defineProperty(exports, "PI", ({ enumerable: true, get: function () { return constants_1.PI; } }));
Object.defineProperty(exports, "E", ({ enumerable: true, get: function () { return constants_1.E; } }));
Object.defineProperty(exports, "SQRT1_2", ({ enumerable: true, get: function () { return constants_1.SQRT1_2; } }));
Object.defineProperty(exports, "SQRT2", ({ enumerable: true, get: function () { return constants_1.SQRT2; } }));
Object.defineProperty(exports, "LOG2E", ({ enumerable: true, get: function () { return constants_1.LOG2E; } }));
Object.defineProperty(exports, "LN10", ({ enumerable: true, get: function () { return constants_1.LN10; } }));
Object.defineProperty(exports, "LN2", ({ enumerable: true, get: function () { return constants_1.LN2; } }));
Object.defineProperty(exports, "LOG10E", ({ enumerable: true, get: function () { return constants_1.LOG10E; } }));
var functions_1 = __webpack_require__(/*! ./functions */ "./src/libs/math/functions.ts");
Object.defineProperty(exports, "exp", ({ enumerable: true, get: function () { return functions_1.exp; } }));
Object.defineProperty(exports, "expm1", ({ enumerable: true, get: function () { return functions_1.expm1; } }));
Object.defineProperty(exports, "random", ({ enumerable: true, get: function () { return functions_1.random; } }));
Object.defineProperty(exports, "abs", ({ enumerable: true, get: function () { return functions_1.abs; } }));
Object.defineProperty(exports, "ceil", ({ enumerable: true, get: function () { return functions_1.ceil; } }));
var Vector2_1 = __importDefault(__webpack_require__(/*! ./Vector2 */ "./src/libs/math/Vector2.ts"));
exports.Vector2 = Vector2_1.default;


/***/ }),

/***/ "./src/utils/AssetLoader.ts":
/*!**********************************!*\
  !*** ./src/utils/AssetLoader.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
/**
 * 🛠 utility class to handle the loading of assets for the game
 */
var AssetsLoader = /** @class */ (function () {
    function AssetsLoader() {
        this.assetsToLoad = Array();
        this.assetsLoaded = new Map();
        this.supportedImageFormat = new Set([
            "apng",
            "avif",
            "gif",
            "jpg",
            "jpeg",
            "jfif",
            "pjpeg",
            "pjp",
            "png",
            "svg",
            "webp"
        ]);
        this.supportedAudioFormat = new Set([
            "wav",
            "mp3",
            "mp4a",
            "mpga",
            "mp2",
            "mp2a",
            "m2a",
            "m3a",
            "oga",
            "ogg",
            "spx",
            "opus",
            "aac",
            "weba",
            "caf",
            "flac"
        ]);
        this.supportedFontFormat = new Set([
            "ttf",
            "woff",
            "otf",
            "woff2"
        ]);
    }
    /**
     * public method to load a list of assets
     * @param assets list of assets to load
     */
    AssetsLoader.prototype.load = function () {
        var _this = this;
        var assets = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            assets[_i] = arguments[_i];
        }
        assets.forEach(function (path) {
            var extension = path.split(".").pop();
            if (extension != undefined) {
                extension = extension.toLowerCase();
                if (_this.supportedImageFormat.has(extension))
                    _this.assetsToLoad.push({
                        type: "image",
                        path: path
                    });
                else if (_this.supportedAudioFormat.has(extension))
                    _this.assetsToLoad.push({
                        type: "audio",
                        path: path
                    });
                else if (_this.supportedFontFormat.has(extension))
                    _this.assetsToLoad.push({
                        type: "font",
                        path: path
                    });
                else
                    console.error("Asset format is not supported");
            }
            else {
                console.error("Asset need to have an extension name");
            }
        });
    };
    /**
     * public method to load an audio asset
     * @param audioAssetData Javascript object containing the audio asset data to load
     */
    AssetsLoader.prototype.loadAudio = function (audioAssetData) {
        var _this = this;
        if (audioAssetData.type == "audio") {
            var audio_1 = new Audio(audioAssetData.path);
            audio_1.onloadeddata = function () {
                _this.assetsLoaded.set(audio_1.src.replace(audio_1.baseURI, ""), {
                    type: "audio",
                    data: audio_1
                });
            };
            audio_1.onerror = function () {
                console.error("Failed to load audio asset from '" + audioAssetData.path + "'");
            };
        }
    };
    /**
     * public method to load an image asset
     * @param imageAssetData Javascript object containing the image asset data to load
     */
    AssetsLoader.prototype.loadImage = function (imageAssetData) {
        var _this = this;
        if (imageAssetData.type == "image") {
            var image_1 = new Image();
            image_1.src = imageAssetData.path;
            image_1.onload = function () {
                _this.assetsLoaded.set(image_1.src.replace(image_1.baseURI, ""), {
                    type: "image",
                    data: image_1
                });
            };
            image_1.onerror = function () {
                console.error("Failed to load image asset from '" + imageAssetData.path + "'");
            };
        }
    };
    /**
     * public method to load a font asset
     * @param fontAssetData Javascript object containing the font asset data to load
     */
    AssetsLoader.prototype.loadFont = function (fontAssetData) {
        var _this = this;
        var fontFace = Object(window)["FontFace"];
        var name = fontAssetData.path.split("/").pop().replace(/\..+/, "");
        var font = new fontFace(name, "url(" + fontAssetData.path + ")");
        font.load().then(function (loaded_face) {
            Object(document)["fonts"].add(loaded_face);
            _this.assetsLoaded.set(name, {
                type: "font",
                data: fontAssetData.path
            });
        }).catch(function () {
            console.error("Failed to load font asset from '" + fontAssetData.path + "'");
        });
    };
    /**
     * public method to delete a list of assets
     * @param assets list of assets to delete
     */
    AssetsLoader.prototype.delete = function () {
        var _this = this;
        var assets = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            assets[_i] = arguments[_i];
        }
        assets.forEach(function (path) {
            _this.assetsLoaded.delete(path);
        });
    };
    /**
     * public method to check if an asset exist
     * @param asset name of asset to check if exist
     * @returns if asset exist return `true` else return `false`
     */
    AssetsLoader.prototype.check = function (asset) {
        return this.assetsLoaded.has(asset);
    };
    /**
     * public method to get an assets
     * @param asset name of asset to get
     * @returns if asset exist return a Javascript object containing the asset data else return `null`
     */
    AssetsLoader.prototype.asset = function (asset) {
        if (this.assetsLoaded.has(asset))
            return this.assetsLoaded.get(asset);
        else
            return null;
    };
    /**
     * public method to check if all the asset is loaded
     */
    AssetsLoader.prototype.isAssetsLoaded = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.assetsToLoad.forEach(function (assetData) {
                    if (assetData.type == "image")
                        _this.loadImage(assetData);
                    else if (assetData.type == "audio")
                        _this.loadAudio(assetData);
                    else if (assetData.type == "font")
                        _this.loadFont(assetData);
                });
                this.assetsToLoad.length = 0;
                return [2 /*return*/];
            });
        });
    };
    return AssetsLoader;
}());
exports["default"] = AssetsLoader;


/***/ }),

/***/ "./src/utils/Camera.ts":
/*!*****************************!*\
  !*** ./src/utils/Camera.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var math_1 = __webpack_require__(/*! ../libs/math */ "./src/libs/math/index.ts");
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
exports["default"] = Camera;


/***/ }),

/***/ "./src/utils/DataManager.ts":
/*!**********************************!*\
  !*** ./src/utils/DataManager.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var DataManager = /** @class */ (function () {
    /**
     * 🛠 utility class to handle the storage of data for all the 🎭 characters
     * @param character instance of the character the data storage belong to
     */
    function DataManager(character) {
        this.dataMap = new Map();
        this.keyMap = new Map();
        this.character = character;
    }
    /**
     * public method to rename the key of a data stored
     * @param key key used to store the data
     * @param name name to change the key to
     */
    DataManager.prototype.rename = function (key, name) {
        var id = this.keyMap.get(key);
        if (id != undefined) {
            var dataInput = this.dataMap.get(id);
            if (!this.keyMap.has(name)) {
                this.keyMap.delete(key);
                this.keyMap.set(name, id);
                this.dataMap.set(id, {
                    type: dataInput.type,
                    key: name,
                    value: dataInput.value
                });
            }
            else {
                // Error
            }
        }
    };
    /**
     * public method to add or edit a data stored
     * @param key key used to store the data
     * @param value value of the data to store
     */
    DataManager.prototype.set = function (key, value) {
        if (typeof value == "boolean" || typeof value == "number" || typeof value == "string") {
            var id = this.keyMap.get(key);
            var type = typeof value;
            if (id != undefined) {
                var dataInput = this.dataMap.get(id);
                this.dataMap.set(id, {
                    type: type,
                    key: dataInput.key,
                    value: value
                });
            }
            else {
                var id_1 = this.dataMap.size + 1;
                this.dataMap.set(id_1, { key: key, value: value, type: type });
                this.keyMap.set(key, id_1);
            }
        }
        else {
            // Error
        }
    };
    /**
     * public method to check if a data stored exist
     * @param key key used to store the data
     * @returns if the data exist return `true` else return `false`
     */
    DataManager.prototype.has = function (key) {
        return this.keyMap.has(key);
    };
    /**
     * public method to remove a data stored
     * @param key key used to store the data
     * @returns if return is deleted return `true` else return `false`
     */
    DataManager.prototype.delete = function (key) {
        var id = this.keyMap.get(key);
        if (id != undefined) {
            this.keyMap.delete(key);
            this.dataMap.delete(id);
            return true;
        }
        return false;
    };
    /**
     * public method to get a data stored
     * @param key key used to store the data
     * @returns if the data exist return the data else return `null`
     */
    DataManager.prototype.get = function (key) {
        var id = this.keyMap.get(key);
        if (id != undefined) {
            return this.dataMap.get(id);
        }
        else {
            return null;
        }
    };
    Object.defineProperty(DataManager.prototype, "size", {
        /**
         * public getter to get the number of data stored
         */
        get: function () {
            return this.dataMap.size;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * public method to loop through all the data stored
     * @param callback  callback function one time for each data stored
     */
    DataManager.prototype.forEach = function (callback) {
        var _this = this;
        this.dataMap.forEach(function (value) { return callback(value, value.key, _this); });
    };
    /**
     * public method to list all the data stored
     * @returns Array of all the data stored
     */
    DataManager.prototype.list = function () {
        var dataList = Array.from(this.dataMap.values());
        return dataList;
    };
    return DataManager;
}());
exports["default"] = DataManager;


/***/ }),

/***/ "./src/utils/EventEmitter.ts":
/*!***********************************!*\
  !*** ./src/utils/EventEmitter.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports) {


var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
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
exports["default"] = EventEmitter;


/***/ }),

/***/ "./src/utils/InputEventManager/KeyboardEventManager.ts":
/*!*************************************************************!*\
  !*** ./src/utils/InputEventManager/KeyboardEventManager.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
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
exports["default"] = KeyboardEventManager;


/***/ }),

/***/ "./src/utils/InputEventManager/PointerEventManager.ts":
/*!************************************************************!*\
  !*** ./src/utils/InputEventManager/PointerEventManager.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PointerInputEvent = exports.PointerEventDetector = void 0;
var math_1 = __webpack_require__(/*! ../../libs/math */ "./src/libs/math/index.ts");
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
     * @param time the number of time in seconds the event happen
     * @param type indicates the type of event caused by the device (move, drag, press, release, right press, right release, swipe up, swipe down, swipe right, swipe left)
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
         * the number of time in seconds the event happen
         */
        get: function () {
            return this._time;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PointerInputEvent.prototype, "type", {
        /**
         * indicates the type of event caused by the device (move, drag, press, release, right press, right release, swipe up, swipe down, swipe right, swipe left)
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
        this.isDragging = false;
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
        this.position.setY = event.clientY - this.canvas.getBoundingClientRect().top;
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
                this.isDragging = true;
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
            if (!this.isDragging) {
                type = "release";
                if (event.button == 2)
                    type = "right release";
            }
            this.isPointerPressed = false;
            this.isDragging = false;
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
            this.swipeStartPosition.setX = event.touches[0].clientX - this.canvas.getBoundingClientRect().left;
            this.swipeStartPosition.setY = event.touches[0].clientY - this.canvas.getBoundingClientRect().top;
            this.position = this.swipeStartPosition;
            this.swipeStarted = true;
        }
        else if (eventName == "touchmove") {
            if (this.swipeStarted) {
                var otherSwipePosition = new math_1.Vector2(event.touches[0].clientX - this.canvas.getBoundingClientRect().left, event.touches[0].clientY - this.canvas.getBoundingClientRect().left);
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
exports["default"] = PointerEventManager;


/***/ }),

/***/ "./src/utils/InputEventManager/index.ts":
/*!**********************************************!*\
  !*** ./src/utils/InputEventManager/index.ts ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PointerEventManager = exports.KeyboardEventManager = void 0;
var KeyboardEventManager_1 = __importDefault(__webpack_require__(/*! ./KeyboardEventManager */ "./src/utils/InputEventManager/KeyboardEventManager.ts"));
exports.KeyboardEventManager = KeyboardEventManager_1.default;
var PointerEventManager_1 = __importDefault(__webpack_require__(/*! ./PointerEventManager */ "./src/utils/InputEventManager/PointerEventManager.ts"));
exports.PointerEventManager = PointerEventManager_1.default;


/***/ }),

/***/ "./src/utils/PropertyManager.ts":
/*!**************************************!*\
  !*** ./src/utils/PropertyManager.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var math_1 = __webpack_require__(/*! ../libs/math */ "./src/libs/math/index.ts");
/**
 * 🛠 utility class to handle the character property
 */
var PropertyManager = /** @class */ (function () {
    function PropertyManager() {
        this.propertyMap = new Map();
        this.readonlyPropertySet = new Set();
    }
    /**
     * set the property scheme
     * @param propScheme
     */
    PropertyManager.prototype.scheme = function (propScheme) {
        for (var name_1 in propScheme) {
            var propertyValue = propScheme[name_1];
            if (typeof propertyValue == "object" && !(propertyValue instanceof math_1.Vector2) && !(propertyValue instanceof math_1.Color)) {
                this.propertyMap.set(name_1, {
                    value: propertyValue.value,
                    type: propertyValue.type,
                    readonly: propertyValue.readonly
                });
                if (propertyValue.readonly == true)
                    this.readonlyPropertySet.add(name_1);
            }
            else {
                var propertyType = typeof propertyValue == "number" ? "number"
                    : typeof propertyValue == "string" ? "string"
                        : typeof propertyValue == "boolean" ? "boolean"
                            : Array.isArray(propertyValue) ? "Array<string>"
                                : propertyValue instanceof math_1.Vector2 ? "Vector2" : "Color";
                this.propertyMap.set(name_1, {
                    value: propertyValue,
                    readonly: false,
                    type: propertyType
                });
            }
        }
    };
    /**
     * public method to get a property
     * @param name name name of the property to get
     * @returns if property exist return it value else return `null`
     */
    PropertyManager.prototype.get = function (name) {
        if (this.propertyMap.has(name))
            return this.propertyMap.get(name).value;
        else
            return null;
    };
    /**
     * public method to set a property
     * @param name name name of the property to set
     * @param value value to set the property with
     */
    PropertyManager.prototype.set = function (name, value) {
        if (this.propertyMap.has(name) && !this.readonlyPropertySet.has(name)) {
            this.propertyMap.set(name, {
                value: value,
                readonly: this.propertyMap.get(name).readonly,
                type: this.propertyMap.get(name).type
            });
        }
    };
    /**
     * public method to override the value of a readonly property
     * @param name name name of the property to override
     * @param value value to override the property with
     */
    PropertyManager.prototype.override = function (name, value) {
        if (this.readonlyPropertySet.has(name))
            this.propertyMap.set(name, {
                value: value,
                readonly: this.propertyMap.get(name).readonly,
                type: this.propertyMap.get(name).type
            });
    };
    /**
     * public method to check if a property exist
     * @param name name of the property to check if it exist
     * @returns return `true` if the property exist else return `false`
     */
    PropertyManager.prototype.has = function (name) {
        return this.propertyMap.has(name);
    };
    /**
     * public method to delete a property
     * @param name name of the property to delete
     */
    PropertyManager.prototype.delete = function (name) {
        this.propertyMap.delete(name);
    };
    /**
     * public method to get all the character properties
     * @returns return an `Array` of type object
     */
    PropertyManager.prototype.allProperties = function () {
        return Array
            .from(this.propertyMap)
            .filter(function (property) { return !property[1].readonly; })
            .map(function (property) {
            return {
                name: property[0],
                value: property[1].value,
                type: property[1].type
            };
        });
    };
    return PropertyManager;
}());
exports["default"] = PropertyManager;


/***/ }),

/***/ "./src/utils/slim/Render.ts":
/*!**********************************!*\
  !*** ./src/utils/slim/Render.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
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
exports["default"] = Render;


/***/ }),

/***/ "./src/utils/slim/Storage.ts":
/*!***********************************!*\
  !*** ./src/utils/slim/Storage.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var Storage = /** @class */ (function () {
    /**
     * 🛠 utility class to handle the storage of a character children
     * @param character instance of the character
     */
    function Storage(character) {
        this.storageMap = new Map();
        this.predefineCharacterList = Array();
        this.character = character;
    }
    Object.defineProperty(Storage.prototype, "characterTree", {
        get: function () {
            return this._characterTree;
        },
        set: function (tree) {
            this._characterTree = tree;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * public method to list all the character children
     * @returns `Array` containing all the instance of the character children
     */
    Storage.prototype.list = function () {
        return Array.from(this.storageMap.values());
    };
    /**
     * public method to list all the character children which have not been initialize
     * @returns `Array` containing all the instance of the character children which have not been initialize
     */
    Storage.prototype.listPredefineCharacter = function () {
        return this.predefineCharacterList;
    };
    /**
     * public method to add th character children directly to the storage `Map` object
     * @param character character children to add
     */
    Storage.prototype.nativeAdd = function (character) {
        this.storageMap.set(character.get("name"), character);
    };
    /**
     * public method add the character children to the `Storage` instance
     * @param character character children to add
     */
    Storage.prototype.add = function (character) {
        this.predefineCharacterList.push(character);
    };
    /**
     * public method to check if a character exist
     * @param path character path (e.g `character/character_child`)
     * @returns return `true` if character exist else return `false`
     */
    Storage.prototype.has = function (path) {
        var has = false;
        var pathFormat = path.split("/");
        var character = this.character;
        if (pathFormat.length == 1) {
            has = this.storageMap.has(pathFormat[0]);
        }
        else if (pathFormat.length > 1) {
            pathFormat.forEach(function (singularPath) {
                if (character != null) {
                    if (character.has(singularPath)) {
                        character = character.child(singularPath);
                        has = true;
                    }
                    else {
                        has = false;
                    }
                }
                else {
                    has = false;
                }
            });
        }
        else {
            has = false;
        }
        return has;
    };
    /**
     * public method to clear the character storage
     */
    Storage.prototype.clear = function () {
        this.storageMap.clear();
        this.predefineCharacterList.length = 0;
    };
    /**
     * public method to get a character
     * @param path character path (e.g `character/character_child`)
     * @returns return the character instance if the character exist else return `null`
     */
    Storage.prototype.child = function (path) {
        var _this = this;
        var child = null;
        var pathFormat = path.split("/");
        if (pathFormat.length == 1) {
            if (this.storageMap.has(pathFormat[0])) {
                child = this.storageMap.get(pathFormat[0]);
            }
            else {
                child = null;
            }
        }
        else if (pathFormat.length > 1) {
            pathFormat.forEach(function (singularPath) {
                if (singularPath != String()) {
                    if (child == null) {
                        if (_this.storageMap.has(singularPath)) {
                            child = _this.storageMap.get(singularPath);
                        }
                        else {
                            child = null;
                        }
                    }
                    else {
                        if (child.has(singularPath)) {
                            child = child.child(singularPath);
                        }
                        else {
                            child = null;
                        }
                    }
                }
                else {
                    child = null;
                }
            });
        }
        else {
            child = null;
        }
        return child;
    };
    return Storage;
}());
exports["default"] = Storage;


/***/ }),

/***/ "./src/utils/slim/Updater.ts":
/*!***********************************!*\
  !*** ./src/utils/slim/Updater.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var __1 = __webpack_require__(/*! ../.. */ "./src/index.ts");
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
        var width = parseInt(getComputedStyle(this.canvas).width);
        if (width <= 480)
            this.character.emit("extra small size", width);
        else if (width > 480 && width <= 768)
            this.character.emit("small size", width);
        else if (width > 768 && width <= 1024)
            this.character.emit("medium size", width);
        else if (width > 1024 && width <= 1200)
            this.character.emit("large size", width);
        else if (width > 1200)
            this.character.emit("extra large size", width);
        var characterList = this.storage.list();
        var predefineCharacterList = this.storage.listPredefineCharacter();
        predefineCharacterList.forEach(function (character) {
            if (!character.get("is initialize")) {
                character.initialize(_this.canvas, _this.game, _this.character);
                characterList.push(character);
            }
        });
        predefineCharacterList.length = 0;
        this.storage.clear();
        this.storage.characterTree = {
            name: this.character.get("name"),
            type: this.character.type,
            path: this.character.get("path"),
            children: new Map()
        };
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
                _this.storage.characterTree.children.set(character.get("name"), character.tree);
            }
            else {
                character.emit("final");
            }
        });
    };
    return Updater;
}());
exports["default"] = Updater;


/***/ }),

/***/ "./src/utils/slim/index.ts":
/*!*********************************!*\
  !*** ./src/utils/slim/index.ts ***!
  \*********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Render = exports.Updater = exports.Storage = void 0;
var Render_1 = __importDefault(__webpack_require__(/*! ./Render */ "./src/utils/slim/Render.ts"));
exports.Render = Render_1.default;
var Storage_1 = __importDefault(__webpack_require__(/*! ./Storage */ "./src/utils/slim/Storage.ts"));
exports.Storage = Storage_1.default;
var Updater_1 = __importDefault(__webpack_require__(/*! ./Updater */ "./src/utils/slim/Updater.ts"));
exports.Updater = Updater_1.default;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	KaroEngine = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=karo-engine.js.map