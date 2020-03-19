<template>
    <div class="row flex-fill vidacha">
        <div class="col-8 pt-3">
            <div class="row " style="height: 250px;">
                <klient ref="klient" class="col p-0" v-model="klient" :disabled="true"/>
                <div class="col">
                    <div class="row p-0 m-0">
                        <number class="col" v-model="bilet" @select="update"/>
                        <div class="col-2" style="text-align: right; line-height: 50px;">
                            <svg-reset  width="8px;" @click="update({})"/>
                        </div>  
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
                                @click="saveBilet(model).then(() => update({}))">
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
import { mapGetters, mapActions } from 'vuex'
import { Number, Bilet, StatmentRow } from './components'
import mix from '@/components/mix/vidacha-vozvrat'
import { toNumber } from '@/functions'
import { SvgCalculator, SvgReset } from '@/svg'
import Editor from './components/Editor.vue'
export default {
components: { Number, Bilet, StatmentRow, SvgCalculator, SvgReset },
mixins: [ mix ],
created() {
    // this.updateCompany()
},
computed: {
    model() {
        const { _id: klient } = this.klient
        return { ...this.$refs['bilet'].model, klient }
    },
    disabled({ bilet }) {
        return !{ ...bilet }._id
    }
},
methods: {
    ...mapActions({
        // updateCompany: 'update'
    }),
    showModal (value) {
        const title = 'Perezalog'
        this.$modal.show(Editor, { title, value, save: async (vozvrat, vidacha) => {
            const { _id: klient } = this.klient
            await this.saveBilet({...vozvrat, klient })
            return this.saveBilet({ ...vidacha, klient }).then(() => this.update({}))
        } }, { width: '800px', height: 'auto' })
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

