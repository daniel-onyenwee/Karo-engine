import { CharacterParentType } from "../typeDecleration"

export default class EventEmitter {
    private character:CharacterParentType

    private eventMap:Map<string, ((...args:Array<any>) => void)> = new Map<string, ((...args:Array<any>) => void)>()

    /**
     * 🛠 utility class to handle calling and setting of different event of a character
     * @param character instance of the character
     */
    constructor(character:CharacterParentType) {
        this.character = character
    }

    /**
     * public method to set an event
     * @param event name of event to add
     * @param callback callback function to call when the event is emitted
     */
    public on(event:string, callback:(...args:Array<any>) => void) {
        this.eventMap.set(event, callback)
    }

    /**
     * public method to call an event
     * @param event name of event to emit
     * @param args function arguments of the event
     * @returns return `true` if the event is emitted else return `false`
     */
    public emit(event:string, ...args:Array<any>): boolean {
        if (this.eventMap.has(event)) {
            let callback:((...args:Array<any>) => void) = this.eventMap.get(event) as ((...args:Array<any>) => void)
            callback.apply(null, [this.character, ...args])
            return true
        } else {
            return false
        }
    }
}