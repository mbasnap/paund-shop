<template>
    <textarea class="named-textarea"
    :name="name"
    :value="value[name]"
    :placeholder="placeholder"
    :readonly="readonly()"
    @input="oninput($event.target)"
    @change="change($event.target)"
    />
</template>

<script>
export default {
    props: {
        name: String,
        value: Object,
        placeholder: String,
    },
    inject: [ "input", "change", "readonly" ],
    methods: {
        oninput(target) {
            if (this.input) this.input(target)
            this.$emit('input', target)
        }
    }    
}
</script>

<style>
.named-textarea.form-control[readonly]{
    background-color: initial;
}
</style>
