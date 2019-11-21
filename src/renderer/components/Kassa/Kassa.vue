<template>
    <b-card class="kassa" header-tag="header" footer-tag="footer" body-class="scroll-auto"
    :header="formated(settings['ok'])" :footer="formated(total)">
    <context class="row " :actions="{ add, edit, remove }">
        <kassa-list class="col-6" :data="kassa.dt" :rows="rowsLength"/>
        <kassa-list class="col-6" :data="kassa.ct" :rows="rowsLength"/>
    </context>
  </b-card>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import KassaList from './KassaList.vue'
import Context from '@/components/Context.vue'
export default {
    components: { KassaList, Context },
    created() {
        this.update()
    },
    computed: {
        ...mapGetters({ reestr: 'reestr/byDate', settings: 'settings'}),
        values() {
            const values = (curr, { values }) => [...curr, ...values]
            return this.reestr.reduce(values, [])
        },
        kassa () {
            const kassa = acc => v => v[acc] === '301'
            const dt = this.values.filter(kassa('dt'))
            const ct = this.values.filter(kassa('ct'))
            return { dt, ct }
        },
        rowsLength() {
            const { kassa, settings } = this
            return Math.max( settings['minRows'], kassa['dt'].length, kassa['ct'].length )
        },
        total() {
            const { kassa, settings } = this
            const summ = acc => kassa[acc].reduce((cur, { summ }) => cur + summ, 0)
            return settings['ok'] + summ('dt') - summ('ct') 
        }
    },
    methods: {
        ...mapActions('reestr', ['remove', 'update']),
        formated(number) {
            return this.$numberFormat(number, 2, ',', ' ')
        },
        add() {},
        edit() {}
    }
}
</script>

<style>
.kassa {
    padding: 0px;
    border: 1px solid rgba(0, 0, 0, 0.3);
}
.kassa .card-body{
    flex: unset;
    padding: 0;
}
.scroll-auto {
    overflow: auto;
    overflow-x:hidden;
    padding-top: 0 !important;
}
.card-header, .card-footer {
    background-color: #eef1f3;
    text-align: right;
}
</style>


