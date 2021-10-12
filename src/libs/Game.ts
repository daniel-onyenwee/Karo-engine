import * as Slim from "../utils/slim"
import { Vector2 } from "./math"
import AssetsLoader from "../utils/AssetLoader"
import { KeyboardEventManager } from "../utils/InputEventManager"
import Camera from "../utils/Camera"
import DataStorage from "../utils/DataStorage"
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

    protected dataStorage:DataStorage =  new DataStorage(this)

    public store = this.dataStorage.dataMap

    /**
     * public method to get a reference of a child character data store
     * @param path the child character path
     * @returns if the child character exist return its data store return `null`
     */
    public ref = this.dataStorage.ref.bind(this.dataStorage)

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
     * create a game
     * @param canvas instance of the `HTMLCanvasElement` to draw the game on
     */
    constructor(canvas:HTMLCanvasElement) {
        this.canvas = canvas
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