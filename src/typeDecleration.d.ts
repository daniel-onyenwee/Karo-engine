import { Game, Character } from "."

export type CharacterParentType =  Character.Container|Game|Character.Arc|Character.Box|Character.Text|Character.Timer
export type CharacterChildrenType = Character.Container|Character.Arc|Character.Box|Character.Text|Character.Timer
export interface CharacterTreeOption {
    name: string
    path?: string
    type: string
    children: Map<string, CharacterTreeOption>
} 
