<template>
    <div>
        <!-- <div class="row border-bottom" style="font-size: 1.3rem;">
            <div class="col"></div>
            <div class="col"><span>{{ t('bilet') }}</span> {{ bilet.number }}</div>
        </div> -->
        <div class="row border-bottom">
            <div class="col">
                <div class="row">
                    {{ t('date') }}
                    <div class="col">{{ bilet.date }}</div>
                </div>
            </div>
            <div class="col">
               <div class="row">
                    {{ t('ssuda') }}
                    <div class="col">{{ ssuda.summ }}</div>
                </div>
            </div>
        </div>
        <div class="row border-bottom">
            <div class="col">
                <div class="row">
                    {{ t('fio') }}
                    <div class="col">{{ fio }}</div>
                </div>            
            </div>
        </div>
        <div class="row border-bottom">
            <div class="col">
               <div class="row">
                    {{ t('passport') }}
                    <div class="col">{{ passport }}</div>
                </div>          
            </div>
        </div>
        <div class="row border-bottom">
            <div class="col">
               <div class="row">
                    {{ t('idn') }}
                    <div class="col">{{ klient.idn }}</div>
                </div>    
            </div>
        </div>
        <div class="row border-bottom">
            <div class="col">
               <div class="row">
                    {{ t('idn') }}
                    <div class="col">{{ klient.idn }}</div>
                </div>    
            </div>
        </div>
        <div class="row border-bottom">
            <div class="col">
               <div class="row">
                    {{ t('idn') }}
                    <div class="col">{{ klient.idn }}</div>
                </div>    
            </div>
        </div>
        <div class="row">
            <div  style="font-style: italic; font-size: 12px;">{{ t('text_aggre') }}</div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
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
    klient({ bilet, klients }) {
        const { klient: id } = bilet
        return klients[id]
    },
    fio({ klient }) {
        const { family, name, sername } = klient
        return family + ' ' + name + ' ' + sername
    },
    passport({ bilet, klient }) {
        const { seria, number } = klient.passport[bilet.passport || 0] || {}
        return seria + ' ' + number
    },
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