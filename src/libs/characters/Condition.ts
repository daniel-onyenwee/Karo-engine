import { Container } from "."
import { Vector2 } from "../math"

type ConditionType = "greater than"|"less than"|"equal to"|"not"|"greater than or equal to"|"less than or equal to"

interface LoopPropertyOption {
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
    condition?: ConditionType
    "left side"?: number|string|boolean
    "right side"?: number|string|boolean
    play?: boolean
}

export default class Condition extends Container {

    constructor(propertyOption:LoopPropertyOption) {
        super({
            name: propertyOption.name,
            "z index": propertyOption["z index"],
            opacity: propertyOption.opacity,
            visible: propertyOption.visible
        })

        this._type = "Condition"

        this.propertyManager.scheme({
            play: propertyOption.play != undefined ? propertyOption.play : false,
            condition: propertyOption.condition != undefined ? propertyOption.condition : "equal to",
            "left side": propertyOption["left side"] != undefined ? propertyOption["left side"] : 0,
            "right side": propertyOption["right side"] != undefined ? propertyOption["right side"] : 0
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
            let condition:ConditionType = this.get("condition") as ConditionType
            let rightSide:number|string|boolean = this.get("right side") as number|string|boolean
            let leftSide:number|string|boolean = this.get("left side") as number|string|boolean
            if (this.get("play") == true) {
                if (condition == "equal to") {
                    if (leftSide == rightSide) {
                        
                    } else {
                        
                    }
                } else if (condition == "greater than") {
                    if (typeof leftSide == "number" && typeof rightSide == "number") {
                        if (leftSide > rightSide) {

                        } else {
                            
                        }
                    }
                } else if (condition == "greater than or equal to") {
                    if (typeof leftSide == "number" && typeof rightSide == "number") {
                        if (leftSide >= rightSide) {

                        } else {
                            
                        }
                    }
                } else if (condition == "less than") {
                    if (typeof leftSide == "number" && typeof rightSide == "number") {
                        if (leftSide < rightSide) {

                        } else {
                            
                        }
                    }
                } else if (condition == "less than or equal to") {
                    if (typeof leftSide == "number" && typeof rightSide == "number") {
                        if (leftSide <= rightSide) {

                        } else {
                            
                        }
                    }
                } else if (condition == "not") {
                    if (leftSide != rightSide) {

                    } else {
                        
                    }
                }
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