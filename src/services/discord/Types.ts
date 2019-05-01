export interface Account {
  username: string
}

export interface Guild {
  id: string
  name: string
  icon: string
}

export interface Options {
  timeout: number
  reconnect: boolean
  buffer: number
  showMedia: boolean
}