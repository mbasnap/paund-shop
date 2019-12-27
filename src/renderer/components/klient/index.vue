<template>
  <div class="klient">
    <tab-one class="col" :value="value" :disabled="disabled">
        <slot></slot>
    </tab-one>
    <div class="col">
      <span class="btn edit" @click="showModal('edit')">edit</span>
    </div>
  </div>
</template>

<script>

import { TabOne, Editor } from './editor/index.js'
export default {
    components: {  TabOne },
    props: { value: Object, disabled: Boolean },
    provide() {
      return { update: this.update }
    },
    methods: {

      showModal (title) {        
        const { value, update } = this
        this.$modal.show(Editor, { title, value, update }, { height: 'auto' })
      },
      update(v) {    
        const { family, name, sername, passport, idn, address } = v
        const selectedPassport = 0
        const valid = ![ family, name, sername, passport, idn ].some(v => !v)
        this.$emit('input', { ...v, selectedPassport, valid })
      }
    }
}
</script>

<style>
.klient .btn.edit {
    display: flex;
    justify-content: flex-end;
    cursor: pointer;
}
</style>
