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
                    {{ t('issued') }}
                    <div class="col">{{ issued }}</div>
                </div>    
            </div>
        </div>
        <div class="row border-bottom">
            <div class="col">
               <div class="row">
                    {{ t('idn') }}
                    <!-- <div class="col">{{ idn }}</div> -->
                </div>    
            </div>
        </div>
        <div class="row border-bottom">
            <div class="col">
               <div class="row">
                    {{ t('idn') }}
                    <!-- <div class="col">{{ idn }}</div> -->
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
        return { ...value }
    },
    ssuda({ bilet }) {
        return { ...bilet.ssuda }
    },
    fio({ bilet }) {
        console.log(bilet)
        return bilet.from
    },
    passport({ bilet }) {
        const { seria, number } = bilet.doc
        return `${seria || ''} ${number || ''}`
    },
    issued({ bilet }) {
        return { ...bilet.doc}.issued
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