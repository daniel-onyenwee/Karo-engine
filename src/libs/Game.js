"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var Slim = __importStar(require("../utils/slim"));
var math_1 = require("./math");
var AssetLoader_1 = __importDefault(require("../utils/AssetLoader"));
var InputEventManager_1 = require("../utils/InputEventManager");
var PointerEventManager_1 = require("../utils/InputEventManager/PointerEventManager");
var Camera_1 = __importDefault(require("../utils/Camera"));
var PropertyManager_1 = __importDefault(require("../utils/PropertyManager"));
var DataManager_1 = __importDefault(require("../utils/DataManager"));
var EventEmitter_1 = __importDefault(require("../utils/EventEmitter"));
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
exports.default = Game;
