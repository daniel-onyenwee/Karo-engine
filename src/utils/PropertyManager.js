"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var math_1 = require("../libs/math");
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
     * public method to get all the character propertries
     * @returns return an `Array` of type object
     */
    PropertyManager.prototype.entry = function () {
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
exports.default = PropertyManager;
