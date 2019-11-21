<template>
    <component :is="teg || 'input'" class="named-input" :value="value[name]"
    :options="options"
    @input="onInput">{{value[name]}}</component>
</template>

<script>
import HtmlTextarea from "./HtmlTextarea"
export default {
components: { HtmlTextarea  },
props: {
    teg: String,
    name: String,
    options: Array
},
inject: [ 'value', 'input' ],
methods: {
    onInput(value) {
        const target = value.target || { value }
        return this.input({ name: this.name, value: target.value })
    }
}
}
</script>

<style>
.named-input {
    width: 100%;
    border: none;
}
.named-input:focus {
    outline: none;
}
</style>
