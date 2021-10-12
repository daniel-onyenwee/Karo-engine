import { Container } from "."
import { Game } from ".."
import { Color } from "../../typeDecleration"
import { Vector2 } from "../math"
import { ContainerPropertyOption } from "./Container"

interface BoxPropertyOption extends ContainerPropertyOption {
    fill?: boolean
    "shadow offset"?: Vector2
    "shadow blur"?: number
    "line width"?: number
    "shadow color"?: Color
    color?: Color
    width?: number
    height?: number
}

export default class Box extends Container {

    /**
     * a character use to draw a box
     * @param propertyOption property of the box character
     */
    constructor(propertyOption:BoxPropertyOption) {
        super({
            name: propertyOption.name,
            position: propertyOption.position,
            scale: propertyOption.scale,
            rotation: propertyOption.rotation,
            "z index": propertyOption["z index"],
            opacity: propertyOption.opacity,
            visible: propertyOption.visible
        })

        this._type = "Box"

        this.propertyManager.scheme({
            height: propertyOption.height != undefined ? propertyOption.height : 40,
            width: propertyOption.width != undefined ? propertyOption.width : 40,
            fill: propertyOption.fill != undefined ? propertyOption.fill : true,
            "shadow offset": propertyOption["shadow offset"] != undefined ? propertyOption["shadow offset"] : new Vector2(0, 0),
            "shadow blur": propertyOption["shadow blur"] != undefined ? propertyOption["shadow blur"] : 0,
            "line width": propertyOption["line width"] != undefined ? propertyOption["line width"] : 1,
            color: propertyOption.color != undefined ? propertyOption.color : { red: 0, green: 0, blue: 0, alpha: 1 },
            "shadow color": propertyOption["shadow color"] != undefined ? propertyOption["shadow color"] : { red: 0, green: 0, blue: 0, alpha: 0 }
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
            graphics.shadowColor = `rgba(${(this.get("shadow color") as Color).red}, ${(this.get("shadow color") as Color).green}, ${(this.get("shadow color") as Color).blue}, ${(this.get("shadow color") as Color).alpha != undefined ? (this.get("shadow color") as Color).alpha : 1})`
            graphics.shadowOffsetX = (this.get("shadow offset") as Vector2).x
            graphics.shadowOffsetY = (this.get("shadow offset") as Vector2).y
            graphics.lineWidth = this.get("line width") as number
            graphics.beginPath()
            if (this.get("fill") == true) 
                graphics.fillStyle = `rgba(${(this.get("color") as Color).red}, ${(this.get("color") as Color).green}, ${(this.get("color") as Color).blue}, ${(this.get("color") as Color).alpha != undefined ? (this.get("color") as Color).alpha : 1})`
            else if (this.get("fill") == false)
                graphics.strokeStyle = `rgba(${(this.get("color") as Color).red}, ${(this.get("color") as Color).green}, ${(this.get("color") as Color).blue}, ${(this.get("color") as Color).alpha != undefined ? (this.get("color") as Color).alpha : 1})`
            graphics.rect(
                ((this.displayPosition.x) - (this.get("width") as number)/2) - this.game.offset.x,
                ((this.displayPosition.y) - (this.get("height") as number)/2) - this.game.offset.y,
                (this.get("width") as number),
                (this.get("height") as number)
            )
            if (this.get("fill") == true)
                graphics.fill()
            else if (this.get("fill") == false)
                graphics.stroke()
            
            graphics.restore()

            this.Render.render(graphics, this.displayPosition, this.displayScale, this.displayRotation)
        }
    }
}