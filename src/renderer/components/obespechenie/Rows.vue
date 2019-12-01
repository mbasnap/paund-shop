<template>
    <tr :class="{'err': value.err}">
        <td class="index">{{ $vnode.key + 1 }}</td>
        <td> <named-input name="title" :value="value"/> </td>
        <td>
            <named-select  name="proba" :value="value" :options="Object.keys(price)" />
        </td>
        <td> <named-input name="ves" :value="value" :format="toDouble"/> </td>
        <td> <named-input name="derty" :value="value" :format="toDouble"/> </td>
        <td class="ocenca"> {{ toDouble(value['ocenca']) }} </td>
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
    ...mapGetters(['settings']),
    price() {
        return this.settings.price
    }
},
methods: { toDouble,
    readonly() {
        return !this.editable
    },
    change({ name, value }) {
        this.update({ ...this.value, [name]: value })
    },
    update(value) {
        const total = pDiff(value.ves, value.derty)
        const ocenca = mult(total, this.price[value.proba])
        const err = diff(value.derty, value.ves) > 0
        this.$emit('input', { ...value, total, ocenca, err })
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