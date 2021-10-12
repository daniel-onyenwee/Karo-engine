import { Container } from "."
import { Vector2 } from "../math"

interface SoundPropertyOption {
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
    repeat?: boolean
    volume?: number
    rate?: number
    play?: boolean
    source?: string
}

export default class Sound extends Container {
    private audio:HTMLAudioElement|null = null

    /**
     * a character use to play sounds
     * @param propertyOption property of the sound character
     */
    constructor(propertyOption:SoundPropertyOption) {
        super({
            name: propertyOption.name,
            "z index": propertyOption["z index"],
            opacity: propertyOption.opacity,
            visible: propertyOption.visible
        })

        this._type = "Sound"

        this.propertyManager.scheme({
            source: propertyOption.source != undefined ? propertyOption.source : String(),
            repeat: propertyOption.repeat != undefined ? propertyOption.repeat : false,
            rate: propertyOption.rate != undefined ? propertyOption.rate : 1,
            volume: propertyOption.volume != undefined ? propertyOption.volume : 100,
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
            if (this.audio == null) {
                let audioSource:string = this.get("source") as string
                let audioAsset = this.game.asset(audioSource)
                if (audioAsset != null) {
                    if (audioAsset.type == "audio") {
                        this.audio = (audioAsset.data as HTMLAudioElement).cloneNode(true) as HTMLAudioElement
                    }
                }
            } else {
                this.audio.volume = (this.get("volume") as number)/100
                this.audio.loop = this.get("repeat") as boolean
                this.audio.playbackRate = this.get("rate") as number
                this.audio.onended = () => {
                    if (!this.get("repeat")) {
                        this.set("play", false)
                        this.audio?.pause()
                    }
                }
            }
            if (this.audio != null) {
                if (this.get("play") == true) {
                    if (this.audio.paused)
                        this.audio.play()
                } else if (this.get("play") == false) {
                    this.audio.pause()
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