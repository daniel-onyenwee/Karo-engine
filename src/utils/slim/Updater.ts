import { Render, Storage } from "."
import { Game } from "../.."
import { 
    CharacterChildrenType, 
    CharacterParentType, 
    CharacterTreeOption 
} from "../../typeDecleration"

export default class Updater {
    private storage:Storage

    private render:Render

    private game:Game

    private character:CharacterParentType

    private canvas:HTMLCanvasElement

    /**
     * 🛠 utility class to handle the updating of a character and its children
     * @param canvas instance of the `HTMLCanvasElement`
     * @param game instance of the `Game`
     * @param character the instance of the character
     * @param storage instance of the `Slim.Storage` object
     * @param render instance of the `Slim.Render` object
     */
    constructor(canvas:HTMLCanvasElement, game:Game, character:CharacterParentType, storage:Storage, render:Render) {
        this.canvas = canvas
        this.game = game
        this.character = character
        this.render = render
        this.storage = storage
    }

    /**
     * public method to update the character
     * @param dt time difference between the previous frame and the current time
     */
    public update(dt:number): void { 
        let width:number = parseInt(getComputedStyle(this.canvas).width)
        if (width <= 480)
            this.character.emit("extra small size", width)
        else if (width > 480 && width <= 768)
            this.character.emit("small size", width)
        else if (width > 768 && width <= 1024)
            this.character.emit("medium size", width)
        else if (width > 1024 && width <= 1200)
            this.character.emit("large size", width) 
        else if (width > 1200)
            this.character.emit("extra large size", width)   
        let characterList:Array<CharacterChildrenType> = this.storage.list()
        let predefineCharacterList:Array<CharacterChildrenType> = this.storage.listPredefineCharacter()

        predefineCharacterList.forEach(character => {
            if (!character.get("is initalize")) {
                character.initalize(this.canvas, this.game, this.character)
                characterList.push(character)
            }
        })

        predefineCharacterList.length = 0

        this.storage.clear()

        this.storage.characterTree = {
            name: this.character.get("name") as string,
            type: this.character.type,
            path: this.character.get("path") as string,
            children: new Map<string, CharacterTreeOption>()
        }
        
        characterList.forEach(character => {
            if(!character.get("is destroyed")) {
                let path:string = String()
                if (!(this.character instanceof Game))
                    path = path.concat(this.character.get("path") as string).concat("/").concat(character.get("name") as string)
                else 
                    path = path.concat(character.get("name") as string)
                character.set("path", path)
                character.update(dt)
                this.storage.nativeAdd(character)
                this.render.add(character.get("z index") as number, character)
                this.storage.characterTree.children.set(character.get("name") as string, character.tree)
            } else {
                character.emit("final")
            }
        })

    }
}