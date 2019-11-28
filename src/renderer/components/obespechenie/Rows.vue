<template>
    <tr :class="{'err': value.err}">
        <td class="index">{{ $vnode.key + 1 }}</td>
        <td> <named-input name="title" :value="value"/> </td>
        <td>
            <named-select  name="proba" :value="value" :options="Object.keys(price)" />
        </td>
        <td> <named-input name="ves" :value="value" :format="toDouble"/> </td>
        <td> <named-input name="derty" :value="value" :format="toDouble"/> </td>
        <td> {{ toDouble(value['ocenca']) }} </td>
    </tr>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { diff, toDouble } from '@/functions'
import { NamedInput, NamedSelect, mix } from '@/widgets/named-input/index.js'
export default {
components: { NamedInput, NamedSelect },
mixins: [ { provide: mix.provide, methods: mix.methods } ],
props: { value: Object },
computed: {
    ...mapGetters(['settings']),
    price() {
        return this.settings.price
    }
},
methods: { toDouble,
    validate() {
        const { ves, derty } = this.value
        return diff(ves, derty) >= 0
    },
    getTotal() {
        const { ves, derty } = this.value
        return toDouble(diff(ves, derty))
    },
    getOcenca() {
        const { total, proba } = this.value
        return toDouble(total * this.price[proba])
    },
    change({ name, value }) {
        this.value[name] = value
        this.value['total'] = this.getTotal()
        this.value['ocenca'] = this.getOcenca()
        this.value['err'] = !this.validate()
        this.$emit('input', { ...this.value })
    }
}
}
</script>

<style>

</style>