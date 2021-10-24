import * as Slim from "../utils/slim"
import { Color, Vector2 } from "./math"
import AssetsLoader from "../utils/AssetLoader"
import { KeyboardEventManager } from "../utils/InputEventManager"
import Camera from "../utils/Camera"
import PropertyManager from "../utils/PropertyManager"
import { CharacterTreeOption } from "../typeDecleration"
import DataManager from "../utils/DataManager"
import EventEmitter from "../utils/EventEmitter"

export interface GamePropertyOption {
    "background color"?: Color
    author?: string
    version?: string
    description?: string
    icon?: string
    name?: string
    canvas: HTMLCanvasElement
}

export default class Game {
    private canvas:HTMLCanvasElement

    private oldTime:number = 0

    private assetsLoader:AssetsLoader = new AssetsLoader()

    private graphic:CanvasRenderingContext2D

    private _devMode:"off"|"on" = "on"

    private Render:Slim.Render = new Slim.Render()

    private Storage:Slim.Storage = new Slim.Storage(this)

    private camera:Camera = new Camera(this)

    private Updater:Slim.Updater

    private propertyManager:PropertyManager = new PropertyManager()

    private eventEmitter:EventEmitter = new EventEmitter(this)

    /**
     * public method to set an event
     * @param event name of event to add
     * @param callback callback function to call when the event is emiited
     */
    public on = this.eventEmitter.on.bind(this.eventEmitter)

    /**
     * public method to call an event
     * @param event name of event to emit
     * @param args function arguments of the event
     * @returns return `true` if the event is emitted else return `false`
     */
    public emit = this.eventEmitter.emit.bind(this.eventEmitter)

    /**
     * public method to set a property
     * @param name name name of the property to set
     * @param value value to set the property with
     */
    public set = this.propertyManager.set.bind(this.propertyManager)

    public store:DataManager = new DataManager(this)

    /**
     * public method to get a property
     * @param name name name of the property to get
     * @returns if property exist return it value else return `null`
     */
    public get = this.propertyManager.get.bind(this.propertyManager)

    /**
     * public method to load a list of assets
     * @param assets list of assets to load
     */
    public load = this.assetsLoader.load.bind(this.assetsLoader)

    /**
     * public method to delete a list of assets
     * @param assets list of assets to delete
     */
    public delete = this.assetsLoader.delete.bind(this.assetsLoader)

    /**
     * public method to get an assets
     * @param asset name of asset to get
     * @returns if asset exist return a Javascript object containing the asset data else return `null`
     */
    public asset = this.assetsLoader.asset.bind(this.assetsLoader)

    /**
     * public method to check if an asset exist
     * @param asset name of asset to check if exist
     * @returns if asset exist return `true` else return `false`
     */
    public check = this.assetsLoader.asset.bind(this.assetsLoader)

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
 
    /**
     * public method to check if a character exist
     * @param path character path (e.g `character/character_child`)
     * @returns return `true` if character exist else return `false`
    */
    public has = this.Storage.has.bind(this.Storage)

    /**
     * public getter to character tree structure
     */
    public get tree(): CharacterTreeOption  {
        return this.Storage.characterTree
    }
    
    private keyboardEvent:KeyboardEventManager = new KeyboardEventManager(this)

    /**
     * public method to register a key combination from the keyboard
     * @param keyCombination the key combination to register
     */
    public register = this.keyboardEvent.register.bind(this.keyboardEvent)

    /**
     * public method to remove a registered key combination
     * @param keyCombination the key combination to remove
     */
    public unregister = this.keyboardEvent.unregister.bind(this.keyboardEvent)
    
    /**
     * public property to activate the engine development mode
     */
    public set developmentMode(mode:"on"|"off") {
        this._devMode = mode
    }

    public get developmentMode(): "on"|"off" {
        return this._devMode
    }

    /**
     * public getter to get the type of the character
     */
     public get type(): string { 
        return "Game"
    }

    /**
     * a javascript class to create the karo engine game object
     * @param propertyOption property of game class
     */
    constructor(propertyOption:GamePropertyOption) {
        this.propertyManager.scheme({
            "background color": propertyOption["background color"] != undefined ? propertyOption["background color"] : new Color(255, 255, 255, 1),
            name: propertyOption.name != undefined ? propertyOption.name : "New Game",
            author: propertyOption.author != undefined ? propertyOption.author : "Quality Builder",
            description: propertyOption.description != undefined ? propertyOption.description : String(),
            version: propertyOption.version != undefined ? propertyOption.version : "1.0.0",
            icon: propertyOption.icon != undefined ? propertyOption.icon : String()
        })
        this.canvas = propertyOption.canvas
        this.graphic = this.canvas.getContext("2d") as CanvasRenderingContext2D
        this.Updater = new Slim.Updater(this.canvas, this, this, this.Storage, this.Render)
    }

    /**
     * public method to draw the game
     * @param time number of second since the browser was last rendered
     */
    public draw(time:number) {
        let dt = (time - this.oldTime)/1000
        this.oldTime = time
        this.canvas.style.backgroundColor = (this.get("background color") as Color).toString()
        this.assetsLoader.isAssetsLoaded()
        .then(() => {
            this.graphic.clearRect(0, 0, this.canvas.width, this.canvas.height)
            if (this._devMode == "on") {
                this.Updater.update(dt)
                this.Render.render(this.graphic, new Vector2(0,0), new Vector2(1, 1), 0)
            } else {
                this.Updater.update(dt)
                this.Render.render(this.graphic, new Vector2(0,0), new Vector2(1, 1), 0)
            }
        })
    }

    /**
     * public method to called when the user interaction with the keyboard
     * @param ev Javascript object that describe the user interaction with the keyboard
     */
    public onKeyPress(ev:KeyboardEvent): void {
        if (this._devMode == "off")
            this.keyboardEvent.onKeyPress(ev)
    }

     /**
     * public getter to get the camera offset
     */
      public get offset(): Vector2 {
        return this.camera.offset
    }

    /**
     * public setter to set the camera offset
     */
    public set offset(value:Vector2) {
        this.camera.offset = value
    }
}