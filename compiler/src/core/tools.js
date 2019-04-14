export const emitErrorMixin = {
    methods: {
        emitError(err) {
            this.$emit("error", err.toString())
        }
    }
}

export const saveOptionsMixin = {
    methods: {
        saveOptions(options) {
            this.$emit("save", options)
        }
    }
}