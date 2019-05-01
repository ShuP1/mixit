export interface Emoji {
  shortcode: string
  static_url: string
}

export interface Account {
  acct: string
  display_name: string
  emojis: Emoji[]
}

export interface Options {
  timeout: number
  reconnect: boolean
  buffer: number
  reblog: boolean
  reply: boolean
  showMedia: boolean
}

export interface Status {
  id: number
  uri: string
  account: Account
  content: string
  created_at: string
  emojis: Emoji[]
  favourited: boolean
  favourites_count: number
  media_attachments: Media[]
  sensitive: boolean
  reblogged: boolean
  reblogs_count: number
  replies_count: number
  in_reply_to_id?: number
  reblog?: Status
  spoiler_text?: string
}

export interface Media {
  description: string
  url: string
  preview_url: string
  type: string
}

export interface Notification {
  id: number
  account: Account
  type: string
  created_at: string
  status?: Status
}

export interface MarkMessage {
  id: number,
  type: string,
  callback: CallableFunction
}