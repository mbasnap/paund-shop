<template>
    <div>
        <div class="row pl-4" style="height: 200px;">
            <klient class="col " :value="value"/>
            <bilet class="col border-left" :value="value"/>
        </div>
        <div class="row" style="height: 45px; ">
            <div class="col">
                <div class="row">
                    <div class="col pr-0" style="font-style: italic; line-height: 14px; font-size: 11px; text-align: right;">
                        {{ t('text-aggree')}}
                    </div>
                    <sign class="col-4" :name="t('klient_sign')" style="margin-top: 25px;"/>
                </div>
            </div>
            <div class="col">
                <div class="row pl-3 mb-1" style="margin-top: -20px; " >
                    <!-- <div class="col-3 p-0 pl-1" style="font-style: italic; font-size: 12px;">
                        {{ t('vikup-oplachen')}}
                    </div> -->
                    <dater class="col" style="text-align: left;"/>
                </div>
                <div class="row">
                    <div class="col" style="font-style: italic; line-height: 14px; font-size: 11px; text-align: right;">
                        {{ t('poluchil')}}
                    </div>
                    <sign class="col-4" :name="t('klient_sign')" style="margin-top: 7px;"/>
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
    inject: ['t'],
    props: { value: Object, klient: Object },
    methods: {},
    computed: {
        
    }
}
</script>

<style>

</style>