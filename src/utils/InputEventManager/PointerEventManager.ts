import { Game } from "../.."
import { Vector2 } from "../../libs/math"
import { CharacterChildrenType } from "../../typeDecleration"

/**
 * 🛠 utility class use to detect mouse, pen and touch event
 */
export class PointerEventDetector {
    private _inputEvent:PointerInputEvent|null = null

    private _characterDetected:CharacterChildrenType|null = null

    public set inputEvent(inputEvent:PointerInputEvent|null) {
        this._inputEvent = inputEvent
    }

    public get inputEvent(): PointerInputEvent|null {
        return this._inputEvent
    }

    public set characterDetected(characterDetected:CharacterChildrenType|null) {
        this._characterDetected = characterDetected
    }

    public get characterDetected():CharacterChildrenType|null {
        return this._characterDetected
    }
}

export class PointerInputEvent {
    private _device:string = "mouse"

    /**
     * indicates the device type that caused the event (mouse, pen, touch, etc.)
     */
    public get device(): string {
        return this._device
    }
    
    private _pressure!:number

    /**
     * the normalized pressure of the pointer input in the range of 0 to 1, where 0 and 1 represent the minimum and maximum pressure the hardware is capable of detecting, respectively 
     */
    public get pressure(): number {
        return this._pressure
    }

    private _height:number

    /**
     * the height (magnitude on the Y axis), in CSS pixels, of the contact geometry of the pointer
     */
    public get height(): number {
        return this._height
    }

    private _width:number

    /**
     * the width (magnitude on the X axis), in CSS pixels, of the contact geometry of the pointer
     */
    public get width(): number {
        return this._width
    }

    private _position:Vector2

    /**
     * the X-Y position on the screen the device touch/hit
     */
    public get position(): Vector2 {
        return this._position
    }

    private _otherPosition:Array<Vector2> = Array<Vector2>()

    /**
     * a vector type array of the other position the device touch/hit after the first touch/hit
     */
    public get otherPosition(): Array<Vector2> {
        return this._otherPosition
    }

    private _tiltPosition:Vector2 = new Vector2()

    /**
     * a vector object containing the plane angle (in degrees, in the range of -90 to 90) between the Y–Z plane and the plane containing both the pointer (e.g. pen stylus) axis and the Y axis as the `y` value and between the X–Z plane and the plane containing both the pointer (e.g. pen stylus) axis and the X axis as the `x` value
     */
    public get tiltPosition(): Vector2 {
        return this._tiltPosition
    }

    private _twist:number = 0

    /**
     * the clockwise rotation of the pointer (e.g. pen stylus) around its major axis in degrees, with a value in the range 0 to 359
     */
    public get twist(): number {
        return this._twist
    }

    private _time:number

    /**
     * the number of time in seconds the event happen
     */
    public get time(): number {
        return this._time
    }

    private _type:string

    /**
     * indicates the type of event caused by the device (move, drag, press, release, right press, right release, swipe up, swipe down, swipe right, swipe left)
     */
    public get type(): string {
        return this._type
    }

    /**
     * 🛠 utility class that contain information about a pointer(mouse, pen, touch) event
     * @param device indicates the device type that caused the event (mouse, pen, touch, etc.)
     * @param pressure the normalized pressure of the pointer input in the range of 0 to 1, where 0 and 1 represent the minimum and maximum pressure the hardware is capable of detecting, respectively
     * @param height the height (magnitude on the Y axis), in CSS pixels, of the contact geometry of the pointer
     * @param width the width (magnitude on the X axis), in CSS pixels, of the contact geometry of the pointer
     * @param position the X-Y position on the screen the device touch/hit
     * @param otherPosition a vector type array of the other position the device touch/hit after the first touch/hit
     * @param tiltPosition a vector object containing the plane angle (in degrees, in the range of -90 to 90) between the Y–Z plane and the plane containing both the pointer (e.g. pen stylus) axis and the Y axis as the `y` value and between the X–Z plane and the plane containing both the pointer (e.g. pen stylus) axis and the X axis as the `x` value
     * @param twist the clockwise rotation of the pointer (e.g. pen stylus) around its major axis in degrees, with a value in the range 0 to 359
     * @param time the number of time in seconds the event happen
     * @param type indicates the type of event caused by the device (move, drag, press, release, right press, right release, swipe up, swipe down, swipe right, swipe left)
     */
    constructor(
       device:string,
       pressure:number,
       height:number,
       width:number,
       position:Vector2,
       otherPosition:Array<Vector2>,
       tiltPosition:Vector2,
       twist:number,
       time:number,
       type:string
    ) {
        this._device = device
        this._pressure = pressure
        this._height = height
        this._width = width
        this._position = position
        this._otherPosition = otherPosition
        this._tiltPosition = tiltPosition
        this._twist = twist
        this._time = time
        this._type = type
    }
}

export default class PointerEventManager {
    private game:Game

    private canvas:HTMLCanvasElement

    private swipeStartPosition:Vector2 = new Vector2()

    private swipeStarted:boolean = false

    private isPointerPressed:boolean = false

    private device:string = "mouse"

    private pressure!:number

    private height!:number

    private width!:number

    private position:Vector2 = new Vector2()

    private otherPosition:Array<Vector2> = Array<Vector2>()

    private tiltPosition:Vector2 = new Vector2()

    private isDragging:boolean = false

    private twist:number = 0

    private gameInputHandle:(event:PointerInputEvent) => void

    /**
     * 🛠 utility class to mouse, pen and touch event
     * @param canvas instance of the `HTMLCanvasElement`
     * @param game instance of the `Game` object
     * @param gameInputHandle callback function called when the event is trigged 
     */
    constructor(canvas:HTMLCanvasElement, game:Game, gameInputHandle:(event:PointerInputEvent) => void) {
        this.canvas = canvas
        this.game = game
        this.gameInputHandle = gameInputHandle

        this.setEventListeners()
    }

    /**
     * private method to handle browser pointer event
     * @param event instance of the `PointerEvent` object
     */
    private pointerEventHandle(event:PointerEvent): void {  
        let time:number = 0, type:string = "move"      
        this.device = event.pointerType
        this.position.setX = event.clientX - this.canvas.getBoundingClientRect().left
        this.position.setY = event.clientY - this.canvas.getBoundingClientRect().top
        time = event.timeStamp/1000
        this.height = event.height
        this.width = event.width
        this.pressure = event.pressure
        this.tiltPosition.setY = event.tiltY
        this.tiltPosition.setX = event.tiltX
        this.twist = event.twist
        if (event.type == "pointermove" || event.type == "pointerover" ) {
            if (this.isPointerPressed) {
                type = "drag"
                this.isDragging = true
            }
            else if (!this.isPointerPressed)
                type = "move"
        }
        if (event.type == "pointerdown") {
            type = "press"
            this.isPointerPressed = true
            if  (event.button == 2) {
                type = "right press"
                this.isPointerPressed = false
            }            
        }
        
        if (event.type == "pointerup") {
            if (!this.isDragging) {
                type = "release"
                if  (event.button == 2)
                    type = "right release" 
            }
            this.isPointerPressed = false
            this.isDragging = false
        }

        this.gameInputHandle(new PointerInputEvent(this.device, this.pressure, this.height, this.width, this.position, this.otherPosition, this.tiltPosition, this.twist, time, type))
    }

    /**
     * private method to handle touch device swipe event
     * @eventName name of the touch event trigged
     * @param event instance of the `TouchEvent` object
     */
    private swipeEventHandle(eventName:string, event:TouchEvent) {
        let swipePositionDiff:Vector2 = new Vector2(), type:string = "move", time:number = event.timeStamp/1000
        if (eventName == "touchstart") {
            this.swipeStartPosition.setX = event.touches[0].clientX - this.canvas.getBoundingClientRect().left
            this.swipeStartPosition.setY = event.touches[0].clientY - this.canvas.getBoundingClientRect().top
            this.position = this.swipeStartPosition
            this.swipeStarted = true
        } else if (eventName == "touchmove") {
            if (this.swipeStarted) {
                let otherSwipePosition:Vector2 = new Vector2(event.touches[0].clientX - this.canvas.getBoundingClientRect().left, event.touches[0].clientY - this.canvas.getBoundingClientRect().left)
                this.otherPosition = Array<Vector2>()
                this.otherPosition.push(otherSwipePosition)
                swipePositionDiff = this.swipeStartPosition.substr(otherSwipePosition)
                swipePositionDiff = new Vector2(
                    Math.abs(swipePositionDiff.x),
                    Math.abs(swipePositionDiff.y)
                )
                if (swipePositionDiff.x > swipePositionDiff.y) {
                    if (swipePositionDiff.x > 0)
                        type = "swipe right"
                    else
                        type = "swipe left"
                } else {
                    if (swipePositionDiff.y > 0)
                        type = "swipe down"
                    else
                        type = "swipe up"
                }
                this.swipeStartPosition = new Vector2()
                this.swipeStarted = false
            }
        }
        this.gameInputHandle(new PointerInputEvent(this.device, this.pressure, this.height, this.width, this.position, this.otherPosition, this.tiltPosition, this.twist, time, type))
    }

    /**
     * public method to set the mouse, pen and touch event listeners
     */
    private setEventListeners(): void {
        this.canvas.ondragstart = () => false
        this.canvas.style.touchAction = "none"

        this.canvas.addEventListener("touchstart", (ev:TouchEvent) => {
            if (this.game.isplaying)
                this.swipeEventHandle("touchstart", ev)
        }, false)

        this.canvas.addEventListener("touchmove", (ev:TouchEvent) => {
            if (this.game.isplaying)
                this.swipeEventHandle("touchmove", ev)
        }, false)

        this.canvas.addEventListener("pointerdown", (ev:PointerEvent) => {
            if (this.game.isplaying)
                this.pointerEventHandle(ev) 
        })

        this.canvas.addEventListener("pointermove", (ev:PointerEvent) => {
            if (this.game.isplaying)
                this.pointerEventHandle(ev) 
        })

        this.canvas.addEventListener("pointerover", (ev:PointerEvent) => {
            if (this.game.isplaying)
                this.pointerEventHandle(ev) 
        })

        this.canvas.addEventListener("pointerup", (ev:PointerEvent) => {
            if (this.game.isplaying)
                this.pointerEventHandle(ev) 
        })
    }
}