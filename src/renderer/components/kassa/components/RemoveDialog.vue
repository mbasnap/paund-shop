<template>
    <b-modal v-model="modal" content-class="remove-dialog" :hide-footer="true" >
      <div class="modal-body mb-5">
        <p>
          {{ t('enter') }} 
          <strong style='color: red;'>{{ value.number || value.summ }}</strong>
          {{ t('to confirm') }}
        </p>
        <input type="text" class="form-control" v-model="value.input"/>
        <textarea class="form-control mt-2" :placeholder="t('description')" 
        v-model="value.deleted"></textarea>
      </div>
      <modal-footer ok="remove" :loading="loading" :disabled="disabled"
      @ok="onRemove(value).then(close)" @cansel="close"/>
    </b-modal>

</template>

<script>
import { mapActions } from 'vuex'
import ModalFooter from '@/widgets/ModalFooter'
export default {
  components: { ModalFooter },
  data: () => ({
    modal: false,
    resolve: null,
    loading: false,
    value: {}
  }),
  computed: {
    disabled({ value }) {
      const { number, summ, input = '' } = value || {}
      return (number || summ) + '' !== input.trim()
    }
  },
  methods: {
    ...mapActions({ remove: 'reestr/remove' }),
    async onRemove(v) {
      this.loading = true
      await this.remove(v)
      this.resolve(v)
    },
    show(v = {}) {
      this.value = v
      this.modal = true
      return new Promise(resolve => this.resolve = resolve)
    },
    close() {
      this.loading = false
      this.modal = false
    },
    t(v) {
      return this.$t(`confirm.${v}`)
    }
  }
}
</script>

<style >
 .remove-dialog {
    height: auto;
}
</style>