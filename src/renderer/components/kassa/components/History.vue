<template>
    <div v-if="value" class="history border-top">
            <ul  class="item">
                <div >
                    <li class="row ">
                        <div class="row m-0 print-lincks">
                            <div  class="col">
                                <span v-if=" model.number" class="badge badge-pill badge-light" 
                                @click="$emit('printBilet', {value: model})">
                                    Билет № {{ model.number }}
                                </span>
                            </div>
                            <div class="col-1 mr-2" style="text-align: right;">
                                <svg-trash width="13px;" @click="removeValue(model)"></svg-trash>
                            </div>
                        </div>
                    </li>
                    <li class="row" style="white-space: nowrap; overflow: hidden;">
                        <div class="col p-0">{{ model.from }}</div>
                    </li>
                </div>
                    <li class="row" v-for="(v, i) in model.values" :key="i">
                        <div class="row">
                            <span class="col">{{ getTitle(v) }}</span>
                            <span class="col-4 p-0">{{ v.summ }}</span>
                        </div>
                    </li>
            </ul>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { toNumber, moment } from '@/functions'
import { SvgTrash } from '@/svg'
export default {
    components: { SvgTrash },
    props: { value: String },
    computed: {
        ...mapGetters({
            map: 'reestr/map',
            klients: 'klient/map',
            company: 'company',
            settings: 'settings',
            used: 'reestr/used'
        }),
        accounts({ settings }) {
            return {...settings.accounts }
        },
        bilet({ value, map }) {
            return { ...map[value] }
        },
        klient({ bilet, klients}) {
            return {...klients[bilet.klient]}
        },
        from({ klient }) {
            const { family, name, sername } = klient
            return `${family} ${name} ${sername}`
        },
        doc({ bilet, klient }) {
            const passports = klient.passports || []
            const passport = bilet.passport || 0
            return { ...passports[passport]}
        },
        model({ bilet, klient, doc, from, company }) {
            const date = moment(bilet.date).format('L')
            const time = moment(bilet.date).format('hh: mm')
            const returnDate = moment(bilet.date).add(bilet.days, 'd').format('L')
            return { ...bilet, klient, doc, from, date, time, returnDate, company }
        }
    },
    methods: {
        getTitle({ dt, ct }) {
            return Object.entries({ dt, ct })
                .filter(([k,v]) => v !== '301')
                    .map(([k,v]) => this.accounts[k][v])[0]
        },
        removeValue(model) {
        if (!this.used[model._id]) 
        return this.$emit('remove', model)  
        }
    }
}
</script>

<style>
.history ul li {
    text-align: left;
    padding-left: 10px;
}
.print-lincks span:hover {
    background-color: #ced0d2;
    cursor: pointer;
}
</style>