export default {

    props: {
        name: String,
        value: Object,
        placeholder: String,
        // readonly: Boolean,
        format: { type: Function, default:(v) => v }
    },
    provide () {
        const { input, change, readonly } = this
        return { input, change, readonly }
    },
    inject: [ "input", "change", "readonly" ],
    methods: {
        input() {},
        change() {},
        readonly() {},
    }
    }