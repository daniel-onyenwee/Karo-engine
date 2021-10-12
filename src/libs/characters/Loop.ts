import { Container } from "."
import { Vector2 } from "../math"

interface LoopPropertyOption {
    /**
     * character name
     */
    name: string
    time?: number
    play?: boolean
    /**
     * set character opactiy. default value `1`
     */
    opacity?: number
    /**
     * specifies whether the character is rendered. default value `true` 
     */
    visible?: boolean
    /**
     * specifies the stack level of the caharacter. default value `1`
     */
    "z index"?: number
}

export default class Loop extends Container {

    /**
     * a character use to repeat a particular task
     * @param propertyOption property of the loop character
     */
    constructor(propertyOption:LoopPropertyOption) {
        super({
            name: propertyOption.name,
            "z index": propertyOption["z index"],
            opacity: propertyOption.opacity,
            visible: propertyOption.visible
        })

        this._type = "Loop"

        this.propertyManager.scheme({
            time: propertyOption.time != undefined ? propertyOption.time : 0,
            play: propertyOption.play != undefined ? propertyOption.play : false
        })

        this.propertyManager.delete("position")
        this.propertyManager.delete("rotation")
        this.propertyManager.delete("scale")
    }

    /**
     * public method to update the character
     * @param dt time difference between the previous frame and the current time
     */
    public update(dt:number): void {
        if (this.get("is initalize") && !this.get("is destroyed")) {
            if (this.get("play") == true) {
                [...Array.from(Array(this.get("time")).keys())].forEach((i:number) => {
                    i = i + 1
                })
                this.set("play", false)
            }
            this.Updater.update(dt)
        }
    }

    /**
     * public method to render the character
     * @param graphic instance of `CanvasRenderingContext2D` use to draw the character
     * @param displayPosition actual position of the character on the canvas
     * @param displayScale actual scale of the character
     * @param displayRotation actual rotation of the character
     */
    public render(graphics:CanvasRenderingContext2D, displayPosition:Vector2, displayScale:Vector2, displayRotation:number): void {
        if (this.get("is initalize") && !this.get("is destroyed") && this.get("visible")) {
            this.displayPosition = displayPosition
            this.displayScale = displayScale
            this.displayRotation = displayRotation

            this.Render.render(graphics, this.displayPosition, this.displayScale, this.displayRotation)
        }
    }
}