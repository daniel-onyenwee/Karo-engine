"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.random = exports.ceil = exports.expm1 = exports.exp = exports.abs = void 0;
var _1 = require(".");
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
