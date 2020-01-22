export default {
    props: {
        width: String,
        disabled: Boolean
    },
    methods: {
        click() {
            return this.disabled || this.$emit('click')
        }
    }
}