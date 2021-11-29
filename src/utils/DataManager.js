"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = DataManager;
