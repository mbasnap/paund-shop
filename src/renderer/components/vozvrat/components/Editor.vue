<template> 
    <modal-editor ref="modal-editor" :title="title" 
    @save="onsave().then(v => editor.close())" >
        <div class="row mb-3" >
            <div class="col mt-3">
                <strong>{{ `Билет № ${value.number}` }}</strong>
                <div class="mt-2" v-html="vozvrat"> </div>
            </div>
            <div class="col">
                <vidacha-bilet ref="vidacha" class="row" :editMode="true" :errors="errors"
                :disabled="true" @change="onChange" v-model="model" :type="type"/>
            </div>
        </div>
        <obespechenie ref="obespechenie" v-model="obespechenie" :type="type"></obespechenie>
    </modal-editor>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

import ModalEditor from '@/widgets/Modal.vue'
import VidachaBilet from '@/components/vidacha/components/Bilet.vue'
import Obespechenie from '@/components/obespechenie'
import { summ, getOcenca, rorrect, toNumber, mult, toDouble, diff } from '@/functions'
export default {
    components: { ModalEditor, VidachaBilet, Obespechenie },
    props: {
        title: String,
        value: { type: Object,
            default() {
                return {}
            }
        },
        save: Function
    },
    created() {
        this.calculate()        
    },
    data() {
        return {
            data: {},
            // pay: 0
        }
    },
    computed: {
        vozvrat({ value }) {
            return value.$el.outerHTML
        },
        vidacha() {
            return this.$refs['vidacha']
        },
        bilet({ value }) {
            return {...value.value}
        },
        model: {
            get({ data, bilet }) {
                const { days, xDisc, obespechenie } = bilet
                return {  days, xDisc, obespechenie, ...data }
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
        // ocenca({ model }) {
        //     const { ssuda, procent } = model
        //     return toNumber(ssuda) + toNumber(procent)
        // },
        total({ obespechenie }) {
            return summ( ...obespechenie.map(v => v.ocenca))
        },
        errors({ model, total }) {
            const { ssuda, procent } = model
            const ocenca = summ(ssuda, procent) >= total ? "over_total" : false
            return { ocenca }
        },
        editor() {
            return this.$refs['modal-editor']
        },
        type({ bilet }) {
            return bilet.zalog
        },

    },
    methods: { 
        onChange({ name, value }) {
                this.data = {...this.data, [name]: toDouble(value)}
                if (name === 'pay') this.calculate(value)
        },
        calculate(pay = 0) {
            const { total } = this.value
            this.$nextTick(() => {
                const { calculate } = this.vidacha
                calculate({ ssuda: toNumber(total) - toNumber(pay) })
            })
        },
        onsave() {
            const vozvrat = this.value.model
            const vidacha = this.$refs['vidacha'].model
            const obespechenie = this.$refs['obespechenie'].model
            // console.log(vidacha, obespechenie);
            
            return  this.save(vozvrat, {...vidacha, obespechenie })
        }
    }
}
</script>
<style>

</style>