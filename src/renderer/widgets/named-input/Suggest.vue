<template>
    <div class="suggest dropdown" :readonly="readonly()">
        <slot></slot>
        <textarea class="named-input editor" ref="editor"
        :name="name"
        :value="value[name]"
        :placeholder="placeholder"
        :readonly="readonly()"
        @input="input($event.target)"
        @change="change($event.target)"
        @keydown.up.prevent="highlight(index > 0 ? index - 1 : 0)"
        @keydown.down.prevent="highlight(index < 0 ? 0 : index + 1)"
        @keydown.enter.prevent="select(options[index])"
        @keydown.esc.prevent="highlight(-1)"/>
        
        <ul :class="[ 'options dropdown-menu', { 'show': show }]">
            <li v-for="(item, key) in options" :key="key" :class="{ 'highlight': key === index}"
            @click="select(item)"> {{ suggest(item, name) }} </li>
        </ul>         
    </div>
</template>

<script>
// import mix from "./mix.js"
export default {
    props: {
        name: String,
        value: Object,
        placeholder: String,
        options: Array,
        suggest: { type: Function, default: (item, name) => item ? item[name] : '' },
    },
    inject: [ "input", "change", "readonly" ],
    // mixins: [ { props: mix.props, inject: mix.inject } ],
    // props: {
    //     options: Array,
    //     suggest: { type: Function, default: (item, name) => item[name] },
    // },
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
        highlight(index) {
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
    /* outline-style: none; */
    /* width: 100%; */
    padding: 0;
    max-height: 100%;
    resize: none;
    border: none;
    white-space: nowrap;
}
.suggest .options {
    min-width: 300px;
    border-radius: unset;
} 
.suggest .options li {
    cursor: pointer;
} 
.suggest .options .highlight {
    background-color: rgba(176, 176, 199, 0.438);
} 
/* .suggest .options li:hover {
        background-color: rgba(230, 230, 234, 0.41);
}  */
</style>