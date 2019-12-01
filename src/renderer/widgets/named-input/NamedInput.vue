<template>
    <input  class="named-input" 
    :name="name"
    :value="format(value[name])"
    :placeholder="placeholder"
    :readonly="readonly()"
    @input="input($event.target)"
    @change="change($event.target)"
    />
</template>

<script>
import mix from "./mix"
export default {
    mixins: [ { props: mix.props, inject: mix.inject } ],

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
/* .named-input.err {
    border: 1px solid red !important;
} */
.named-input:focus {
    outline: none;
}
</style>
