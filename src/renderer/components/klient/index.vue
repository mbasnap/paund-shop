<template>
  <div class="klient">
    <tab-one class="col" :value="model" :disabled="disabled">
        <slot></slot>
    </tab-one>
    <div class="col">
      <svg-address-card width="30px;" @click="showModal('edit')"/>
    </div>
  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
import { TabOne, Editor } from './editor/index.js'
import { SvgAddressCard } from '@/svg'
export default {
    components: {  TabOne, SvgAddressCard },
    props: { value: Object, disabled: Boolean },
    provide() {
      return { update: this.update, save: this.save }
    },
    computed: {
      ...mapGetters({
        // map: 'klient/map'
      }),
      model({ value }) {
        return { ...value }
      }
    },
    methods: {
        ...mapActions({
          saveKlient: 'klient/save'
        }),
      async save(v) {
        return this.update(await this.saveKlient({ ...v }))
      },
      showModal (title) {        
        const { model: value, update, save } = this
        this.$modal.show(Editor, { title, value, save }, { height: 'auto' })
      },
      update(v) {
        this.$emit('input', { ...this.model, ...v })
        return v
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
