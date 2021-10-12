import { Game } from "../.."

export default class KeyboardEventManager {
    private keyMap:Map<string, string> =  new Map<string, string>()

    private game:Game

    /**
     * 🛠 utility class to handle the keyboard input from the user
     * @param game insatance of the `Game`
    */
    constructor(game:Game) {
        this.game = game
    }

    /**
     * public method to register a key combination from the keyboard
     * @param keyCombination the key combination to register
     */
    public register(keyCombination:string): void {
        this.keyMap.set(keyCombination, String())
    }

    /**
     * public method to remove a registered key combination
     * @param keyCombination the key combination to remove
     */
    public unregister(keyCombination:string): void {
        this.keyMap.delete(keyCombination)
    } 

    /**
     * public method to called when the user interaction with the keyboard
     * @param ev Javascript object that describe the user interaction with the keyboard
     */
    public onKeyPress(ev:KeyboardEvent): void {
        let notAceptedkey:Set<string> = new Set<string>([
            "Shift",
            "Control",
            "Alt"
        ])
        let keyCombination:string = String()
        if (ev.ctrlKey)
            keyCombination = keyCombination.concat("CTRL+".toUpperCase())
        if (ev.shiftKey)
            keyCombination = keyCombination.concat("SHIFT+".toUpperCase())
        if (ev.altKey)
            keyCombination = keyCombination.concat("ALT+".toUpperCase())
        if (!notAceptedkey.has(ev.key)) 
            keyCombination = keyCombination.concat(ev.key.toUpperCase())
        if (this.keyMap.has(keyCombination))
            console.log(keyCombination)
    }
}