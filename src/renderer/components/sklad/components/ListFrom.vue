<template>
    <!-- <draggable teg="ul" class="kassa-list small p-0 m-0" :value="model" group="sklad"> -->
        <context  :actions="{ toSklad }">
            <div class="list">
                <div class="header">
                    <p>Filter</p>
                </div>
                <items teg="ul" :items="model" :tostring="tostring"/>
            </div>
        </context>
    <!-- </draggable> -->
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { moment } from '@/functions'
import Context from '@/components/Context.vue'
import draggable from 'vuedraggable'
import Items from './Items'
export default {
    components: { Context, draggable, Items },
  computed: {
    ...mapGetters({
        empty: 'reestr/empty',
        date: 'date',
        klients: 'klient/klients'
    }),
    model({ empty }) {
        return Object.values(empty)
    }
  },
    methods: {
        ...mapActions({ save: 'reestr/save' }),
        toSklad({ _id: ref, ssuda, date }) {
            const days = moment(date, 'L').diff(this.date, 'd')
            const values = [
                { ct: '001', ref },
                { dt: '200', ct: '377', ...ssuda, days }
            ]
            return this.save(values)
        },
        tostring({ number, date, klient, ocenca }) {
            const { family } = this.klients[klient]
            return number + ' ' + date + ' ' + family + ' ' + ocenca
        }
    }
}
</script>

<style>

</style>