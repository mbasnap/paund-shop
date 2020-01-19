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
                    <div class="col">{{ idn }}</div>
                </div>    
            </div>
        </div>
        <div class="row border-bottom">
            <div class="col">
               <div class="row">
                    {{ t('idn') }}
                    <div class="col">{{ idn }}</div>
                </div>    
            </div>
        </div>
        <div class="row border-bottom">
            <div class="col">
               <div class="row">
                    {{ t('idn') }}
                    <div class="col">{{ idn }}</div>
                </div>    
            </div>
        </div>
        <div class="row">
            <div  style="font-style: italic; font-size: 12px;">{{ t('text_aggre') }}</div>
        </div>
    </div>
</template>

<script>
export default {
props: { value: Object },
computed: {
    bilet({ value }) {
        return value
    },
    ssuda({ bilet }) {
        return bilet.ssuda
    },
    klient({ bilet }) {
        return { ...bilet.klient }
    },
    fio({ klient }) {
        const { family, name, sername } = klient
        return `${family} ${name} ${sername}`
    },
    passport({ klient }) {
        const [passport] = klient.passport || []
        const { seria, number } = { ...passport}
        return `${seria || ''} ${number || ''}`
    },
    idn({ klient }) {
        return klient.idn
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