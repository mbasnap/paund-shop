<template>
    <tr :class="{'err': value.err}">
        <td class="index">{{ $vnode.key + 1 }}</td>
        <td> <named-input name="title" :value="model"/> </td>
        <td>
            <named-select  name="proba" :value="model" :options="Object.keys(price)" />
        </td>
        <td> <named-input name="ves" :value="model"/> </td>
        <td> <named-input name="derty" :value="model"/> </td>
        <td> <named-input name="ocenca" :value="model" style="text-align: right;"/> </td>
        <!-- <td class="ocenca"> {{ ocenca }} </td> -->
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
    ...mapGetters(['settings']),
    price({ settings }) {
        return { ...settings.price }
    },
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
        // const err = diff(value.derty, value.ves) > 0
        this.$emit('input', { ...value, total: toDouble(total), ocenca: toDouble(ocenca) })
    }
}
}
</script>

<style>
    .obespechenie .items.err{
        background-color: rgba(249, 124, 124, 0.44);
    }
    .obespechenie .index {
        text-align: center;
        width: 10px;
    }
    .obespechenie .title {
        width: 250px;
    }
    .obespechenie .ocenca {
        width: 100px;
        text-align: right;
    }
</style>