import { Vector2, Color } from "../libs/math"

type PropertyValueType = number|boolean|string|Vector2|Array<string>|Array<number>|Array<boolean>|Array<Vector2>|Color

type PropertyValueTypeString = "number"|"boolean"|"string"|"Vector2"|"Array<string>"|"Array<number>"|"Array<boolean>"|"Array<Vector2>"|"Color"

interface PropertyOption {
    value: PropertyValueType
    readonly: boolean
    type: PropertyValueTypeString
}

/**
 * 🛠 utility class to handle the character property 
 */
export default class PropertyManager {
    private propertyMap:Map<string, PropertyOption> = new Map<string, PropertyOption>()

    private readonlyPropertySet:Set<string> = new Set<string>()

    /**
     * set the property scheme
     * @param propScheme 
     */
    public scheme(propScheme:{[name:string]: PropertyValueType|PropertyOption}) {
        for (const name in propScheme) {
            let propertyValue:PropertyValueType|PropertyOption = propScheme[name]
            if (typeof propertyValue == "object" && !(propertyValue instanceof Vector2) && !(propertyValue instanceof Color)) {
                this.propertyMap.set(name, {
                    value: (propertyValue as PropertyOption).value,
                    type: (propertyValue as PropertyOption).type,
                    readonly: (propertyValue as PropertyOption).readonly
                })
                if ((propertyValue as PropertyOption).readonly == true)
                    this.readonlyPropertySet.add(name)
            } else {
                let propertyType:PropertyValueTypeString = typeof propertyValue == "number" ? "number" 
                : typeof propertyValue == "string" ? "string" 
                : typeof propertyValue == "boolean" ? "boolean"
                : Array.isArray(propertyValue) ? "Array<string>"
                : propertyValue instanceof Vector2 ? "Vector2" : "Color"
                this.propertyMap.set(name, {
                    value: propertyValue,
                    readonly: false,
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
        if (this.propertyMap.has(name) && !this.readonlyPropertySet.has(name)) {
            this.propertyMap.set(name, {
                value: value,
                readonly: (this.propertyMap.get(name) as PropertyOption).readonly,
                type: (this.propertyMap.get(name) as PropertyOption).type
            })
        }
    }

    /**
     * public method to override the value of a readonly property
     * @param name name name of the property to override
     * @param value value to override the property with
     */
    public override(name:string, value:PropertyValueType): void {
        if (this.readonlyPropertySet.has(name))
            this.propertyMap.set(name, {
                value: value,
                readonly: (this.propertyMap.get(name) as PropertyOption).readonly,
                type: (this.propertyMap.get(name) as PropertyOption).type
            })
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
     * @returns return an `Array` of type object
     */
    public entry(): Array<{name: string, value: PropertyValueType, type: PropertyValueTypeString}> {
        return Array
            .from(this.propertyMap)
            .filter(property => !property[1].readonly)
            .map(property => {
                return {
                    name: property[0],
                    value: property[1].value,
                    type: property[1].type
                }
            })
    }
    
}