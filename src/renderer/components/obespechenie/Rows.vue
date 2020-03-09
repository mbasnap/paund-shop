<template>
<tr :class="{'err': value.err}">
    <td class="index" style="width: 10px; text-align: center;">{{ $vnode.key + 1 }}</td>
    <td><named-input name="title" :value="model" style="width: 250px;"/></td>
    <td><named-select name="proba" style="width: 50px;"
    :value="model" :options="Object.keys(price)" @change="change"/></td>
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
props: { value: Object, editable: Boolean, type: Boolean },
computed: {
    ...mapGetters(['company']),
    price({ company }) {
        const { gold, silver } = {...company.price}
        // console.log(gold);
        
        return (gold || []).reduce((cur, { proba, price }) =>
            ({...cur, [proba]: price }), {})
    },
    // options({ price }) {
    //     return Object.keys(price)
    // },
    ves({ value }) {
        return toDouble(value.ves)
    },
    derty({ value }) {
        return toDouble(value.derty)
    },
    total({ value }) {
        return toDouble(value.total)
    },
    ocenca({ value }) {
        return toDouble(value.ocenca)
    },
    model({ value, ves, derty, ocenca }) {
        return { ...value, ves, derty, ocenca }
    }
},
methods: {
    readonly() {
        return !this.editable
    },
    change({ name, value }) {
        this.update({ ...this.model, [name]: value })
    },
    update(value) {
        const total = pDiff(value.ves, value.derty)
        const ocenca = !this.type ? mult(total, this.price[value.proba]): value.ocenca
        this.$emit('input', { ...value, total: toDouble(total), ocenca: toDouble(ocenca) })
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