import { Game } from ".."
import { CharacterParentType } from "../typeDecleration"

interface DataInput {
    value: Boolean|number|string,
    key: string,
    type: "number"|"string"|"boolean"
}

export default class DataManager {
    private character:CharacterParentType

    public dataMap:Map<number, DataInput> = new Map<number, DataInput>()

    public keyMap:Map<string, number> = new Map<string, number>()

    /**
     * 🛠 utility class to handle the storage of data for all the 🎭 characters
     * @param character instance of the character the data storage belong to
     */
    constructor(character:CharacterParentType) {
        this.character = character
    }

    /**
     * public method to rename the key of a data stored
     * @param key key used to store the data
     * @param name name to change the key to
     */
    public rename(key:string, name:string): void {
        let id:number|undefined = this.keyMap.get(key)
        if (id != undefined) {
            let dataInput:DataInput = this.dataMap.get(id) as DataInput
            if (!this.keyMap.has(name)) {
                this.keyMap.delete(key)
                this.keyMap.set(name, id)
                this.dataMap.set(id, {
                    type: dataInput.type,
                    key: name,
                    value: dataInput.value
                })
            } else {
                // Error
            }
        }
    }

    /**
     * public method to add or edit a data stored
     * @param key key used to store the data
     * @param value value of the data to store
     */
    public set(key:string, value:Boolean|number|string) {
        if (typeof value == "boolean" || typeof value == "number" || typeof value == "string") {
            let id:number|undefined = this.keyMap.get(key)
            let type = typeof value as "boolean"|"number"|"string"
            if (id != undefined) {
                let dataInput:DataInput = this.dataMap.get(id) as DataInput
                this.dataMap.set(id, {
                    type,
                    key: dataInput.key,
                    value
                })
            } else {
                let id:number = this.dataMap.size + 1
                this.dataMap.set(id, { key, value, type })
                this.keyMap.set(key, id)
            }
        } else {
            // Error
        }
    }

    /**
     * public method to check if a data stored exist
     * @param key key used to store the data
     * @returns if the data exist return `true` else return `false`
     */
    public has(key:string): boolean {
        return this.keyMap.has(key)
    }

    /**
     * public method to remove a data stored
     * @param key key used to store the data
     * @returns if return is deleted return `true` else return `false`
     */
    public delete(key:string): boolean {
        let id:number|undefined = this.keyMap.get(key)
        if (id != undefined) {
            this.keyMap.delete(key)
            this.dataMap.delete(id)
            return true
        }
        return false
    }

    /**
     * public method to get a data stored
     * @param key key used to store the data
     * @returns if the data exist return the data else return `null`
     */
    public get(key:string):DataInput|null {
        let id:number|undefined = this.keyMap.get(key)
        if (id != undefined) {
            return this.dataMap.get(id) as DataInput
        } else {
            return null
        }
    }

    /**
     * public getter to get the number of data stored
     */
    public get size(): number {
        return this.dataMap.size
    }

    /**
     * public method to loop through all the data stored
     * @param callback  callback function one time for each data stored
     */
    public forEach(callback:(value?:DataInput, key?:string, data?:DataManager) => void): void {
        this.dataMap.forEach((value:DataInput) => callback(value, value.key, this))
    }

    /**
     * public method to list all the data stored
     * @returns Array of all the data stored
     */
    public list(): Array<DataInput> {
        let dataList:Array<DataInput>  = Array.from(this.dataMap.values())
        return dataList
    }
}