<template>
    <div class="suggest dropdown" :readonly="readonly()" tabindex="0"
        @blur="highlight(-1)" @keydown.esc.prevent="highlight(-1)">
        
        <div class="named-input editor" ref="editor" 
        :name="name" :placeholder="placeholder" :readonly="readonly()">
        {{ model[name] || placeholder }}
        <row-down @click="switchClose(index)"/>
        </div>
        <ul :class="['options', 'dropdown-menu', { 'show': show }]">
            <slot></slot>
        </ul>
        
    </div>
</template>

<script>
import RowDown from "@/svg/row-down"
export default {
    components: { RowDown },
    props: {
        name: String,
        selected: Number,
        placeholder: String,
        options: Array,
        suggest: { type: Function,
            default: (item, name) => item ? item[name] : ''
        },
    },
    watch: {
        selected() {
            this.highlight(-1)
        }
    },
    inject: [ "readonly" ],
    data() {
        return {
            index: -1
        }
    },
    computed: {
        show() {
            const { options, index } = this
            return options.length && index >= 0
        },
        model({ options, selected }) {
            return { ...options[selected]}
        }
    },
    methods: {
        switchClose(index) {
            this.highlight( index < 0 ? 0 : -1)
        },
        highlight(index) {
            const length = this.options.length - 1
            if (index <= length)  this.index = index
        }
    }
}
</script>

<style >

.suggest .editor {
    padding: 0;
    max-height: 100%;
    white-space: nowrap;
}
.suggest .options {
    min-width: -webkit-fill-available;
    /* border-radius: unset; */
} 
.suggest .options li {
    /* cursor: pointer; */
    overflow: hidden;
} 
.suggest .options li .hover:hover {
    background-color: rgba(176, 176, 199, 0.438);
} 
</style>