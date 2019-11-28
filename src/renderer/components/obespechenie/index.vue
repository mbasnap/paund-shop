<template>
    <div class="obespechenie">
        <table  class="table  table-sm ">
        <thead >
            <tr>
                <th class="index">#</th>
                <th v-for="(name, index) in [ 'title', 'proba', 'ves', 'derty', 'ocenca' ]" 
                :key="index" v-bind:class="name">{{name}}</th>
            </tr>
        </thead>
        <tbody>
            <row  v-for="(item, index) in value" :key="index" class="items"
            :value="item" @input="value => input(index, value)"/>
            <tr class="add">
                <td @click="add" >Add </td>
                <td></td>
                <td></td>
                <td>{{ toDouble(total['ves']) }}</td>
                <td>{{ toDouble(total['derty']) }}</td>
                <td>{{ toDouble(total['ocenca']) }}</td>
            </tr>       
        </tbody>
        </table> 
    </div>
</template>

<script>
import { summ, diff, toDouble } from '@/functions'
import Row from './Rows'

export default {
    components: { Row },
    props: { value: Array },
    computed: {
        total() {
            return this.value.reduce((cur, v) => {
                // if (v.err) return
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

</style>
