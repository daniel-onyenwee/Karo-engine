import { Container } from "."
import { Vector2 } from "../math"

interface TimerPropertyOption {
    /**
     * character name
     */
    name: string
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
    "wait time"?: number
    repeat?: boolean
    play?: boolean
}

export default class Timer extends Container {
    private currentTime:number = 0

    /**
     * a character use to create a timer
     * @param propertyOption property of the timer character
     */
    constructor(propertyOption:TimerPropertyOption) {
        super({
            name: propertyOption.name,
            "z index": propertyOption["z index"],
            opacity: propertyOption.opacity,
            visible: propertyOption.visible
        })

        this._type = "Timer"

        this.propertyManager.scheme({
            "wait time": propertyOption["wait time"] != undefined ? propertyOption["wait time"] : 1,
            play: propertyOption.play != undefined ? propertyOption.play : false,
            repeat: propertyOption.repeat != undefined ? propertyOption.repeat : false
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
        let waitTime:number = this.get("wait time") as number
        let repeat:boolean = this.get("repeat") as boolean
        if (this.get("is initalize") && !this.get("is destroyed")) {
            if (this.get("play") == true) {
                this.currentTime += dt
                if (this.currentTime >= waitTime) {
                    this.currentTime = 0
                    if (!repeat) {
                        this.set("play", false)
                    }
                }
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