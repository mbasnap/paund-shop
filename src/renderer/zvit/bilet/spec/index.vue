<template>
    <div>
        <div class="row pl-4" style="height: 200px;">
            <klient class="col" :value="value"/>
            <bilet class="col border-left" :value="value"/>
        </div>
        <div class="row" style="height: 55px; margin-top: -10px;">
            <div class="col">
                <div class="row pr-3" >
                    <dater class="col"/>
                    <sign class="col-4" :name="t('kassir_sign')"/>
                </div>
            </div>
            <div class="col">
                <div class="row pl-3" >
                    <sign class="col-4" :name="t('kassir_sign')"/>
                    <dater class="col"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Klient from './Klient'
import Bilet from './Bilet'
import Sign from '../Sign'
import Dater from './Dater'
export default {
    components: { Klient, Bilet, Sign, Dater },
    props: { value: Object, klient: Object },
    methods: {
        t(v) {
            return this.$t('print.' + v)
        }
    },
    computed: {
        
    }
}
</script>

<style>

</style>