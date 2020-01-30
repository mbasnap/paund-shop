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
            <div class="col"><span>{{ ssuda.summ }}</span></div>
        </div>
        <div class="col p-0">
            <div v-for="(item, index) in obespechenie" :key="index">
                <div class="row p-0" style="font-size: 10px; line-height: 25px;">
                    <div class="col-7 pr-0" style="overflow: hidden; width: 50px; text-overflow: ellipsis; white-space: nowrap;">
                        <strong>{{ item.title}}</strong>
                    </div>
                    <div class="col p-0"  style="font-size: 8px; display: flex; text-align: right;">
                        <span class="pr-2">{{ item.total}}</span>
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
    inject: ['t'],
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
    methods: {}
}
</script>

<style>

</style>