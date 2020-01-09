<template>
    <div v-if="value.length" class="history border-top">
            <ul  class="item">
                <div v-if="bilet">
                    <li class="row ">
                        <div class="row">
                            <div class="col">
                                <span> Number {{ bilet.number }}</span>
                            </div>
                            <div  class="col-4">
                                <span class=" btn badge badge-primary"
                                @click="print(bilet)"
                                >{{ $t('print-btn') }}</span>
                            </div>
                        </div>
                    </li>
                    <li class="row">
                        <div class="col p-0">
                            <span>{{ klient.family }}</span>
                            <span>{{ klient.name }}</span>
                            <span>{{ klient.sername }}</span>
                        </div>
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
import { Bilet } from '@/zvit'
export default {
    props: { value: Array },
    computed: {
        ...mapGetters({
            dt001: 'reestr/dt001',
            ct001: 'reestr/ct001',
            klients: 'klient/klients',
            accounts: 'accounts',
        }),
        model({ value, dt001, ct001 }) {
            const [ id, values = [] ] = value
            return { id, values: values.filter(({ dt, ct }) => [dt, ct].includes('301')) }
        },
        bilet({ model, dt001, ct001 }) {
            return { ...dt001, ...ct001}[model.id]
        },
        klient({ bilet, klients }) {
            return klients[bilet.klient]
        }
    },
    methods: {
        print(value) {
            this.$modal.show(Bilet, { value }, { height: '550px', width: '800px'})
        },
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
</style>