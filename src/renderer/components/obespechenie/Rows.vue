<template>
<tr :class="{ 'err': value.err }">
    <td class="index" style="width: 10px; text-align: center;">{{ $vnode.key + 1 }}</td>
    <td v-for="(item, i) in fields" :key="i" class="fields">
        <component :ref="item.name" :is="item.options ? 'named-select' : 'named-input'"
        :style="{ width: item.width + 'px' }" :name="item.name" :value="model"
        :options="item.options" @change="change" @enter="focus(fields[i + 1])"></component>
    </td>
</tr>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { diff, pDiff, toDouble, mult } from '@/functions'
import { NamedInput, NamedSelect, mix } from '@/widgets/named-input/index.js'
export default {
components: { NamedInput, NamedSelect },
mixins: [ { provide: mix.provide, methods: mix.methods } ],
props: { value: Object, editable: Boolean },
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
    fields({ options }) {
        return [
            { name: 'title', width: 250 },
            { name: 'proba', width: 50, options },
            { name: 'ves' },
            { name: 'derty' },
            { name: 'ocenca', width: 50 }
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
    }
},
methods: {
    readonly() {
        return !this.editable
    },
    change({ name, value }, fieldName) {
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
</style>