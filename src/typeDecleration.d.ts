import { Game, Character } from "."

export type CharacterParentType =  Character.Container|Game|Character.Arc|Character.Box|Character.Text|Character.Timer
export type CharacterChildrenType = Character.Container|Character.Arc|Character.Box|Character.Text|Character.Timer

export interface Color {
    red: number
    green: number
    blue: number
    alpha?: number
}