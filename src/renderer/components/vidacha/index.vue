<template>
    <div class="row vidacha  pt-3">
        <div  class="col-8">
            <div class="row" style="height: 250px;">
                <klient ref="klient" class="col" v-model="klient"/>
                <div class="col pl-2 border-left">
                    <draggable v-if="target" class="target" :group="{ name: 'bilet', pull: 'clone' }"
                    :value="[]" @input="([v]) => onCopy(...v)"/>
                    <bilet ref="bilet" class="row" style="height: 75%;" :err="err" v-model="bilet"/>
                    <div class="row">
                        <div class="col-6 ">
                            <button class="btn btn-primary" @click="update()">{{ t('btn', 'reset') }}</button>
                        </div>
                        <div class="col-6">
                            <button class="btn btn-primary" :disabled="disabled"
                                @click="saveBilet(model).then(update())">
                                {{ t('btn', 'save') }}
                            </button>
                        </div>
                    </div>
                </div>                                 
            </div>        
            <obespechenie ref="obespechenie" v-model="obespechenie"
            @change="onChange"/>
        </div>
        <kassa ref="kassa" class="col-4" @start="target = true" @end="target = false"/>
    </div>
</template>

<script>
import { Bilet, draggable, mix } from './components'
import { summ, toNumber, toDouble, moment } from '@/functions'
export default {
components: { Bilet, draggable },
mixins: [ mix ],
data() {
    return {
        target: false,
        bilet: {}
    }
},
computed: {
    obespechenie: {
        get({ bilet }) {
            return bilet.obespechenie || [{}]
        },
        set(obespechenie) {
            this.bilet = {...this.bilet, obespechenie }
        }
    },
    klient: {
        get({ bilet }) {
            return bilet.klient
        },
        set(klient) {
            this.bilet = {...this.bilet, klient }
        }
    },
    model({ klient }) {
        const obespechenie = this.obespechenie.filter(v => toNumber(v.ocenca))
        return { ...this.$refs['bilet'].model, klient, obespechenie }
    },
    ocenca({ obespechenie }) {
        const ocenca = obespechenie.map(v => v.ocenca)
        return summ(...ocenca.map(toNumber))
    },
    err({ bilet, klient, ocenca }) {
        return { 
            ocenca: !(toNumber(ocenca) > 0),
            klient: !klient,
            ocenca_over: toNumber(bilet.ocenca) > toNumber(ocenca)
        }
    },
    disabled({ bilet, err }) {
        const excludes = v => !['ocenca_over'].includes(v)
        return !!bilet._id || Object.keys(err).filter(excludes).some(v => err[v])
    }
},
methods: {
    onChange({name, value}) {
        this.update({ ...this.bilet, [name]: value })
    },
    update(v) {
        this.bilet = {...v}
    },
    onCopy(id) {
        const { _id, number } = {}
        const  bilet = {...this.reestrMap[id] }
        const ref = this.reestrMap[bilet.ref]
        this.update({ ...(ref || bilet), _id, number })
    }
}
}
</script>

<style>
.vidacha{
    overflow: auto;
    height: 100%;
}
.target {
    height: 200px;
    position: absolute;
    z-index: 1000;
    width: 300px;
    background-color: rgba(0, 0, 0, 0.14);
}
</style>

