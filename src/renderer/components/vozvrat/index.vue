<template>
    <div class="row flex-fill vidacha">
        <div class="col-8 pt-3">
            <div class="row " style="height: 250px;">
                <klient ref="klient" class="col p-0" :value="klient"/>
                <div class="col p-0 border-left">
                    <div class="row m-0 pr-3">
                        <div class="col"></div>
                        <number class="col-9" v-model="bilet" @select="update"/>
                    </div>
                    <div class="col mb-2" style="min-height: 140px; line-height: 15px;">
                        <div v-if="bilet._id">
                            <bilet  ref="bilet"  v-model="bilet"/>
                            <statment-row class="form-row" style="text-align: left;" v-model="bilet">
                                <svg-calculator width="18px" @click="showModal($refs['bilet'])"/>
                            </statment-row>
                        </div>
                    </div>
                    <div class="col">
                        <div class="row">
                            <div class="col-6 ">
                                <button class="btn btn-primary" @click="update({})">{{ t('reset') }}</button>
                            </div>
                            <div class="col-6">
                                <button class="btn btn-primary" :disabled="disabled"
                                @click="saveKlient(klient).then(v => saveBilet(model)).then(v => select(v))">
                                    {{ t('save') }}
                                </button>
                            </div>   
                        </div>
                    </div>
                </div>                                 
            </div>        
            <obespechenie :value="obespechenie" :type="bilet.type"/>
        </div>
        <kassa ref="kassa" class="col-4"></kassa> 
    </div>
</template>
<script>

import { Number, Bilet, StatmentRow } from './components'
import mix from '@/components/mix/vidacha-vozvrat'
import { toNumber } from '@/functions'
import { SvgCalculator } from '@/svg'
import Editor from './components/Editor.vue'
export default {
components: { Number, Bilet, StatmentRow, SvgCalculator },
mixins: [ mix ],
computed: {
    model() {
        const { _id: klient, passport } = this.klient
        return { ...this.$refs['bilet'].model, klient, passport }
    },
    disabled({ bilet }) {
        return !{ ...bilet }._id
    }
},
methods: {
    showModal (value) {
        const title = `Билет № ${value.number}`
        this.$modal.show(Editor, { title, value, save: async (vozvrat, vidacha) => {
            const { _id: klient, passport } = await this.saveKlient(this.klient)
            await this.saveBilet({...vozvrat, klient, passport })
            return this.select(await this.saveBilet({ ...vidacha, klient, passport }))
        } }, { height: 'auto' })
    }
}
}
</script>

<style>
.klient .btn.edit {
    display: flex;
    justify-content: flex-end;
    cursor: pointer;
}
</style>

