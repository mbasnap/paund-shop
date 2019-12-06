<template>
    <div class="obespechenie" >
        <table  :class="[ 'table', 'table-sm', { readonly: !editable } ]">
        <thead >
            <tr>
                <th class="index">#</th>
                <th v-for="(name, index) in [ 'title', 'proba', 'ves', 'derty', 'ocenca' ]" 
                :key="index" v-bind:class="name">{{name}}</th>
            </tr>
        </thead>
        <tbody>
            <row  v-for="(item, index) in value" :key="index" class="items"
            :value="item" @input="value => input(index, value)" :editable="editable"/>
            <tr class="add">
                <td @click="add" >Add </td>
                <td></td>
                <td></td>
                <td>{{ toDouble(total['ves']) }}</td>
                <td>{{ toDouble(total['derty']) }}</td>
                <td class="total ocenca">{{ toDouble(total['ocenca']) }}</td>
            </tr>       
        </tbody>
        </table> 
    </div>
</template>

<script>
import { toDouble, summ } from '@/functions'
import Row from './Rows'
export default {
    components: { Row },
    props: { value: Array, editable: Boolean },
    computed: {
        total({ value }) {
            return value.reduce((cur, v) => {
                const ves = summ(cur.ves, v.ves)
                const derty = summ(cur.derty, v.derty)
                const ocenca = summ(cur.ocenca, v.ocenca)
                return { ...cur, ves, derty, ocenca }
            }, { ves: 0, derty: 0, ocenca: 0 })
        }
    },
    methods: { toDouble,
        input(index, value) {
            this.value[index] = value
            this.$emit('input', [ ...this.value ] )
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
