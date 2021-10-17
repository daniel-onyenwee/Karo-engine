"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ceil = exports.abs = exports.random = exports.expm1 = exports.exp = exports.LOG10E = exports.LN2 = exports.LN10 = exports.LOG2E = exports.SQRT2 = exports.SQRT1_2 = exports.E = exports.PI = exports.Color = exports.Vector2 = void 0;
var Color_1 = __importDefault(require("./Color"));
exports.Color = Color_1.default;
var constants_1 = require("./constants");
Object.defineProperty(exports, "PI", { enumerable: true, get: function () { return constants_1.PI; } });
Object.defineProperty(exports, "E", { enumerable: true, get: function () { return constants_1.E; } });
Object.defineProperty(exports, "SQRT1_2", { enumerable: true, get: function () { return constants_1.SQRT1_2; } });
Object.defineProperty(exports, "SQRT2", { enumerable: true, get: function () { return constants_1.SQRT2; } });
Object.defineProperty(exports, "LOG2E", { enumerable: true, get: function () { return constants_1.LOG2E; } });
Object.defineProperty(exports, "LN10", { enumerable: true, get: function () { return constants_1.LN10; } });
Object.defineProperty(exports, "LN2", { enumerable: true, get: function () { return constants_1.LN2; } });
Object.defineProperty(exports, "LOG10E", { enumerable: true, get: function () { return constants_1.LOG10E; } });
var functions_1 = require("./functions");
Object.defineProperty(exports, "exp", { enumerable: true, get: function () { return functions_1.exp; } });
Object.defineProperty(exports, "expm1", { enumerable: true, get: function () { return functions_1.expm1; } });
Object.defineProperty(exports, "random", { enumerable: true, get: function () { return functions_1.random; } });
Object.defineProperty(exports, "abs", { enumerable: true, get: function () { return functions_1.abs; } });
Object.defineProperty(exports, "ceil", { enumerable: true, get: function () { return functions_1.ceil; } });
var Vector2_1 = __importDefault(require("./Vector2"));
exports.Vector2 = Vector2_1.default;