<template>
    <div class="row flex-fill vidacha">
        <div  class="col-8 pt-3">
            <div class="row" style="height: 250px;">
                <klient ref="klient" class="col p-0 " v-model="klient" :disabled="disabled">
                    <span class="reset" @click="klient = {}">x</span>
                </klient>
                <div class="col pl-2 border-left">
                    <draggable v-if="target" class="target" :group="{ name: 'bilet', pull: 'clone' }"
                    :value="[]" @input="([v]) => onCopy(...v)"/>
                    <bilet ref="bilet" class="row" style="height: 75%;" :type="type"
                    v-model="bilet" :disabled="disabled"/>
                    <div class="row">
                        <div class="col-3 ">
                            <button class="btn btn-primary" @click="update()">reset</button>
                        </div>
                        <div class="col-3">
                            <button class="btn btn-primary"
                            @click="save()"> save</button>
                        </div>
                    </div>
                </div>                                 
            </div>        
            <obespechenie v-model="obespechenie" :disabled="disabled" :type="type"
            @changeType="v => type = v" @change=" ocenca => $refs['bilet'].calculate({ocenca})"/>
        </div>
        <kassa ref="kassa" class="col-4" @start="target = true" @end="target = false"/>
    </div>
</template>

<script>
import { Bilet } from './components'
import mix from '@/components/mix/vidacha-vozvrat'
import { getProcent, proc, toNumber, toDouble, mult, diff, pDiff, moment } from '@/functions'
import draggable from 'vuedraggable'
export default {
components: { Bilet, draggable },
mixins: [ mix ],
data() {
    return {
        target: false,
        type: 'gold'
    }
},
computed: {
    model({ bilet, type }) {
        const title = `vidana ssuda po zalogovomu biletu ${bilet.number}`
        const obespechenie = this.obespechenie.filter(v => toNumber(v.ocenca))
        return { ...this.$refs['bilet'].model, title, obespechenie, type }
    },
    values({ model }) {
        const { dt, ct } = this.order
        const { ocenca, procent } = model
        return {...model, values: [
            { dt: '377', ct: '301', summ: ocenca, order: ct},
            { dt: '301', ct: '703', summ: procent, order: dt }
        ].filter(v => toNumber(v.summ))}
    },
    disabled({ bilet }) {
        return !!{ ...bilet }._id
    }
},
methods: {
    changeType(v) {
        this.type = !v ? 'gold' : 'things'
    },
    onCopy(id) {
        const { klient, passport, obespechenie, ocenca, days, discount, type } = { ...this.map[id]}
        this.update({ klient, passport, obespechenie, ocenca, days, discount, type})
    }
}
}
</script>

<style>
.target {
    height: 200px;
    position: absolute;
    z-index: 1000;
    width: 300px;
    background-color: rgba(0, 0, 0, 0.14);
}
</style>

