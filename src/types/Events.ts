import { ServiceData, tileKey } from './App';

export interface Message {
  key: tileKey,
  msg: any
}

export const SaveOptionEvent = 'saveOption'
export interface Option {
  key: string
  value: any
}
export interface SaveOptionMessage extends Message {
  msg: Option
}

export const SaveOptionsEvent = 'saveOptions'
export interface SaveOptionsMessage extends Message {
  msg: object
}

export const MoveTileEvent = 'move'
export type MoveType = 'x' | 'y' | 'h' | 'w'
export type MoveDirection = 1 | -1
export interface Move {
  type: MoveType
  direction: MoveDirection
}
export interface MoveTileMessage extends Message {
  msg: Move
}

export const RemoveTileEvent = 'remove'
export interface RemoveTileMessage extends Message {
  msg: undefined
}

export const SaveServiceEvent = 'saveService'
export interface SaveServiceMessage extends Message {
  msg: ServiceData
}

export const RemoveServiceEvent = 'removeService'
export interface RemoveServiceMessage extends Message {
  msg: undefined
}

export const ErrorEvent = 'error'
export interface ErrorMessage extends Message { }