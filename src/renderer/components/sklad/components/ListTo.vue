<template>
    <!-- <draggable teg="ul" class="kassa-list small p-0 m-0" :value="model" group="sklad"> -->
        <context  :actions="{ fromSklad: remove }">
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
import moment from 'moment'
import Context from '@/components/Context.vue'
import draggable from 'vuedraggable'
import Items from './Items'
export default {
    components: { Context, draggable, Items },
  computed: {
    ...mapGetters({
        values: 'reestr/values',
        ct001: 'reestr/ct001',
        klients: 'klient/klients'
    }),
    model({ values }) {
        return values.filter(v => v.dt === '200')
    }
  },
  methods: {
    ...mapActions({
        remove: 'reestr/remove'
    }),
    tostring({ _id, date }) {
        const { number, klient, ocenca } = this.ct001[_id]
        const { family } = this.klients[klient]
        return number + ' ' + date + ' ' + family + ' ' + ocenca
    }
  }
}
</script>

<style>

</style>