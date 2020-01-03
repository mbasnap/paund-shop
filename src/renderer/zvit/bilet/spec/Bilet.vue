<template>
    <div>
        <div class="row border-bottom" style="font-size: 20px; margin-top: -6px;">
            <div class="col"></div>
            <div class="col"><span>{{ t('bilet') }}</span> {{ bilet.number }}</div>
        </div>
        <div class="row border-bottom">
            <div class="col">{{ t('ssuda') }}</div>
            <div class="col">{{ ssuda.summ }}</div>
        </div>
        <div class="row border-bottom">
            <div class="col">{{ t('procent') }}</div>
            <div class="col">{{ procent.summ }}</div>
        </div>
        <div class="row border-bottom">
            <div class="col">{{ t('ocenca') }}</div>
            <div class="col">{{ bilet.ocenca }}</div>
        </div>
        <div class="row">
            <div class="col-4"><strong>{{ t('pererachet') }}</strong></div>
            <div class="col">
                <div class="row border-bottom" style="height: 28px;"
                v-for="i in 3" :key="i"></div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
props: { value: Object },
computed: {
    ...mapGetters({
        klients: 'klient/klients',
    }),
    bilet({ value }) {
        return value
    },
    ssuda({ bilet }) {
        return bilet.ssuda
    },
    procent({ bilet }) {
        return bilet.procent
    }
},

methods: {
    t(v) {
        return this.$t('print.' + v)
    }
}
}
</script>

<style>

</style>