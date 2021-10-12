import { Vector2 } from "."

/**
 * Returns the absolute value of a number (the value without regard to whether it is positive or negative)
 * @param x A number or `Vector2` expression for which the absolute value is needed
 */
export const abs = (x:number|Vector2): number|Vector2 => {
    let value:number|Vector2 = typeof x == "number"  ?
            Math.abs(x) :
            new Vector2(Math.abs(x.x), Math.abs(x.y)) 
    return value
}

/**
 * Returns e (the base of natural logarithms) raised to a power
 * @param x A number or `Vector2` expression representing the power of e
 */
export const exp = (x:number|Vector2): number|Vector2 => {
    let value:number|Vector2 = typeof x == "number"  ?
            Math.exp(x) :
            new Vector2(Math.exp(x.x), Math.exp(x.y)) 
    return value
}


/**
 * Returns the result of (e^x - 1), which is an implementation-dependent approximation to subtracting 1 from the exponential function of x (e raised to the power of x, where e is the base of the natural logarithms)
 * @param x A number or `Vector2` expression
 */
export const expm1 = (x:number|Vector2): number|Vector2 => {
    let value:number|Vector2 = typeof x == "number"  ?
            Math.expm1(x) :
            new Vector2(Math.expm1(x.x), Math.expm1(x.y)) 
    return value
}

/**
 * Returns the smallest integer greater than or equal to its numeric argument
 * @param x A number or `Vector2` expression
 */
export const ceil = (x:number|Vector2): number|Vector2 => {
    let value:number|Vector2 = typeof x == "number"  ?
            Math.ceil(x) :
            new Vector2(Math.ceil(x.x), Math.ceil(x.y)) 
    return value
}

/**
 * Returns a pseudorandom number between x and y
 * @param x A number expression
 * @param y A number expression
 */
export const random = (x:number, y:number): number => {
    return x +  Math.random() * (y - x) 
}

///stopped at R