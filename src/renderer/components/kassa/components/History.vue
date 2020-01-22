<template>
    <div v-if="value" class="history border-top">
            <ul  class="item">
                <div >
                    <li class="row ">
                        <div class="row print-lincks">
                            <div  class="col-6">
                                <span class="badge badge-pill badge-light" 
                                @click="$emit('printOrder', {value: model})">
                                    Order {{ model.number }}
                                </span>
                            </div>
                            <div class="col">
                                <span v-if=" model.bilet" class="badge badge-pill badge-light" 
                                @click="$emit('printBilet', {value: model})">
                                    Bilet {{ model.bilet }}
                                </span>
                            </div>
                        </div>
                    </li>
                    <li class="row">
                        <div class="col p-0">{{ model.from }}</div>
                    </li>
                </div>
                    <li class="row" v-for="(v, i) in model.values" :key="i">
                        <div class="row">
                            <span class="col">{{ getTitle(v) }}</span>
                            <span class="col">{{ v.summ }}</span>
                        </div>
                    </li>
            </ul>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { toNumber, moment } from '@/functions'
export default {
    props: { value: String },
    computed: {
        ...mapGetters({
            map: 'reestr/map',
            bilets: 'reestr/bilets',
            orders: 'reestr/orders',
            accounts: 'accounts',
        }),
        bilet({ value: id, bilets}) {            
            return { ...{...bilets}[id] }
        },
        order({ value: id, orders }) {
            return {...{...orders}[id]}
        },
        values({ value: id, map }) {
            const acc301 = ({ dt, ct, summ }) =>
                [dt, ct].includes('301') && toNumber(summ)
            const { values } = {...{...map}[id]}
            return (values || []).filter(acc301) 
        },
        model({ bilet, order, values }) {      
            const date = moment(bilet.date).format('L')
            return { ...bilet, ...order, values, date, bilet: bilet.number }
        }
    },
    methods: {
        getTitle({ dt, ct }) {
            return Object.entries({ dt, ct })
                .filter(([k,v]) => v !== '301')
                    .map(([k,v]) => this.accounts[k][v])[0]
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