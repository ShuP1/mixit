export const emitErrorMixin = {
    methods: {
        emitError(err) {
            this.$emit("error", err.toString())
        }
    }
}

export const handleOptionsMixin = {
    methods: {
        saveOptions(options) {
            this.$emit("save", options)
        },
        setOption(name, value) {
            const options = {...this.$props}
            options[name] = value
            this.saveOptions(options)
        },
        setOptionCouple(couple) {
            this.setOption(couple.name, couple.value)
        }
    }
}