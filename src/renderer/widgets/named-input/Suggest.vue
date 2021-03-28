<template>
  <div class="suggest dropdown" @mouseleave="close">
    <slot></slot>
    <textarea class="named-input editor" ref="editor"
      :readonly="readonly() || disabled"
      :name="name"
      v-model="model"
      :placeholder="placeholder"
      @change="change($event.target)"
      @keydown.up.prevent="highlight(index > 0 ? index - 1 : 0)"
      @keydown.down.prevent="highlight(index < 0 ? 0 : index + 1)"
      @keydown.enter.prevent="select(options[index], index)"
      @keydown.esc.prevent="highlight(-1)"/>
      
    <ul :class="[ 'options dropdown-menu m-0', { 'show': options.length && index >= 0 }]">
      <li v-for="(item, key) in options" :key="key" v-show="!show || show(key)" 
      :class="['pl-1', { highlight: key === index }, validate && validate(item)]"            
       @click="select(item, key)">
        <div class="pl-3">{{ getSuggest(item) }}</div>
      </li>
    </ul>         
  </div>
</template>

<script>
export default {
  props: ['name', 'value', 'placeholder', 'options', 'disabled', 'suggest', 'show', 'format', 'validate'],
  inject: [ 'input', 'change', 'readonly' ],
  data() {
    return {
      index: -1
    }
  },
  computed: {
    model: {
      get({ format, value, name  }) {
        const model = value[name] || ''
        return format ? format(value[name]) : model
      },
      set(value) {
        const target = { name: this.name, value }
        if (this.input) this.input(target)
        this.$emit('input', target)
      }
    }
  },
  methods: {
    select(v, index) {
      this.$emit('select', v)
      this.$emit('selectIndex', index)
      this.$emit('enter', index)
      this.highlight(-1)
    },
    highlight(index, bool) {
      if(bool && this.index >= 0) return this.index = -1
      const length = this.options.length - 1
      if (index <= length)  this.index = index
    },
    close({ toElement }) {
      const { className = '' } = {...toElement}
      if (className.includes('dropdown-menu')) return
      else this.highlight(-1)
    },
    focus() {
      this.$refs['editor'].select()
    },
    getSuggest(item) {
      const suggest = item[this.name] || ''
      return this.suggest ? this.suggest(item) : suggest
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
  overflow-x: hidden;
}
.suggest .dropdown-menu {
  max-height: calc(50vh);
  overflow: auto;
}

.suggest .options li {
  white-space: nowrap;
  cursor: pointer;
} 
.suggest .options li:hover {
  background-color: rgba(176, 176, 199, 0.438);
} 
.suggest .options li.highlight {
  background-image: url(../../svg/angle-right-solid.svg);
  background-position: 0 5px;
  background-size: 15px 15px;
  background-repeat: no-repeat;
}
</style>