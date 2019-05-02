<template lang="pug">
.client(@scroll.passive="onScroll")
  loadable-block.guilds(:loadable="guilds")
    template(#success)
      guild(v-for="(guild, key) in guilds.get().data" :key="guild.id" :guild="guild" :showMedia="options.showMedia"
        @click.native="selectGuild(key)" :class="{ selected: guilds.get().isSelected(key) }")
  loadable-block.channels(:loadable="channels")
    template(#success)
      channel(v-for="(channel, key) in mapChannels" :key="channel.id" :channel="channel" :showMedia="options.showMedia"
        @click.native="selectChannel(key)" :class="{ selected: channels.get().isSelected(key) }")
  loadable-block.messages(:loadable="messages")
    template(#success)
      message(v-for="(message, key) in messages.get()" :key="message.id"
        :message="message" :showMedia="options.showMedia" :now="now")

</template>

<script lang="ts">
import axios, { AxiosResponse } from 'axios'
import { Component, Mixins } from 'vue-property-decorator'

import LoadableBlockVue from '@/components/loadable/LoadableBlock.vue'
import ServiceClient from '@/components/ServiceClient'
import TimerMixin from '@/components/time/TimerMixin'
import Lists from '@/helpers/lists/Lists'
import { Selectable } from '@/helpers/lists/Selectable'
import AxiosLoadable from '@/helpers/loadable/AxiosLoadable'
import AxiosLoadableMore from '@/helpers/loadable/AxiosLoadableMore'
import ChannelTagVue from './ChannelTag.vue'
import { AUTH, getRest } from './Discord.vue'
import GuildTagVue from './GuildTag.vue'
import MessageTagVue from './MessageTag.vue'
import { Channel, getChannelOrder, MappedChannel, Message, Options, PartialGuild, TextChannelTypes } from './Types'

@Component({
  components: {
    channel: ChannelTagVue,
    guild: GuildTagVue,
    message: MessageTagVue,
    loadableBlock: LoadableBlockVue
  }
})
export default class Client extends Mixins<ServiceClient<Options>>(ServiceClient, TimerMixin) {

  rest = getRest(this.auth, this.options.timeout)

  guilds = new AxiosLoadable<Selectable<PartialGuild>, object>()
  channels = new AxiosLoadable<Selectable<Channel>, object>()
  messages = new AxiosLoadableMore<Message[], object>()

  get mapChannels() {
    return this.channels.map(cs => cs.data
      .filter(c => c.type in TextChannelTypes)
      .map<MappedChannel>(c => ({ ...c,
        parent: c.parent_id ? this.channels.map(pcs => pcs.data.find(pc => pc.id === c.parent_id), undefined) : undefined
      })), [])
      .sort(getChannelOrder)
  }

  created() {
    this.guilds.load(
      this.get('/users/@me/guilds'),
      res => new Selectable(res.data)
    ).then(this.loadChannels)

    // TODO: websocket
  }

  loadChannels() {
    this.channels.reset()
    this.guilds.with(gs => gs.with(
      guild => this.channels.load(
        this.get(`/guilds/${guild.id}/channels`),
        res => new Selectable(res.data)
      ).then(this.loadMessages)
    ))
  }

  loadMessages() {
    this.messages.reset()
    this.channels.with(cs => cs.with(
      channel => this.messages.load(
        this.getMessages(channel.id)
      )
    ))
  }

  selectGuild(id: number) {
    this.guilds.with(g => g.select(id))
    this.loadChannels()
  }

  selectChannel(id: number) {
    this.channels.with(c => c.select(id))
    this.loadMessages()
  }

  get(path: string, options = {}) {
    return this.catchEmit(this.rest.get(path, { params: { limit: this.options.buffer, ...options } }))
  }

  getMessages(channel: string, options = {}) {
    return this.get(`/channels/${channel}/messages`, options)
  }

  onScroll(event: any) {
    this.channels.with(cs => cs.with(
      channel => this.messages.handleScroll(event.target,
        st => this.getMessages(channel.id, { before: Lists.last(st).id }),
        (res, st) => Lists.pushAll(st, res.data),
        st => Lists.removeFrom(st, this.options.buffer)
      )
    ))
  }

}
</script>

<style lang="sass">
@import '@/common.sass'

.discord
  .client
    height: 100%
    overflow-y: auto
    .guilds, .channels
      @include group-tile
      display: flex
      flex-wrap: wrap
      justify-content: space-between
      & > div
        text-align: center
        flex-grow: 1
    .messages
      @include group-tile
</style>