import { Container } from "."
import { Game } from ".."
import { PointerInputEvent } from "../../utils/InputEventManager/PointerEventManager"
import { Vector2, Color } from "../math"
import { ContainerPropertyOption } from "./Container"

interface TextPropertyOption extends ContainerPropertyOption {
    fill?: boolean
    "shadow offset"?: Vector2
    "shadow blur"?: number
    "line width"?: number
    "shadow color"?: Color
    color?: Color
    "font size"?: number 
    "font style"?: string
    "font variant"?: string
    "font weight"?: string
    "font family"?: string
    "text align"?: string
    "text baseline"?: string
    text?: string
}

export default class Text extends Container {

    /**
     * a character use to draw texts
     * @param propertyOption property of the text character
     */
    constructor(propertyOption:TextPropertyOption) {
        super({
            name: propertyOption.name,
            position: propertyOption.position,
            scale: propertyOption.scale,
            rotation: propertyOption.rotation,
            "z index": propertyOption["z index"],
            opacity: propertyOption.opacity,
            visible: propertyOption.visible
        })

        this._type = "Text"

        this.propertyManager.scheme({
            fill: propertyOption.fill != undefined ? propertyOption.fill : true,
            "shadow offset": propertyOption["shadow offset"] != undefined ? propertyOption["shadow offset"] : new Vector2(0, 0),
            "shadow blur": propertyOption["shadow blur"] != undefined ? propertyOption["shadow blur"] : 0,
            "line width": propertyOption["line width"] != undefined ? propertyOption["line width"] : 1,
            color: propertyOption.color != undefined ? propertyOption.color : new Color(0,0,0,1),
            "shadow color": propertyOption["shadow color"] != undefined ? propertyOption["shadow color"] : new Color(0,0,0,0),
            "font size": propertyOption["font size"] != undefined ? propertyOption["font size"] : 16, 
            "font style": propertyOption["font style"] != undefined ? propertyOption["font style"] :  "normal",
            "font variant": propertyOption["font variant"] != undefined ? propertyOption["font variant"] :  "normal",
            "font weight": propertyOption["font weight"] != undefined ? propertyOption["font weight"] :  "normal",
            "font family": propertyOption["font family"] != undefined ? propertyOption["font family"] :  "sans-serif",
            "text align": propertyOption["text align"] != undefined ? propertyOption["text align"] :  "center",
            "text baseline": propertyOption["text baseline"] != undefined ? propertyOption["text baseline"] :  "middle",
            text: propertyOption.text != undefined ? propertyOption.text :  "Hello, world!",
        })
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
            this.displayPosition = displayPosition.add((this.get("position") as Vector2))
            this.displayScale = displayScale.multiply((this.get("scale") as Vector2))
            this.displayRotation = displayRotation + (this.get("rotation") as number)

            graphics.save()
            graphics.translate(this.displayPosition.x, this.displayPosition.y)
            graphics.rotate(this.displayRotation * Math.PI/180)
            graphics.scale(this.displayScale.x, this.displayScale.y)
            graphics.translate(-this.displayPosition.x, -this.displayPosition.y)
            graphics.globalAlpha = (this.parent instanceof Game ? (this.get("opacity") as number) : (this.parent.get("opacity") as number) * (this.get("opacity") as number))
            graphics.shadowBlur = this.get("shadow blur") as number
            graphics.shadowColor = (this.get("shadow color") as Color).toString()
            graphics.shadowOffsetX = (this.get("shadow offset") as Vector2).x
            graphics.shadowOffsetY = (this.get("shadow offset") as Vector2).y
            graphics.font = `${this.get("font style")} ${this.get("font variant")} ${this.get("font weight")} ${this.get("font size")}px ${this.get("font family")}`
            graphics.textAlign = (this.get("text align") as CanvasTextAlign)
            graphics.textBaseline = (this.get("text baseline") as CanvasTextBaseline)
            if (this.get("fill") == true) {
                graphics.fillStyle = (this.get("color") as Color).toString()
                graphics.fillText(
                    (this.get("text") as string), 
                    this.displayPosition.x - this.game.offset.x,
                    this.displayPosition.y - this.game.offset.y
                )
            } else if (this.get("fill") == false) {
                graphics.lineWidth = this.get("line width") as number
                graphics.strokeStyle = (this.get("color") as Color).toString()
                graphics.strokeText(
                    (this.get("text") as string), 
                    this.displayPosition.x - this.game.offset.x,
                    this.displayPosition.y - this.game.offset.y
                )
            }
            let textWidth = graphics.measureText((this.get("text") as string)).width
            let regionX = (this.displayPosition.x - this.game.offset.x) - textWidth*0.5
            let regionY = (this.displayPosition.x - this.game.offset.x) - (this.get("font size") as number)/2
            if (graphics.textAlign == "center")
                regionX = (this.displayPosition.x - this.game.offset.x) - textWidth*0.5
            else if (graphics.textAlign == "end" || graphics.textAlign == "right")
                regionX = (this.displayPosition.x - this.game.offset.x) - textWidth
            else if (graphics.textAlign == "start" || graphics.textAlign == "left")
                regionX = (this.displayPosition.x - this.game.offset.x)
            if (graphics.textBaseline == "middle")
                regionY = (this.displayPosition.x - this.game.offset.x) - (this.get("font size") as number)/2
            else if (graphics.textBaseline == "top" || graphics.textBaseline == "hanging")
                regionY = (this.displayPosition.x - this.game.offset.x)
            else if (graphics.textBaseline == "bottom" || graphics.textBaseline == "alphabetic" || graphics.textBaseline == "ideographic")
                regionY = (this.displayPosition.x - this.game.offset.x) - (this.get("font size") as number)
            let region = {
                x: regionX,
                y: regionY,
                w: textWidth,
                h: this.get("font size")
            }
            graphics.restore()

            let pointerEvent:PointerInputEvent|null = this.game.pointerEventDetector.inputEvent
            if (pointerEvent != null) {
                let inPoint = Object(graphics).isTextInPath(region, pointerEvent.position.x, pointerEvent.position.y)
                let alpha:number = (this.parent instanceof Game ? (this.get("opacity") as number) : (this.parent.get("opacity") as number) * (this.get("opacity") as number))
                let color:Color = (this.get("color") as Color)
                if (inPoint && alpha > 0 && color.alpha > 0) {
                    this.game.pointerEventDetector.characterDetected = this
                }
            }

            this.Render.render(graphics, this.displayPosition, this.displayScale, this.displayRotation)
        }
    }
}