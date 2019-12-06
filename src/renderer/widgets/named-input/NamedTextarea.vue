<template>
    <textarea class="named-textarea"
    :name="name"
    :value="value[name]"
    :placeholder="placeholder"
    :readonly="readonly()"
    @input="input($event.target)"
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
}
</script>

<style>
/* .named-input {
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
.named-input:focus {
    outline: none;
} */
</style>
