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
                <td @click="add" >Add </td>
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
import { toDouble, summ } from '@/functions'
import Row from './Rows'
export default {
    components: { Row },
    props: { value: Array, disabled: Boolean },
    computed: {
        ves({ value }) {
            return summ( ...value.map(v => v.ves))
        },
        derty({ value }) {
            return summ( ...value.map(v => v.derty))
        },
        ocenca({ value }) {
            return summ( ...value.map(v => v.ocenca))
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
