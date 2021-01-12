<template>
  <div class="obespechenie" >
    <table class="obespechenie__table table-sm">
      <thead >
        <tr style="font-size: 12px;">
          <th class="index"></th>
          <th class="title" width="50%">{{ t('title') }}</th>
          <th v-for="({ name, width = '10%' }, i) in headers" :key="i"
          :width="width" :class="name">{{ t(name) }}</th>
        </tr>
      </thead>
      <tbody style="font-size: 14px;">
        <row  v-for="(item, index) in value" :key="index" class="items"
        :value="item" @input="value => input(index, value)" :disabled="disabled"
        @remove="remove(index)"
        @context="onContext"/>
        <tr class="add">
          <td>
            <svg-plus-circle v-if="!disabled"
            :disabled="!canAdd" width="15px;" @click="add"/>
          </td>
          <td></td>
          <td></td>
          <td>{{ ves }}</td>
          <td>{{ derty }}</td>
          <td class="total ocenca">{{ ocenca }}</td>
        </tr>       
      </tbody>
    </table> 
  </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'
import { toDouble, toNumber, summ } from '@/functions'
import { SvgPlusCircle } from '@/svg'
import Row from './Rows'
export default {
  components: { Row, SvgPlusCircle },
  props: { value: Array, disabled: Boolean },
  data: () => ({
      context: {}
  }),
  watch: {
    ocenca(value) {
      if (!toNumber(value)) return
      this.$emit('change', { name: 'ocenca', value })       
    }
  },
  computed: {
    ...mapGetters({ company: 'company' }),
    headers() {
      return [ 
        { name: 'proba' }, 
        { name: 'ves' }, 
        { name: 'derty' }, 
        { name: 'ocenca', width: '30%' } 
      ]
    },
    model({ value }) {
      return value || []
    },
    ves({ model }) {
      return summ( ...model.map(v => v.ves))
    },
    derty({ model }) {
      return summ( ...model.map(v => v.derty))
    },
    ocenca({ model }) {
      return summ( ...model.map(v => v.ocenca))
    },
    canAdd({ value, company }){
      const { obespechenie = 5 } = company.rows || {}
      return value.length < obespechenie
    }
  },
  methods: {
    input(index, value) {
      this.value[index] = value
      this.$emit('input', [ ...this.value] )
    },
    add() {
      this.$emit('input', [...this.value, {}] )
    },
    remove(index) {
      this.$emit('input', this.value.filter((v, i) => i !== index) )
    },
    t(v) {
      return this.$t(`obespechenie.${v}`)
    },
    onContext(context) {
      const { _uid } = this.context
      if (_uid && _uid !== context._uid) this.context.close()
      this.context = context
    }
  }
}
</script>

<style scoped>
  .obespechenie {
    overflow: hidden !important;
    border: 1px solid rgba(0, 0, 0, 0.22);
    margin-left: -5px;
    margin-right: -5px;
  }
  .obespechenie .add{
    border-bottom: none;
  }
  .obespechenie__table >>> tr {
    border-bottom: 1px solid rgba(0, 0, 0, 0.22);
  }
  .obespechenie__table >>> th {
    border-bottom: none;
  }
</style>
