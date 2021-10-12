"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DataStorage = /** @class */ (function () {
    /**
     * 🛠 utility class to handle the storage of data for all the 🎭 characters
     * @param parent instance of the character the data storage belong to
     */
    function DataStorage(parent) {
        this.dataMap = new Map();
        this.parent = parent;
    }
    /**
     * public method to get a reference of a child character data store
     * @param path the child character path
     * @returns if the child character exist return its data store return `null`
     */
    DataStorage.prototype.ref = function (path) {
        if (this.parent.has(path))
            return this.parent.child(path).store;
        else
            return null;
    };
    return DataStorage;
}());
exports.default = DataStorage;
