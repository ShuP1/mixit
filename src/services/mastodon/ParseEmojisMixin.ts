import { Component, Vue } from 'vue-property-decorator'

import { Emoji } from './Types'

@Component
export class ParseEmojisMixin extends Vue {

  parseEmojis(text: string, emojis: Emoji[], show = true) {
    if (show) {
      for (const emoji of emojis) {
        text = text.split(`:${emoji.shortcode}:`).join(
          `<img draggable="false" class="icon" alt="${emoji.shortcode}" title="${emoji.shortcode}" src="${emoji.static_url}">`
        )
      }
    }
    return text
  }

}
