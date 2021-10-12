import { CharacterChildrenType, CharacterParentType } from "../../typeDecleration"
export default class Storage {
    private storageMap:Map<string, CharacterChildrenType> = new Map<string, CharacterChildrenType>()

    private predefineCharacterList:Array<CharacterChildrenType> = Array<CharacterChildrenType>()

    private character:CharacterParentType

    /**
     * 🛠 utility class to handle the storage of a character children
     * @param character instance of the character
     */
    constructor(character:CharacterParentType) {
        this.character = character
    }

    /**
     * public method to list all the charcter children
     * @returns `Array` containing all the instance of the character children
     */
    public list(): Array<CharacterChildrenType> {
        return Array.from(this.storageMap.values())
    }

    /**
     * public method to list all the charcter children which have not been initalize
     * @returns `Array` containing all the instance of the character children which have not been initalize
     */
    public listPredefineCharacter(): Array<CharacterChildrenType> {
        return this.predefineCharacterList
    }

    /**
     * public method to add th character children directly to the storage `Map` object
     * @param character character children to add
     */
    public nativeAdd(character:CharacterChildrenType): void {
        this.storageMap.set(character.get("name") as string, character)
    }

    /**
     * public method add the character children to the `Storage` instance
     * @param character character children to add
     */
    public add(character:CharacterChildrenType): void {
        this.predefineCharacterList.push(character)
    }

    /**
     * public method to check if a character exist
     * @param path character path (e.g `character/character_child`)
     * @returns return `true` if character exist else return `false`
     */
    public has(path:string): boolean {
        let has:boolean = false
        let pathFormat:Array<string> = path.split("/")
        let character:CharacterParentType|null = this.character

        if (pathFormat.length == 1) {
            has = this.storageMap.has(pathFormat[0])
        } else if (pathFormat.length > 1) {
            pathFormat.forEach(sigularPath => {
                if (character != null) {
                    if (character.has(sigularPath)) {
                        character = character.child(sigularPath)
                        has = true
                    } else {
                        has = false
                    }
                } else {
                    has = false
                }
            })
        } else {
            has = false
        }

        return has
    }

    /**
     * public method to clear the character storage
     */
    public clear(): void {
        this.storageMap.clear()
        this.predefineCharacterList.length = 0
    }

    /**
     * public method to get a character
     * @param path character path (e.g `character/character_child`)
     * @returns return the character instance if the character exist else return `null`
     */
    public child(path:string): CharacterChildrenType|null {
        let child:CharacterChildrenType|null = null
        let pathFormat:Array<string> = path.split("/")

        if (pathFormat.length == 1) {
            if (this.storageMap.has(pathFormat[0])) {
                child = this.storageMap.get(pathFormat[0]) as CharacterChildrenType
            } else {
                child = null
            }
        } else if (pathFormat.length > 1) {
            pathFormat.forEach(singularPath => {
                if (singularPath != String()) {
                    if (child == null) {
                        if (this.storageMap.has(singularPath)) {
                            child = this.storageMap.get(singularPath) as CharacterChildrenType
                        } else {
                            child = null
                        }
                    } else {
                        if (child.has(singularPath)) {
                            child = child.child(singularPath)
                        } else {
                            child = null
                        }
                    }
                } else {
                    child = null
                }
            })
        } else {
            child = null
        }

        return child
    }
}