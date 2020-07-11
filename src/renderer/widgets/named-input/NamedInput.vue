<template>
    <input ref="input"  class="named-input" 
    :name="name"
    :value="format(value[name])"
    :placeholder="placeholder"
    :readonly="readonly()"
    @input="onInput($event.target)"
    @change="change($event.target)"
    @keydown.enter.prevent="$emit('enter')"
    />
</template>

<script>
export default {
    props: {
        name: String,
        value: Object,
        placeholder: String,
        format: { type: Function, default:(v) => v }
    },
    inject: [ "input", "change", "readonly" ],
    methods: {
        onInput({ name, value }) {
            const target = { name, value: this.format(value) }
            if (this.input) this.input(target)
            this.$emit('input', target)
        },
        focus() {
            this.$refs['input'].select()
        }
    }
}
</script>

<style>
.named-input {
    width: 100%;
    border: none;
    background-color: transparent;
}
.named-input {
    width: 100%;
    border: none;
    background-color: transparent;
    color: #495057;
}
.named-input.form-control[readonly]{
    background-color: initial;
}
.named-input:focus {
    outline: none;
}
</style>
