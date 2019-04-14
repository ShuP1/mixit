export const parseEmojisMixin = {
    methods: {
        parseEmojis(text, emojis) {
            for (const emoji of emojis) {
                text = text.split(`:${emoji.shortcode}:`).join(
                    `<img draggable="false" class="icon" alt="${emoji.shortcode}" title="${emoji.shortcode}" src="${emoji.static_url}">`
                )
            }
            return text
        }
    }
}