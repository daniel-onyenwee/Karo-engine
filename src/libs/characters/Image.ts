import { Container } from "."
import { Game } from ".."
import { Color } from "../../typeDecleration"
import { Vector2 } from "../math"
import { ContainerPropertyOption } from "./Container"

interface ImagePropertyOption extends ContainerPropertyOption { 
    "shadow offset"?: Vector2
    "shadow blur"?: number
    "line width"?: number
    "shadow color"?: Color
    width?: number
    height?: number
    rate?: number
    source?: Array<string>
}

export default class Image extends Container {

    private currentTime:number = 0

    private currentIndex:number = 0

    /**
     * a character use to draw an image or group of images
     * @param propertyOption property of the image character
     */
    constructor(propertyOption:ImagePropertyOption) {
        super({
            name: propertyOption.name,
            position: propertyOption.position,
            scale: propertyOption.scale,
            rotation: propertyOption.rotation,
            "z index": propertyOption["z index"],
            opacity: propertyOption.opacity,
            visible: propertyOption.visible
        })

        this._type = "Image"

        
        this.propertyManager.scheme({
            source: propertyOption.source != undefined ? propertyOption.source : Array<string>(),
            rate: propertyOption.rate != undefined ? propertyOption.rate : 1,
            height: propertyOption.height != undefined ? propertyOption.height : 40,
            width: propertyOption.width != undefined ? propertyOption.width : 40,
            "shadow offset": propertyOption["shadow offset"] != undefined ? propertyOption["shadow offset"] : new Vector2(0, 0),
            "shadow blur": propertyOption["shadow blur"] != undefined ? propertyOption["shadow blur"] : 0,
            "line width": propertyOption["line width"] != undefined ? propertyOption["line width"] : 1,
            "shadow color": propertyOption["shadow color"] != undefined ? propertyOption["shadow color"] : { red: 0, green: 0, blue: 0, alpha: 0 }
        })

    }

    /**
     * public method to update the character
     * @param dt time difference between the previous frame and the current time
     */
    public update(dt:number): void {
        if (this.get("is initalize") && !this.get("is destroyed")) {
            if ((this.get("source") as Array<string>).length  == 1) {
                this.currentIndex = 0
            } else if ((this.get("source") as Array<string>).length  > 1) {
                this.currentTime += dt
                let rate:number = this.get("rate") as number
                if (this.currentTime >= rate) {
                    this.currentIndex += 1
                    this.currentTime = 0
                    this.currentIndex = this.currentIndex > ((this.get("source") as Array<string>).length - 1) ?  0 : this.currentIndex
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
            let imageAssetsName:string = (this.get("source") as Array<string>)[this.currentIndex]
            if (imageAssetsName != undefined) {
                let imageAsset = this.game.asset(imageAssetsName)
                if (imageAsset != null) {
                    if (imageAsset.type == "image") {
                        graphics.drawImage(
                            imageAsset.data as HTMLImageElement,
                            ((this.displayPosition.x) - (this.get("width") as number)/2) - this.game.offset.x,
                            ((this.displayPosition.y) - (this.get("height") as number)/2) - this.game.offset.y,
                            this.get("width") as number,
                            this.get("height") as number
                        )
                    }
                }
            }
            graphics.restore()

            this.Render.render(graphics, this.displayPosition, this.displayScale, this.displayRotation)
        }
    }
}