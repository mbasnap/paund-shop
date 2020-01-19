<template>

<div class="sklad row">
    <list-to class="col-6" :value="Object.values(empty)" :actions="{ toSklad: toSklad }"/>
    <list-to class="col-6" :value="values.filter(v => v.dt === '200')" :actions="{ fromSklad: remove }"/>
</div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import {moment} from '@/functions'
import ListTo from "./components/ListTo"
export default {
    components: { ListTo },
    provide() {
        const { tostring, remove } = this
        return { tostring }
    },
    computed: {
    ...mapGetters({
        values: 'reestr/values',
        map: 'reestr/map',
        empty: 'reestr/empty',
        klients: 'klient/map'
    }),
    },
    methods: {
        ...mapActions({
            remove: 'reestr/remove',
            save: 'reestr/save'
        }),
        toSklad({ _id: ref, ssuda, date }) {
            const days = moment(date).diff(this.date, 'd')
            return this.save({ ref, values: [
                { dt: '200', ct: '377', ...ssuda, days }
            ]})
        },
        tostring({ _id, date }) {
            const bilet = { ...this.map[_id]}
            const { number, ocenca, klient } = { ...bilet, ...this.map[bilet.ref]}
            const { family } = { ...this.klients[klient]}
            return `${number} ${moment(date).format('L')} ${family} ${ocenca}`            
        }
    }
}
</script>
<style>
.sklad {
    width: 100%;
    padding: 10px;
}
  .sklad .list .header {
        text-align: center;
        background-color: rgba(0, 0, 0, 0.1);
        border: 1px solid rgba(0, 0, 0, 0.1);
    }

</style>
