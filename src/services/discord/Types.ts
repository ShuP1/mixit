export type snowflake = string
interface Entity {
  id: snowflake
}

export interface User extends Entity {
  username: string
  discriminator: string
  avatar?: string
  email?: string
}

export interface PartialGuild extends Entity {
  name: string
  icon: string
  owner: boolean
}

export enum ChannelType {
  GUILD_TEXT = 0,
  DM = 1,
  GUILD_VOICE = 2,
  GROUP_DM = 3,
  GUILD_CATEGORY = 4,
  GUILD_NEWS = 5,
  GUILD_STORE = 6
}
export const TextChannelTypes = [ChannelType.DM, ChannelType.GROUP_DM, ChannelType.GUILD_TEXT]

export interface Channel extends Entity {
  type: ChannelType
  guild_id?: snowflake
  name?: string
  topic?: string
  nsfw?: boolean
  last_message_id?: snowflake
  recipients? :User[]
  icon?: string
  owner_id?: snowflake
  position: number
  parent_id?: snowflake
}
export function getChannelOrder(a: MappedChannel, b: MappedChannel) {
  function getPosition(c: MappedChannel) {
    return (c.parent ? c.parent.position : 0) * 100 + c.position
  }
  return getPosition(a) - getPosition(b)
}
export interface MappedChannel extends Channel {
  parent?: Channel
}

export interface GuildMember {
  user: User
  nick?: string
}

export enum MessageType {
  DEFAULT = 0,
  RECIPIENT_ADD = 1,
  RECIPIENT_REMOVE = 2,
  CALL = 3,
  CHANNEL_NAME_CHANGE = 4,
  CHANNEL_ICON_CHANGE = 5,
  CHANNEL_PINNED_MESSAGE = 6,
  GUILD_MEMBER_JOIN = 7
}

export interface Message extends Entity {
  channel_id: snowflake
  guild_id?: snowflake
  author: User
  member?: GuildMember
  content: string
  timestamp: string
  edited_timestamp?: string
  tts: boolean
  mention_everyone: boolean
  mentions: User[]
  mention_roles: Role[]
  attachments: Attachment[]
  reactions?: Reaction[]
  pinned: boolean
  webhook_id?: snowflake
  type: MessageType
}

export interface Role extends Entity {
  name: string
  color: number // hexa
  hoist: boolean
  mentionable: boolean
}

export interface Attachment extends Entity {
  filename: string
  size: string // bytes
  url: string
  proxy_url: string
  height?: number
  width?: number
}

export interface Reaction {
  count: number
  me: boolean
  emoji: ReactionEmoji
}

export interface ReactionEmoji {
  id?: snowflake
  name: string
}

export interface Options {
  timeout: number
  reconnect: boolean
  buffer: number
  showMedia: boolean
}