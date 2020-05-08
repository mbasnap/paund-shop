<template>
    <div class="row flex-fill vozvrat  pt-3">
        <div class="col-8">
            <div class="row " style="height: 250px;">
                <klient ref="klient" class="col" v-model="klient" :disabled="true"/>
                <div class="col">
                    <div class="row p-0 m-0">
                        <bilet-number class="col" v-model="bilet"
                        @select="({ _id }) => select(_id)"/>
                        <div class="col-2" style="text-align: right;">
                            <svg-reset  width="8px;" @click="select()"/>
                        </div>  
                    </div>
                    <div class="col mb-2" style="min-height: 140px; line-height: 15px;">                        
                        <div v-if="bilet._id">
                            <bilet  ref="bilet"  v-model="bilet" :disabled="disabled">
                            <tr>
                            <td style="text-align: left; line-height: 20px;">
                                {{ t('vozvrat','statment') }}
                            </td>
                            <td>
                                <select style="border: none; width: 100%"
                                :value="statment.days || 0" :disabled="disabled"
                                @change="({ target }) => addStatment(target.value)">
                                <option v-for="(v, i) in statmentOptions" :key="i">{{ v }}</option>
                                </select>
                            </td>
                            <td>
                                <svg-calculator width="20px" :disabled="disabled" @click="showModal(bilet)"/>
                            </td>      
                            </tr>                                                                
                            </bilet>
                        </div>
                    </div>
                    <div class="col">
                        <div class="row">
                            <div class="col">
                            </div>
                            <div class="col">
                                <div class="row">
                                    <button class="col btn btn-primary" :disabled="disabled"
                                    @click="saveBilet(model)">{{ t('btn','save') }}
                                    </button>
                                </div>
                            </div>   
                        </div>
                    </div>
                </div>                                 
            </div>        
            <obespechenie :value="bilet.obespechenie || []"/>
        </div>
        <kassa ref="kassa" class="col-4"></kassa> 
    </div>
</template>
<script>
import { BiletNumber, Bilet, Editor, mix } from './components'
import { SvgCalculator, SvgReset } from '@/svg'
export default {
components: { BiletNumber, Bilet, Editor, SvgCalculator, SvgReset },
mixins: [ mix ],
data() {
    return {
        biletId: false,
        klientId: false,
    }
},
computed: {
    bilet({ biletId, reestrMap }) {
        return {...reestrMap[biletId]}
    },
    klient: {
        get({ bilet, klientId }) {
            return klientId || bilet.klient
        },
        set(v) {
            this.klientId = v
        }
    },
    model({ klient }) {        
        return { ...this.$refs['bilet'].model, klient }
    },
    statmentOptions({ company }) {
        const { statment = '' } = {...company}
        return [0, ...statment.split(',').filter(v => v > 0).map(v => Number(v))]
    },
    statment({ bilet }) {
        return {...bilet.statment}
    },
    disabled({ biletId, used }) {
        return !biletId || !!used[biletId]
    }
},
methods: {
    select(id = false) {
        this.biletId = id
    },
    addStatment(days) {
        const statment = days ? { date: this.date, days } : false
        return this.save({...this.bilet, statment})
    },
    showModal(value) {
        const title = 'Perezalog'
        const { bilet, model: vozvrat, saveBilet: save } = this
        this.$modal.show(Editor, { title, value: { bilet, vozvrat }, save }, { width: '800px', height: 'auto' })
    }
}
}
</script>

<style>
.vozvrat{
    overflow: auto;
    height: 100%;
}
.klient .btn.edit {
    display: flex;
    justify-content: flex-end;
    cursor: pointer;
}
</style>

