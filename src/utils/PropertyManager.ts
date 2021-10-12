import { Vector2, Color } from "../libs/math"

type PropertyValueType = number|boolean|string|Vector2|Array<string>|Array<number>|Array<boolean>|Array<Vector2>|Color

type PropertyValueTypeString = "number"|"boolean"|"string"|"Vector2"|"Array<string>"|"Array<number>"|"Array<boolean>"|"Array<Vector2>"|"Color"

interface PropertyOption {
    value: PropertyValueType
    type?: PropertyValueTypeString
}

/**
 * 🛠 utility class to handle the character property 
 */
export default class PropertyManager {
    private propertyMap:Map<string, PropertyOption> = new Map<string, PropertyOption>()

    /**
     * set the property scheme
     * @param propScheme 
     */
    public scheme(propScheme:{[name:string]: PropertyValueType|PropertyOption}) {
        for (const name in propScheme) {
            let propertyValue:PropertyValueType|PropertyOption = propScheme[name]
            if (typeof propertyValue == "object" && !(propertyValue instanceof Vector2) && !(propertyValue instanceof Color)) {
                let propertyType:PropertyValueTypeString = "string"
                if ((propertyValue as PropertyOption).type != undefined) {
                    propertyType = (propertyValue as PropertyOption).type as PropertyValueTypeString
                } else {
                    propertyType = typeof propertyValue == "number" ? "number" 
                        : typeof propertyValue == "string" ? "string" 
                        : typeof propertyValue == "boolean" ? "boolean"
                        : Array.isArray(propertyValue) ? "Array<string>"
                        : propertyValue instanceof Vector2 ? "Vector2" : "Color"
                }
                this.propertyMap.set(name, {
                    value: (propertyValue as PropertyOption).value,
                    type: propertyType
                })
            } else {
                let propertyType:PropertyValueTypeString = typeof propertyValue == "number" ? "number" 
                : typeof propertyValue == "string" ? "string" 
                : typeof propertyValue == "boolean" ? "boolean"
                : Array.isArray(propertyValue) ? "Array<string>"
                : propertyValue instanceof Vector2 ? "Vector2" : "Color"
                this.propertyMap.set(name, {
                    value: propertyValue,
                    type: propertyType
                })
            }
        }
    }

    /**
     * public method to get a property
     * @param name name name of the property to get
     * @returns if property exist return it value else return `null`
     */
    public get(name:string): PropertyValueType|null {
        if (this.propertyMap.has(name))
            return (this.propertyMap.get(name) as PropertyOption).value
        else
            return null
    }

    /**
     * public method to set a property
     * @param name name name of the property to set
     * @param value value to set the property with
     */
    public set(name:string, value:PropertyValueType): void {
        if (this.propertyMap.has(name)) {
            this.propertyMap.set(name, {
                value: value,
                type: (this.propertyMap.get(name) as PropertyOption).type
            })
        }
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

    /**
     * public method to get all the character propertries
     * @returns return a `Map` with the property name as the map key and the property value as the map value
     */
    public entry(): Map<string, PropertyOption> {
        return this.propertyMap
    }
    
}