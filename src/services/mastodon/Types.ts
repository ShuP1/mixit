export interface Emoji {
  shortcode: string
  static_url: string
}

export interface Account {
  acct: string
  display_name: string
  emojis: Emoji[]
}

export type TimelineType = 'home' | 'local' | 'public'

export interface Options {
  timeout: number
  reconnect: boolean
  buffer: number
  reblog: boolean
  reply: boolean
  showMedia: boolean
  timeline: TimelineType
}

export type VisibilityType = 'public' | 'unlisted' | 'private' | 'direct'

export interface StatusPost {
  status: string
  in_reply_to_id?: number
  media_ids?: number[] // TODO:
  sensitive?: boolean
  spoiler_text?: string
  visibility: VisibilityType
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
  card?: Card
  poll?: Poll
  visibility: VisibilityType
}

export type CardType = 'link' | 'photo' | 'video' | 'rich'
export interface Card {
  url: string
  title: string
  description: string
  image?: string
  type: CardType
  author_name?: string
  author_url?: string
  provider_name?: string
  provider_url?: string
}

export interface PollOption {
  title: string
  votes_count?: number
}
export interface Poll {
  id: string
  expires_at?: string
  expired: boolean
  multiple: boolean
  votes_count: number
  options: PollOption[]
  voted?: boolean
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