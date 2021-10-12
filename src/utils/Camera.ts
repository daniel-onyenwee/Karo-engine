import { Game } from ".."
import { Vector2 } from "../libs/math"

export default class Camera {
    private game:Game
   
    private _offset: Vector2 = new Vector2(0,0)
    
    /**
     * 🛠 utility class to act as a 2D camera
     * @param game insatance of the `Game`
    */
    constructor(game:Game) {
        this.game = game
    }

    /**
     * public getter to get the camera offset
     */
    public get offset(): Vector2 {
        return this._offset
    }

    /**
     * public setter to set the camera offset
     */
    public set offset(value:Vector2) {
        this._offset = value
    }

}