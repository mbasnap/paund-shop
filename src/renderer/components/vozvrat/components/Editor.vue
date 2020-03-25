<template> 
    <modal-editor ref="modal-editor" :title="title" :disabled="disabled"
    @save="onsave().then(v => $refs['modal-editor'].close())">
        <div class="row mb-3" >
            <div class="col">
                <strong>{{ `Билет № ${bilet.number}` }}</strong>
                <vozvrat-bilet :value="bilet" :disabled="true"/>
            </div>
            <div class="col">
                <vidacha-bilet ref="vidacha" class="row" :editMode="true" :err="err"
                :disabled="true" @change="onChange" v-model="model"/>
            </div>
        </div>
        <obespechenie ref="obespechenie" v-model="obespechenie"></obespechenie>
    </modal-editor>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

import ModalEditor from '@/widgets/Modal.vue'
import VozvratBilet from '@/components/vozvrat/components/Bilet.vue'
import VidachaBilet from '@/components/vidacha/components/Bilet.vue'
import Obespechenie from '@/components/obespechenie'
import { summ, toNumber, toDouble } from '@/functions'
export default {
    components: { ModalEditor, VozvratBilet, VidachaBilet, Obespechenie },
    props: { title: String, value: Object, save: Function },
    created() {
        this.calculate()
    },
    data() {
        return {
            data: {},
        }
    },
    computed: {
        vidacha() {
            return this.$refs['vidacha']
        },
        bilet({ value }) {
            return {...value.bilet}
        },
        vozvrat({ value }) {
            return {...value.vozvrat}
        },
        model: {
            get({ data, bilet }) {
                return {...bilet, ...data, number: undefined}
            },
            set(v) {
                this.data = { ...this.data, ...v }
            }
        },
        obespechenie: {
            get({ model }) {
                return model.obespechenie || []
            },
            set(obespechenie) {
                this.data = { ...this.data, obespechenie }
            }
        },
        ocenca({ obespechenie }) {
            const ocenca = obespechenie.map(v => v.ocenca)
            return summ(...ocenca.map(toNumber))
        },
        err({ model, ocenca }) {
            return {
                ocenca_over: summ(model.ssuda, model.procent) > ocenca
            }
        },
        disabled() {

        }
        // type({ bilet }) {
        //     return bilet.zalog
        // },

    },
    methods: { 
        onChange({ name, value }, silent) {
            this.data = {...this.data, [name]: toDouble(value)}
            if (!silent) this.calculate(value)
        },
        calculate(pay = 0) {
            const value = toNumber(this.vozvrat.total) - toNumber(pay)
            this.onChange({ name: 'ssuda', value}, true)
            // this.$nextTick(() => {
            //     this.vidacha.calculate(toNumber(this.vozvrat.total) - toNumber(pay))
            // })
        },
        async onsave() {
            const { vozvrat, vidacha, obespechenie } = this
            await this.save(vozvrat, true)
            return  this.save({...vidacha.model, klient: vozvrat.klient, obespechenie })
        }
    }
}
</script>
<style>

</style>