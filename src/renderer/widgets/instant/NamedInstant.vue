<template>
    <div>
        <instant  v-model="textValue"
            :placeholder="placeholder || $toTitleCase(name)"
            :suggests="suggests"
            :toString="item => string(item) || item[name]"
            @select="onSelect"
            @blure="showSuggests(false)"
            @escape="showSuggests(false)"
        />

    </div>
</template>

<script>
import Instant from './Instant.vue'
export default {
components: {Instant},
props: {
    name: String,
    placeholder: String,
    value: Object,
    string: {
        type: Function,
        default: undefined
    }
},
data(){
    return {
          suggests: [],
    }
},
computed: {
    textValue: {
        get() {
            return this.value[this.name]
        },
        set(v) {
            this.setTextValue(v, this.showSuggests)
        }
    }
},
methods: {
    getString(item) {
        return item[this.name]
    },
    setTextValue(value, showSuggests) {
        this.$emit('input',{name: this.name, value, showSuggests})
        if(!showSuggests) this.showSuggests(false)
    },
    showSuggests(suggests) {
        this.suggests = suggests || []
    },
    onSelect(index) {
        let selected = this.suggests[index]
        this.setTextValue(selected[this.name])
        this.$emit('select', selected)
    }
}
}
</script>

<style>

</style>
