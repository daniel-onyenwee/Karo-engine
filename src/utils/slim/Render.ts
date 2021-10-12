import { CharacterChildrenType } from "../../typeDecleration"
import { Vector2 } from "../../libs/math"

/**
 * 🛠 utility class to handle the rendering of a character and its children
 */
export default class Render {
    private renderMap:Map<number, Array<CharacterChildrenType>> = new Map<number, Array<CharacterChildrenType>>()
    
    private renderIndexArray:Array<number> = Array<number>()

    /**
     * public method to add a character to the `Render` instance
     * @param zIndex the character stack level number
     * @param character character instance to add
     */
    public add(zIndex:number, character:CharacterChildrenType): void {
        if (this.renderMap.has(zIndex)) {
            let renderCharacterList:Array<CharacterChildrenType> = this.renderMap.get(zIndex) as Array<CharacterChildrenType>
            renderCharacterList.push(character)
            if (!this.renderIndexArray.includes(zIndex)) {
                this.renderIndexArray.push(zIndex)
            }
        } else {
            this.renderIndexArray.push(zIndex)
            this.renderMap.set(zIndex, [character])
        }
    }

     /**
     * public method to render character
     * @param graphic instance of `CanvasRenderingContext2D` class use to draw
     * @param displayPosition actual position of the character on the canvas
     * @param displayScale actual scale of the character
     * @param displayRotation actual rotation of the character
     */
      public render(graphic:CanvasRenderingContext2D, displayPosition:Vector2, displayScale:Vector2, displayRotation:number): void {
        this.renderIndexArray.sort()
        this.renderIndexArray.forEach(zIndex =>{
            if (this.renderMap.has(zIndex)) {
                let renderCharacterList:Array<CharacterChildrenType> = this.renderMap.get(zIndex) as Array<CharacterChildrenType>
                renderCharacterList.forEach((character:CharacterChildrenType) => {
                    if (!character.get("is destroyed"))
                        character.render(graphic, displayPosition, displayScale, displayRotation)
                })
            }
        })

        this.renderIndexArray.length = 0
        this.renderMap.clear()
      }
}