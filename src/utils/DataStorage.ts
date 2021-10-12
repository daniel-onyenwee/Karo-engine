import { CharacterChildrenType, CharacterParentType } from "../typeDecleration"

export default class DataStorage {
    private parent:CharacterParentType

    public dataMap:Map<string, Boolean|number|string> = new Map<string, Boolean|number|string>()

    /**
     * 🛠 utility class to handle the storage of data for all the 🎭 characters
     * @param parent instance of the character the data storage belong to
     */
    constructor(parent:CharacterParentType) {
        this.parent = parent
    }

    /**
     * public method to get a reference of a child character data store
     * @param path the child character path
     * @returns if the child character exist return its data store return `null`
     */
    public ref(path:string): Map<string, Boolean|number|string>|null {
        if (this.parent.has(path))
            return (this.parent.child(path) as CharacterChildrenType).store
        else
            return null
    }
}
