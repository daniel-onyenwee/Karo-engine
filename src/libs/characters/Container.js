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
var PropertyManager_1 = __importDefault(require("../../utils/PropertyManager"));
var math_1 = require("../math");
var Slim = __importStar(require("../../utils/slim"));
var DataManager_1 = __importDefault(require("../../utils/DataManager"));
var EventEmitter_1 = __importDefault(require("../../utils/EventEmitter"));
var Container = /** @class */ (function () {
    /**
     * a character with no special meaning at all but used to group other characters
     * @param propertyOption property of container character
     */
    function Container(propertyOption) {
        this.Render = new Slim.Render();
        this.Storage = new Slim.Storage(this);
        this.displaySize = {
            x: 40,
            y: 50
        };
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
         * public method to get all the character propertries
         * @returns return a `Map` with the property name as the map key and the property value as the map value
         */
        this.entry = this.propertyManager.entry.bind(this.propertyManager);
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
         * @param callback callback function to call when the event is emiited
         */
        this.on = this.eventEmitter.on.bind(this.eventEmitter);
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
            "is initalize": { value: false, readonly: true, type: "boolean" },
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
     * public method to initalize the character
     * @param canvas instance of the `HTMLCanvasElement`
     * @param game insatance of the `Game`
     * @param parent parnet character instance of the character
     */
    Container.prototype.initalize = function (canvas, game, parent) {
        if (!this.get("is initalize")) {
            this._parent = parent;
            this._game = game;
            this.canvas = canvas;
            this.propertyManager.override("is initalize", true);
            this.Updater = new Slim.Updater(this.canvas, this._game, this, this.Storage, this.Render);
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
        if (this.get("is initalize") && !this.get("is destroyed")) {
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
        if (this.get("is initalize") && !this.get("is destroyed") && this.get("visible")) {
            this.displayPosition = displayPosition.add(this.get("position"));
            this.displayScale = displayScale.multiply(this.get("scale"));
            this.displayRotation = displayRotation + this.get("rotation");
            this.Render.render(graphics, this.displayPosition, this.displayScale, this.displayRotation);
        }
    };
    return Container;
}());
exports.default = Container;
