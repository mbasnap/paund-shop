<template>
    <div>
        <table class="table table-sm table-bordered">
        <thead>
            <tr style="font-size: 10px; text-align: center;">
                <th scope="col" style="width: 2%; font-size: 15px; font-weight: initial;">9</th>
                <th scope="col" style="width: 52%;">{{t('title')}}</th>
                <th scope="col" style="width: 5%;">{{t('proba')}}</th>
                <th scope="col" style="width: 9%;">{{t('comon-ves')}}</th>
                <!-- <th scope="col" style="width: 5%;">{{t('derty')}}</th> -->
                <th scope="col" style="width: 9%;">{{t('clear-ves')}}</th>
                <th scope="col" style="width: 23%;">{{t('ocenca')}}</th>
            </tr>
        </thead>
        <tbody>
            <table-row v-for="index in rows" :key="index-1" :value="model[index-1]" :index="index"/>
        </tbody>
        </table>
    </div>
</template>

<script>
import Sign from '../Sign'
import { mapGetters } from 'vuex'
import TableRow from './TableRow'
export default {
    components: { TableRow, Sign },
    props: { value: Object },
    inject: ['t'],
    computed: {
        ...mapGetters({
            company: 'company',
        }),
        // header() {
        //     return []
        // },
        bilet({ value }) {
            return { ...value }
        },

        model({ bilet }) {
            return bilet.obespechenie || []
        },
        rows({ company }) {
            const { obespechenie } = {...company.rows }
            return Number(obespechenie)
        }
    },
    methods: {}
}
</script>

<style>

</style>