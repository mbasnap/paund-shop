<template>
<tr :class="{'err': value.err}">
    <td class="index" style="width: 10px; text-align: center;">{{ $vnode.key + 1 }}</td>
    <td><named-input name="title" :value="model" style="width: 250px;"/></td>
    <td><named-select name="proba" style="width: 50px;"
    :value="model" :options="options" @change="change"/></td>
    <td><named-input name="ves" :value="model"/></td>
    <td><named-input name="derty" :value="model"/></td>
    <td><named-input name="ocenca" :value="model" style="width: 100px;"/></td>
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
    change({ name, value }) {
        this.update({ ...this.value, [name]: value })
    },
    update(v) {
        // const { ves, derty, proba, ocenca } = v
        const ves = toDouble(v.ves)
        const derty = toDouble(v.derty)
        const total = toDouble(pDiff(ves, derty))
        const price = toDouble(this.priceMap[v.proba])
        const ocenca = toDouble(mult(total, price) || v.ocenca)
        this.$emit('input', {...v, ves, derty, total, price, ocenca })
    },
    t(v) {
        return this.$t(`obespechenie.${v}`)
    }
}
}
</script>

<style>
    .obespechenie .items.err{
        background-color: rgba(249, 124, 124, 0.44);
    }
</style>