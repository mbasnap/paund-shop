<template>
  <div class="klient">
    <tab-one class="col" :value="model" :disabled="disabled "
    @change="$nextTick(() => save(model))"
    @reset="$emit('reset')"/>
    <div v-show="!disabled" class="col">
      <svg-address-card width="30px;" :disabled="!value._id" @click="showModal('edit')"/>
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
    created() {
      // this.klientUpdate()
    },
    computed: {

      model({ value, isValid }) {
        return { ...value, isValid }
      },
      isValid({ value }) {
        const { family, name, sername } = value
        return [family, name, sername].every(v => !!v)
      }
    },
    methods: {
        ...mapActions({
          saveKlient: 'klient/save',
          removeKlient: 'klient/remove',
          // klientUpdate: 'klient/update'
        }),
      remove(v) {
        return this.removeKlient({ ...v })
          .then(this.reset)
      },
      save(v) {
        return this.saveKlient({ ...v })
          .then(v => this.update(v))
      },
      showModal(title) {        
        const { model: value, update, save, remove } = this
        this.$modal.show(Editor, { title, value, save, remove }, { height: 'auto' })
      },
      update(v) {
        this.$emit('input', { ...this.model, ...v })
        return v
      },

      reset() {
        this.$emit('reset')
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
