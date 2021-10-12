interface ColorOption {
    /**
     * the saturation of red in the color
     */
    red: number
    /**
     * the saturation of green in the color
     */
    green: number
    /**
     * the saturation of blue in the color
     */
    blue:number
    /**
     * the range of transparence of the color
     */
    alpha: number
}

export default class Color {
    public red:number

    public green:number

    public blue:number

    public alpha:number

    /**
     * 🛠 utility to class to handle color related issues
     * @param red the saturation of red in the color
     * @param green the saturation of green in the color
     * @param blue the saturation of blue in the color
     * @param alpha the range of transparence of the color
     */
    constructor(red:number = 0, green:number = 0, blue:number = 0, alpha:number = 1) {
        this.red = red
        this.blue = blue
        this.green = green
        this.alpha = alpha
    }

    /**
     * public method to convert the color to string
     * @returns `string` format of rgba(r, g, b, a)
     */
    public toString(): string {
        return `rgba(${this.red}, ${this.green}, ${this.blue}, ${this.alpha})`
    }

    /**
     * public method to convert the color to a number type array
     * @returns `Array` of 4 numeric values `[red, green, blue, alpha]`
     */
    public toArray(): Array<number> {
        return [this.red, this.green, this.blue, this.alpha]
    }

    /**
     * public method to generate `Color` from a number type array
     * @param colorArray `Array` of 4 numeric values `[red, green, blue, alpha]`
     * @returns `Color`
     */
    public fromArray(colorArray:Array<number>): Color {
        return new Color(
            (colorArray[0] != undefined ? colorArray[0]: 0),
            (colorArray[1] != undefined ? colorArray[1]: 0),
            (colorArray[2] != undefined ? colorArray[2]: 0),
            (colorArray[3] != undefined ? colorArray[3]: 1)
        )
    }

    /**
     * public method to convert the color to a `Object`
     * @returns an `Object` of key `red`, `green`, `blue`, `alpha`
     */
    public toObject(): ColorOption {
        return {
            red: this.red,
            green: this.green,
            blue: this.blue,
            alpha: this.alpha
        }
    }

    /**
     * public method to generate `Color` from an `Object` of key `red`, `green`, `blue`, `alpha`
     * @param colorObject an `Object` of key `red`, `green`, `blue`, `alpha`
     * @returns `Color`
     */
    public fromObject(colorObject:ColorOption): Color {
        return new Color(colorObject.red, colorObject.green, colorObject.blue, colorObject.alpha)
    }
}
