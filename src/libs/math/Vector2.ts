export default class Vector2 {
    private _x:number

    private _y:number

    constructor (x?:number, y?:number) {
        x != undefined ? this._x = x : this._x = 0
        y != undefined ? this._y = y : this._y = 0
    }

    public get x() : number {
        return this._x
    }

    public get y(): number {
        return this._y
    }

    public set setX(x:number) {
        this._x = x;2
    }

    public set setY(y:number) {
        this._y = y
    }

    /**
     * public method to add other vectors to this vector
     * @returns `Vector2`
     */
    public add(...others:Array<Vector2>): Vector2 {
        let returnValue:Vector2  = this
        if (others.length == 1) {
            let other:Vector2 = others[0]
            returnValue = new Vector2(returnValue.x + other.x, returnValue.y + other.y)
        } else if (others.length > 1) {
            others.forEach(other => {
                returnValue = returnValue.add(other)
            })
        }
        return returnValue
    } 
    
    /**
     * public method to substr other vectors to this vector
     * @returns `Vector2`
     */
    public substr(...others:Array<Vector2>): Vector2 {
        let returnValue:Vector2  = this
        if (others.length == 1) {
            let other:Vector2 = others[0]
            returnValue = new Vector2(returnValue.x - other.x, returnValue.y - other.y)
        } else if (others.length > 1) {
            others.forEach(other => {
                returnValue = returnValue.substr(other)
            })
        }
        return returnValue
    } 

    /**
     * public method to find the dot product between this vector and another vector
     * @param other the other vector to find the dot product with
     * @returns `Vector2`
     */
    public dot(other:Vector2): number {
        return ((this._x * other.x) + (this._y * other.y))
    }

    /**
     * public method to divide other vectors to this vector
     * @returns `Vector2`
     */
    public divide(...others:Array<Vector2>): Vector2 {
        let returnValue:Vector2  = this
        if (others.length == 1) {
            let other:Vector2 = others[0]
            returnValue = new Vector2(returnValue.x / other.x, returnValue.y / other.y)
        } else if (others.length > 1) {
            others.forEach(other => {
                returnValue = returnValue.divide(other)
            })
        }
        return returnValue
    }

    /**
     * public method to multiply other vectors or number to this vector
     * @returns `Vector2`
     */
    public multiply(...others:Array<Vector2|number>): Vector2 {
        let returnValue:Vector2  = this
        if (others.length == 1) {
            let other:Vector2|number = others[0]
            if (typeof other == "number") {
                returnValue = new Vector2(returnValue.x * other, returnValue.y * other)
            } else {
                returnValue = new Vector2(returnValue.x * other.x, returnValue.y * other.y)
            }
        } else if (others.length > 1) {
            others.forEach(other => {
                returnValue = returnValue.multiply(other)
            })
        }
        return returnValue
    }

    /**
     * public method to convert this vector to an number type array
     * @returns `number[]`
     */
    public toArray(): number[] {
        return [this._x, this._y]
    }

    /**
     * public method to convert this vector to a string
     * @returns `string`
     */
    public toString(): string {
        return `(${this._x}, ${this._y})`
    }

    /**
     * public method to convert this vector to an object
     * @returns `object`
     */
    public toObject(): {x:number, y:number} {
        return {
            x: this._x,
            y: this._y
        }
    }

    /**
     * public method to find the angle of this vector
     * @returns `number` 
     */
    public angle() : number {;
        return Math.tan((this._y/this._x))
    }

    /**
     * public method to find the magnitude of this vector 
     * @returns `number`
     */
    public magnitude(): number {
        return Math.sqrt(Math.abs(this._x) ** 2 + Math.abs(this._y) ** 2)
    }

    /**
     * public method to normalize this vector
     * @returns 
     */
    public normalize(): Vector2 {
        let length:number = this.magnitude()
        let returnVector2:Vector2 = new Vector2(0, 0)
        if (length > 0.00001) {
            returnVector2.setX = this.x/length
            returnVector2.setY = this.y/length
        }
        return returnVector2
    }

}