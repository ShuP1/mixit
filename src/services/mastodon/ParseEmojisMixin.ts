import { Component, Vue } from 'vue-property-decorator'

import { Emoji } from './Types'

@Component
export class ParseEmojisMixin extends Vue {

  parseEmojis(text: string, emojis: Emoji[], show = true) {
    for (const emoji of emojis) {
      text = text.split(`:${emoji.shortcode}:`).join(
        show ? `<img draggable="false" class="icon" alt="${emoji.shortcode}" title="${emoji.shortcode}" src="${emoji.static_url}">` : emoji.shortcode
      )
    }
    return text
  }

}
