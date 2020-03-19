<template>
    <div v-if="value" class="history border-top">
            <ul  class="item">
                <div >
                    <li class="row ">
                        <div class="row m-0 print-lincks">
                            <div  class="col">
                                <span v-if=" model.number" class="badge badge-pill badge-light" 
                                @click="$emit('printBilet', model)">
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
            users: 'users',
            used: 'reestr/used'
        }),
        accounts({ company }) {
            const reduce = key => ({...company.accounts}[key] || [])
                .reduce((cur, { acc, title }) => ({...cur, [acc]: title }), {})
            return { dt: reduce('dt'), ct: reduce('ct')}
        },
        bilet({ value, map }) {
            return { ...map[value] }
        },
        klient({ bilet, klients, users}) {
            const { klient } = bilet
            const usersFio = users.reduce((cur, { _id, fio }) => ({...cur, [_id]: fio }), {})
            return {...klients[klient], ...usersFio[klient]}
        },
        from({ klient }) {
            const { family, name, sername } = klient
            return `${family} ${name} ${sername}`
        },
        doc({ klient }) {
            return { ...klient.passport}
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
            const acc = k => this.accounts[k] || []
            return Object.entries({ dt, ct })
                .filter(([k,v]) => v !== '301')
                    .map(([k,v]) => acc(k)[v])[0]
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