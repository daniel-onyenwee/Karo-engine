"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = Storage;
