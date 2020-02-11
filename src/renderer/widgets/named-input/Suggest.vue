<template>
    <div class="suggest dropdown" >
        <slot></slot>
        <textarea class="named-input editor" ref="editor"
        :name="name"
        :value="value[name]"
        :placeholder="placeholder"
        @input="input($event.target)"
        @change="change($event.target)"
        @keydown.up.prevent="highlight(index > 0 ? index - 1 : 0)"
        @keydown.down.prevent="highlight(index < 0 ? 0 : index + 1)"
        @keydown.enter.prevent="select(options[index])"
        @keydown.esc.prevent="highlight(-1)"/>
        
        <ul :class="[ 'options dropdown-menu', { 'show': show }]">
            <li v-for="(item, key) in options" :key="key" :class="{ 'highlight': key === index}"
            @click="select(item)"> {{ suggest(item) }} </li>
        </ul>         
    </div>
</template>

<script>
export default {
    props: {
        name: String,
        value: Object,
        placeholder: String,
        options: Array,
        suggest: { type: Function,
            default(item) {
                return item[this.name] || ''
            }
        },
    },
    inject: [ "input", "change" ],
    data() {
        return {
            index: -1
        }
    },
    computed: {
        show() {
            const { options, index } = this
            return options.length && index >= 0
        }
    },
    methods: {
        select(v) {
            this.$emit('select', v)
            this.highlight(-1)
        },
        highlight(index, bool) {
            if(bool && this.index >= 0) return this.index = -1
            const length = this.options.length - 1
            if (index <= length)  this.index = index
        }
    }
}
</script>

<style >
.suggest .reset {
    position: absolute;
    right: 10px;
    cursor: pointer;
}
.suggest .reset:hover {
    color: black
}
.suggest .editor {
    padding: 0;
    max-height: 100%;
    resize: none;
    border: none;
    white-space: nowrap;
}
.suggest .options li {
    cursor: pointer;
} 
.suggest .options .highlight {
    background-color: rgba(176, 176, 199, 0.438);
}
</style>