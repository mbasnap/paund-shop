<template>
  <b-modal v-model="modal" content-class="remove-dialog" :hide-footer="true" >
    <template #modal-header="{ close }">
      <div class="row" style="width: 100%">
        <div :class="['col', 'danger']">
          <h4> Удаление {{ value  }}</h4>
        </div>
            <button 
            type="button" 
            class="close pr-0" 
            style="outline: none;"
            @click="close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
    </template>
    <div class="modal-body mb-5">
      <p>
        {{ t('enter') }} 
        <strong style='color: red;'>{{ value }}</strong>
        {{ t('to confirm') }}
      </p>
      <input type="text" class="form-control" v-model="input"/>
      <textarea class="form-control mt-2" :placeholder="t('description')" v-model="description"/>
    </div>
    <modal-footer ok="save" :loading="modal && loading" :disabled="disabled"
    @ok="onResolve(description)" @cansel="close"/>
  </b-modal>
</template>

<script>
import ModalFooter from '@/widgets/ModalFooter'
export default {
  components: { ModalFooter },
  props: ['value'],
  data: () => ({
    modal: false,
    resolve: null,
    loading: false,
    input: '',
    description: ''
  }),
  computed: {
    disabled({ value, input }) {
      return value.trim() !== input.trim()
    }
  },
  methods: {
    show() {
      this.loading = false
      this.input = ''
      this.description = ''
      this.modal = true
      return new Promise(resolve => this.resolve = resolve)
    },
    onResolve(v) {
      this.loading = true
      this.resolve(v)
    },
    close() {
      this.modal = false
    },
    t(v) {
      return this.$t(`confirm.${v}`)
    }
  }
}
</script>

<style >
  .remove-dialog  {
    height: auto !important;
  }
  .remove-dialog .danger  {
    color: brown;
  }
</style>