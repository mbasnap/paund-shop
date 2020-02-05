<template>
    <div class="row flex-fill vidacha">
        <div class="col-8 pt-3">
            <div class="row " style="height: 250px;">
                <klient ref="klient" class="col p-0" :value="klient" :disabled="disabled"/>
                <div class="col p-0 border-left">
                    <number class="col mb-2" :value="bilet" :disabled="disabled"
                    @select="update"/>
                    <bilet ref="bilet" class="col" style="min-height: 140px;"
                    v-model="bilet" :disabled="disabled"/>
                    <div class="col">
                        <div class="row">
                            <div class="col-6 ">
                                <button class="btn btn-primary" @click="update({})">{{ t('reset') }}</button>
                            </div>
                            <div class="col-6">
                                <button class="btn btn-primary" :disabled="disabled"
                                @click="save().then(v => update())">{{ t('save') }}</button>
                            </div>   
                        </div>
                    </div>
                </div>                                 
            </div>        
            <obespechenie :value="obespechenie" :disabled="disabled" :type="bilet.type"/>
        </div>
        <kassa ref="kassa" class="col-4"></kassa> 
    </div>
</template>
<script>

import { Number, Bilet } from './components'
import mix from '@/components/mix/vidacha-vozvrat'
import { toNumber } from '@/functions'
export default {
components: { Number, Bilet },
mixins: [ mix ],
computed: {
    values({ bilet }) {
        const { _id: ref, number } = bilet
        const title = `vozvtashena ssuda po zalogovomu biletu ${number}`
        const { ocenca, procent, penalty, statment } = this.$refs['bilet'].model
        return { ref, number, values: [
            { dt: '301', ct: '377', summ: ocenca },
            { dt: '301', ct: '703', ...statment }, // ct 301 if return procent statment
            { dt: '703', ct: '301', ...procent }, // ct 301 if return procent
            { dt: '301', ct: '704', ...penalty }
        ].filter(v => toNumber(v.summ))}
    },
    disabled({ bilet }) {
        return !{ ...bilet }._id
    }
},
methods: {}
}
</script>

<style>
.klient .btn.edit {
    display: flex;
    justify-content: flex-end;
    cursor: pointer;
}
</style>

