<template>
    <div class="obespechenie" >
        <div class="row m-0 ml-2" v-show="type"> 
            <div class="col">
                <input type="checkbox" :checked="type !== 'gold'"
                class="form-check-input" id="dropdownCheck2" @change="changeType">
                <label class="form-check-label" for="dropdownCheck2">{{ t('things') }}</label>
            </div>
        </div>
        <table  :class="[ 'table', 'table-sm', { readonly: disabled } ]">
        <thead >
            <tr style="font-size: 12px;">
                <th class="index"></th>
                <th class="title">{{ t('title') }}</th>
                <th v-for="(name, index) in [ 'proba', 'ves', 'derty', 'ocenca' ]" 
                :key="index" :class="name">{{ t(name) }}</th>
            </tr>
        </thead>
        <tbody style="font-size: 14px;">
            <row  v-for="(item, index) in value" :key="index" class="items" :type="type !=='gold'"
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
import { toDouble, toNumber, summ } from '@/functions'
import { SvgPlusCircle } from '@/svg'
import Row from './Rows'
export default {
    components: { Row, SvgPlusCircle },
    props: { value: Array, disabled: Boolean, type: String },
    watch: {
        ocenca(v) {
            if(!toNumber(v)) return
            this.$emit('change', v)       
        }
    },
    computed: {
        ...mapGetters({
            company: 'company',
        }),
        model({ value, type }) {
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
        disabledAdd({ rows, company }){
            const { obespechenie } = {...company.rows }
            return rows >= obespechenie
        }
    },
    methods: {
        changeType() {
            const type = this.type === 'gold'
            this.$emit('changeType', type ? 'things': 'gold')
        },
        input(index, value) {
            this.value[index] = value
            this.$emit('input', [ ...this.value] )
        },
        add() {
            this.$emit('input', [...this.value, {}] )
        },
        t(v) {
            return this.$t(`obespechenie.${v}`)
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
