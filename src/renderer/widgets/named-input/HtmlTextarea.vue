<template>
    <div class="html-textarea" contenteditable="true" v-html="value"
    @input="onInput($event.target)" @blur="blur($event.target)">
    </div>
</template>

<script>
export default {
props: { value: String },
methods: {
    onInput({ innerHTML }) {
        const target = { value: innerHTML }
        this.$emit('input', { target })
        
    },
    blur({ innerHTML }) {
        const target = { value: innerHTML }
        this.$emit('change', { target })
    }
}
}
</script>

<style >
.html-textarea {
    height: auto;
    resize: both;
    overflow: auto;
} 
</style>