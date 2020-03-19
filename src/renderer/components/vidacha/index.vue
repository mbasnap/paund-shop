<template>
    <div class="row flex-fill vidacha">
        <div  class="col-8 pt-3">
            <div class="row" style="height: 250px;">
                <klient ref="klient" class="col p-0 " v-model="klient" @reset="klient = {}"/>
                <div class="col pl-2 border-left">
                    <draggable v-if="target" class="target" :group="{ name: 'bilet', pull: 'clone' }"
                    :value="[]" @input="([v]) => onCopy(...v)"/>
                    <bilet ref="bilet" class="row" style="height: 75%;" :type="type"
                    v-model="bilet"/>
                    <div class="row">
                        <div class="col-6 ">
                            <button class="btn btn-primary" @click="update()">{{ t('reset') }}</button>
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
            <obespechenie ref="obespechenie" v-model="obespechenie" :type="type"
            @changeType="v => type = v" @change=" ocenca => $refs['bilet'].calculate({ocenca})"/>
        </div>
        <kassa ref="kassa" class="col-4" @start="target = true" @end="target = false"/>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { Bilet } from './components'
import mix from '@/components/mix/vidacha-vozvrat'
import { getProcent, proc, toNumber, toDouble, mult, diff, pDiff, moment } from '@/functions'
import draggable from 'vuedraggable'
export default {
components: { Bilet, draggable },
mixins: [ mix ],
created() {
    // this.updateCompany()
},
data() {
    return {
        target: false,
    }
},
computed: {
    ...mapGetters({
    }),

    model() {
        const { _id: klient } = this.klient
        const obespechenie = this.obespechenie.filter(v => toNumber(v.ocenca))
        return { ...this.$refs['bilet'].model, klient, obespechenie }
    },
    disabled({ bilet, klient }) {
        return !klient.isValid
    }
},
methods: {
    ...mapActions({
        logOut: 'logOut',
        // updateCompany: 'update'
    })
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

