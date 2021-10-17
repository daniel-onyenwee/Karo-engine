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
var Camera_1 = __importDefault(require("../utils/Camera"));
var DataStorage_1 = __importDefault(require("../utils/DataStorage"));
var Game = /** @class */ (function () {
    /**
     * create a game
     * @param canvas instance of the `HTMLCanvasElement` to draw the game on
     */
    function Game(canvas) {
        this.oldTime = 0;
        this.assetsLoader = new AssetLoader_1.default();
        this._devMode = "on";
        this.Render = new Slim.Render();
        this.Storage = new Slim.Storage(this);
        this.camera = new Camera_1.default(this);
        this.dataStorage = new DataStorage_1.default(this);
        this.store = this.dataStorage.dataMap;
        /**
         * public method to get a reference of a child character data store
         * @param path the child character path
         * @returns if the child character exist return its data store return `null`
         */
        this.ref = this.dataStorage.ref.bind(this.dataStorage);
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
        this.keyboardEvent = new InputEventManager_1.KeyboardEventManager(this);
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
        this.canvas = canvas;
        this.graphic = this.canvas.getContext("2d");
        this.Updater = new Slim.Updater(this.canvas, this, this, this.Storage, this.Render);
    }
    Object.defineProperty(Game.prototype, "developmentMode", {
        get: function () {
            return this._devMode;
        },
        /**
         * public property to activate the engine development mode
         */
        set: function (mode) {
            this._devMode = mode;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * public method to draw the game
     * @param time number of second since the browser was last rendered
     */
    Game.prototype.draw = function (time) {
        var _this = this;
        var dt = (time - this.oldTime) / 1000;
        this.oldTime = time;
        this.assetsLoader.isAssetsLoaded()
            .then(function () {
            _this.graphic.clearRect(0, 0, _this.canvas.width, _this.canvas.height);
            if (_this._devMode == "on") {
                _this.Updater.update(dt);
                _this.Render.render(_this.graphic, new math_1.Vector2(0, 0), new math_1.Vector2(1, 1), 0);
            }
            else {
                _this.Updater.update(dt);
                _this.Render.render(_this.graphic, new math_1.Vector2(0, 0), new math_1.Vector2(1, 1), 0);
            }
        });
    };
    /**
     * public method to called when the user interaction with the keyboard
     * @param ev Javascript object that describe the user interaction with the keyboard
     */
    Game.prototype.onKeyPress = function (ev) {
        if (this._devMode == "off")
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