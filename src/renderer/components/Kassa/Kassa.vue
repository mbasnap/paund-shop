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
import Context from '@/components/Context'
export default {
    components: { KassaList, Context },
    created() {
        this.update()
    },
    computed: {
        ...mapGetters({ kassa: 'reestr/kassa', settings: 'settings'}),
        rowsLength() {
            const { kassa, settings } = this
            return Math.max( settings['minRows'], kassa['dt'].length, kassa['kt'].length )
        },
        summ() {
            const summ = name => this.kassa[name].map(v => v.summ)
            return { dt: summ('dt'), ct: summ('ct') }
        },
        total() {
            const { summ, settings } = this
            console.log(summ['dt']);
            
            return settings['ok'] + Math.sum( ...summ['dt'] ) - Math.sum( ...summ['ct'] )
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
    /* height: 50px;
     padding: 0; */
}
</style>


