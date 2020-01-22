<template>
    <div class="obespechenie" >
        <table  :class="[ 'table', 'table-sm', { readonly: disabled } ]">
        <thead >
            <tr>
                <th class="index">#</th>
                <th v-for="(name, index) in [ 'title', 'proba', 'ves', 'derty', 'ocenca' ]" 
                :key="index" :class="name">{{name}}</th>
            </tr>
        </thead>
        <tbody>
            <row  v-for="(item, index) in value" :key="index" class="items"
            :value="item" @input="value => input(index, value)" :editable="!disabled"/>
            <tr class="add">
                <td>
                    <svg-plus-circle :disabled="disabledAdd" width="15px;" @click="add"/>
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
import { toDouble, summ } from '@/functions'
import { SvgPlusCircle } from '@/svg'
import Row from './Rows'
export default {
    components: { Row, SvgPlusCircle },
    props: { value: Array, disabled: Boolean },
    computed: {
        ...mapGetters({
            settings: 'settings',
        }),
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
        rows({ value }) {
            return value.length
        },
        disabledAdd({ rows, settings }){
            const { maxRows } = {...{ ...settings}.obespeshenie }
            return rows >= 5
        }
    },
    methods: {
        input(index, value) {
            this.value[index] = value
            this.$emit('input', [ ...this.value] )
        },
        add() {
            this.$emit('input', [...this.value, {}] )
        }
    }
}
</script>

<style>

    .obespechenie table{
        border: 1px solid rgba(0, 0, 0, 0.22);
    }
    .obespechenie table tr.items td {
        border-right: 1px solid rgba(0, 0, 0, 0.22);
    }

</style>
