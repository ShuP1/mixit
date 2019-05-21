export type serviceKey = number
export type tileKey = number

export class Auth extends Map<string, string> { }
export interface ServiceData {
  name: string
  auth: Auth
}
export interface Service extends ServiceData {
  type: string
}

export interface Layout {
  name: string
  tiles: Tile[]
}

export type MoveType = 'x' | 'y' | 'h' | 'w'
export type MoveDirection = 1 | -1
export interface Rect {
  x?: number, y?: number
  h?: number, w?: number
}

export interface Options { [index: string]: { option: any } }
export interface Tile {
  service: serviceKey
  position: Rect
  options: Options
}