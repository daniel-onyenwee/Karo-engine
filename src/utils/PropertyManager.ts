import { Vector2 } from "../libs/math"
import { Color } from "../typeDecleration"

type PropertyValueType = number|boolean|string|Vector2|Array<string>|Array<number>|Array<boolean>|Array<Vector2>|Color

/**
 * 🛠 utility class to handle the character property 
 */
export default class PropertyManager {
    private propertyMap:Map<string, PropertyValueType> = new Map<string, PropertyValueType>()

    /**
     * set the property scheme
     * @param propScheme 
     */
    public scheme(propScheme:{[name:string]: PropertyValueType}) {
        for (const name in propScheme) {
            this.propertyMap.set(name, propScheme[name])
        }
    }

    /**
     * public method to get a property
     * @param name name name of the property to get
     * @returns if property exist return it value else return `null`
     */
    public get(name:string): PropertyValueType|null {
        if (this.propertyMap.has(name))
            return (this.propertyMap.get(name) as PropertyValueType)
        else
            return null
    }

    /**
     * public method to set a property
     * @param name name name of the property to set
     * @param value value to set the property with
     */
    public set(name:string, value:PropertyValueType): void {
        if (this.propertyMap.has(name))
            this.propertyMap.set(name, value)
    }

    /**
     * public method to check if a property exist
     * @param name name of the property to check if it exist
     * @returns return `true` if the property exist else return `false`
     */
    public has(name:string): boolean {
        return this.propertyMap.has(name)
    }

    /**
     * public method to delete a property
     * @param name name of the property to delete
     */
    public delete(name:string): void {
        this.propertyMap.delete(name)
    }
}