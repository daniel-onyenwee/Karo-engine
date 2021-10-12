"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
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
     * public method to check if all the asset is looaded
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
exports.default = AssetsLoader;
