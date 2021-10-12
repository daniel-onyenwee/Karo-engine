import { Game } from ".."
import PropertyManager from "../../utils/PropertyManager"
import { Vector2 } from "../math"
import * as Slim from "../../utils/slim"
import { CharacterChildrenType, CharacterParentType } from "../../typeDecleration"
import DataStorage from "../../utils/DataStorage"


export interface ContainerPropertyOption {
    /**
     * character name
     */
    name: string
    /**
     * set character opactiy. default value `1`
     */
    opacity?: number
    /**
     * set character position. default value `Vector2(0, 0)`
     */
    position?: Vector2
    /**
     * set character scale. default value `Vector2(1, 1)`
     */
    scale?: Vector2
    /**
     * set character rotation. default value `0`
     */
    rotation?: number
    /**
     * specifies whether the character is rendered. default value `true` 
     */
    visible?: boolean
    /**
     * specifies the stack level of the caharacter. default value `1`
     */
    "z index"?: number
}

export default class Container {
    protected Render:Slim.Render = new Slim.Render()

    protected Storage:Slim.Storage = new Slim.Storage(this)

    protected Updater!:Slim.Updater

    protected dataStorage:DataStorage =  new DataStorage(this)

    protected displayScale!:Vector2

    protected displayPosition!:Vector2

    protected displayRotation!:number

    private displaySize = {
        x: 40,
        y: 50
    }

    private _parent!:CharacterParentType

    protected canvas!:HTMLCanvasElement

    private _game!:Game

    protected propertyManager:PropertyManager = new PropertyManager()

    /**
     * public method to set a property
     * @param name name name of the property to set
     * @param value value to set the property with
     */
    public set = this.propertyManager.set.bind(this.propertyManager)

    /**
     * public method to get a property
     * @param name name name of the property to get
     * @returns if property exist return it value else return `null`
     */
    public get = this.propertyManager.get.bind(this.propertyManager)

    /**
     * public method add a character to the `Storage` instance
     * @param character character to add
     */
    public add = this.Storage.add.bind(this.Storage)

    /**
     * public method to get a character
     * @param path character path (e.g `character/character_child`)
     * @returns return the character instance if the character exist else return `null`
     */
    public child = this.Storage.child.bind(this.Storage)

    public store = this.dataStorage.dataMap

    /**
     * public method to get a reference of a child character data store
     * @param path the child character path
     * @returns if the child character exist return its data store return `null`
     */
    public ref = this.dataStorage.ref.bind(this.dataStorage)

    /**
     * public method to check if a character exist
     * @param path character path (e.g `character/character_child`)
     * @returns return `true` if character exist else return `false`
     */
    public has = this.Storage.has.bind(this.Storage)

    protected _type: string = "Container"

    /**
     * a character with no special meaning at all but used to group other characters
     * @param propertyOption property of container character
     */
    constructor(propertyOption:ContainerPropertyOption) {
        this.propertyManager.scheme({
            name: propertyOption.name,
            "is destroyed": false,
            "is initalize": false,
            path: String(),
            opacity: propertyOption.opacity != undefined ? propertyOption.opacity : 1,
            position: propertyOption.position != undefined ? propertyOption.position : new Vector2(0, 0),
            scale: propertyOption.scale != undefined ? propertyOption.scale : new Vector2(1, 1),
            rotation: propertyOption.rotation != undefined ? propertyOption.rotation : 0,
            visible: propertyOption.visible != undefined ? propertyOption.visible : true,
            "z index": propertyOption["z index"] != undefined ? propertyOption["z index"] : 1
        })
    }
    
    /**
     * public getter to get the type of the character
     */
    public get type(): string {
        return this._type
    }

    /**
     * public getter to get the parent of the character
     */
    public get parent(): CharacterParentType {
        return this._parent
    }

    /**
     * public getter to get the game instance
     */
    public get game(): Game {
        return this._game
    }

    /**
     * public method to initalize the character
     * @param canvas instance of the `HTMLCanvasElement`
     * @param game insatance of the `Game`
     * @param parent parnet character instance of the character
     */
    public initalize(canvas:HTMLCanvasElement, game:Game, parent:CharacterParentType) { 
        this._parent = parent
        this._game = game
        this.canvas = canvas
        this.set("is initalize", true)
        this.Updater = new Slim.Updater(this.canvas, this._game, this, this.Storage, this.Render)
    }
 
    /**
     * public method to destroy the character
     */
    public destroy(): void {
        this.set("is destroyed", true)
    }

    /**
     * public method to update the character
     * @param dt time difference between the previous frame and the current time
     */
     public update(dt:number): void {
        if (this.get("is initalize") && !this.get("is destroyed")) {

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

            this.Render.render(graphics, this.displayPosition, this.displayScale, this.displayRotation)
        }
    }
    
}