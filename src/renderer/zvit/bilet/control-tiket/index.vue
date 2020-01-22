<template>
  <div >
        <div style="font-weight: bold;">
            <div class="col border-bottom">
               <div class="row" >
                    {{ t('bilet') }}
                    <div class="col">{{ bilet.number }}</div>
                </div>
            </div>
        </div>

        <div class="row border-bottom" style="font-size: 12px; line-height: 25px;">
            <div class="col">{{ bilet.date}}</div>
            <div class="col">
                <span>{{ t('ssuda') }}</span>
                <span>{{ ssuda.summ }}</span>
            </div>
        </div>
        <div class="col p-0">
            <div v-for="(item, index) in obespechenie" :key="index">
                <div class="row" style="overflow: hiden">
                    <div class="col" style="font-size: 12px;">{{ item.title}}</div>
                    <div class="col" style="font-size: 12px; line-height: 25px; text-align: right;">
                        <!-- <span>{{ item.derty}}</span> -->
                        <span>{{ item.total}}</span>
                        <span>{{ item.ocenca}}</span>
                    </div>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
export default {
    props: { value: Object },
    computed: {
        bilet({ value }) {
            return {...value}
        },
        ssuda({ bilet }) {
            return { ...bilet.ssuda }
        },
        obespechenie({ bilet }) {
            return bilet.obespechenie || []
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