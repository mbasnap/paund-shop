<template>
  <context ref="context" teg="tr" :class="{ err: value.err }"
  @remove="$emit('remove')"
  @context="v => $emit('context', v)" :disabled="disabled">
    <td class="index" style="width: 10px; text-align: center;">{{ $vnode.key + 1 }}</td>
    <td v-for="({ name, is = 'named-input' }, i) in fields" :key="i" class="fields">
      <component :ref="name" :is="is" :name="name" :value="model"
      :options="options" @change="change" @enter="focus(fields[i + 1])"></component>
    </td>
  </context>
</template>

<script>
import Context from '@/components/Context'
import { mapGetters } from 'vuex'
import { pDiff, toDouble, mult } from '@/functions'
import { NamedInput, NamedSelect, mix } from '@/widgets/named-input/index.js'
export default {
components: { NamedInput, NamedSelect, Context },
mixins: [ { provide: mix.provide, methods: mix.methods } ],
props: ['value', 'disabled'],
  provide() {
    const remove = () => {}
    return { actions: { remove } }
  },
computed: {
    ...mapGetters(['company']),
    companyPrice({ company }) {
        const { gold, silver } = {...company.price}
        return gold || []
    },
    priceMap({ companyPrice }) {
        return companyPrice.reduce((cur, { proba, price }) =>
            ({...cur, [proba]: price }), {})
    },
    options({ companyPrice }) {
        return companyPrice.map(v => v.proba)
    },
    fields({ disabled }) {
        const is = !disabled ? 'named-select' : 'named-input' 
        return [
          { name: 'title' },
          { name: 'proba', is },
          { name: 'ves' },
          { name: 'derty' },
          { name: 'ocenca' }
        ]
    },
    ves({ value }) {
      return toDouble(value.ves)
    },
    derty({ value }) {
      return toDouble(value.derty)
    },
    ocenca({ value }) {
      return toDouble(value.ocenca)
    },
    total({ value }) {
      return toDouble(value.total)
    },
    model({ value, ves, derty, ocenca }) {
      return {...value, ves, derty, ocenca }
    },

},
methods: {
  readonly() {
    return this.disabled
  },
  change({ name, value }) {
    this.update({ ...this.value, [name]: value })
  },
  update(v) {
    const ves = toDouble(v.ves)
    const derty = toDouble(v.derty)
    const total = toDouble(pDiff(ves, derty))
    const price = toDouble(this.priceMap[v.proba])
    const ocenca = toDouble(mult(total, price) || v.ocenca)
    this.$emit('input', {...v, ves, derty, total, price, ocenca })
  },
  focus({ name } = {}) {
    if (name) this.$refs[name][0].focus()
  },
  t(v) {
    return this.$t(`obespechenie.${v}`)
  }
}
}
</script>

<style scoped>
  .obespechenie .items.err{
    background-color: rgba(249, 124, 124, 0.44);
  }
  .index, .fields {
    border-right: 1px solid rgba(0, 0, 0, 0.103);
  }
  .fields:last-child {
    border-right: none;
  }
</style>