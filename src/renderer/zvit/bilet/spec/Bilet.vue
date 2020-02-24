<template>
    <div>
        <div class="row" style="margin-top: 3px; font-size: 20px; text-align: right;">
            <div class="col">
                <span class="pr-1"><strong >{{ t('dogovor-zaima') }}</strong></span>
                <span style="border: 2px solid;"><strong class="pl-1 pr-1"> № {{ bilet.number }}</strong></span>
            
            </div>
        </div>

        <div class="row">
            <div class="col border-top border-right" style="text-align: right;">
                <div class="row ">
                    <div class="col-1 border-right">4</div>
                    <div class="col" >{{ t('srok-zaima') }}</div>
                </div>
            </div>
            <div class="col border-bottom">
                {{ bilet.days }} дн.
            </div>
        </div>
        <div class="row">
            <div class="col border-top border-right" style="text-align: right;">
                <div class="row ">
                    <div class="col-1 border-right">5</div>
                    <div class="col" >{{ t('srok-vozvrata') }}</div>
                </div>
            </div>
            <div class="col border-bottom">
                {{ bilet.returnDate }}
            </div>
        </div>
        <div class="row">
            <div class="col border-top border-right" style="text-align: right;">
                <div class="row border-bottom">
                    <div class="col-1 border-right">6</div>
                    <div class="col" >{{ t('summa-na-ruki') }}</div>
                </div>
            </div>
            <div class="col border-bottom">
                {{ total }}
                <span style="font-size: 11px; font-style: italic;">{{ t('curency') }}</span>
            </div>
        </div>
        <div class="row border-bottom">
            <div class="col border-right" style="text-align: right;">
                <div class="row">
                    <div class="col-1 border-right">7</div>
                    <div class="col" style="font-size: 14px;">{{ t('procent-po-zaimu') }}</div>
                </div>
            </div>
            <div class="col">
                {{ procent }}
                <span style="font-size: 11px; font-style: italic;">{{ t('curency') }}</span>
            </div>
        </div>
        <div class="row border-bottom">
            <div class="col border-right" style="text-align: right;">
                <div class="row">
                    <div class="col-1 border-right">8</div>
                    <div class="col p-0 pr-1" style="font-size: 12px; line-height: 24px;">
                        {{ t('podlejit-vozvratu') }}
                    </div>
                </div>
            </div>
            <div class="col">
                {{ bilet.ocenca }}
                <span style="font-size: 11px; font-style: italic;">{{ t('curency') }}</span>
            </div>
        </div>
        <!-- <div class="row mt-1"> -->
            <!-- <div class="col-4">
                <sign class="mt-5" :name="t('kassir_sign')"/>
            </div>
            <div class="col" style="height: 28px; font-size: 12px; ">
                <div class="row border-bottom mb-1" style="line-height: 18px;">
                    {{ t('pogasheno') }}
                </div>
                <div class="row border-bottom" style="line-height: 18px;">
                    {{ t('procent')  }} / {{ t('penalty')}}
                </div>
            </div> -->
        <!-- </div> -->
    </div>
</template>

<script>
import Sign from '../Sign'
import { mapGetters, mapActions } from 'vuex'
import { toDouble, toNumber } from '@/functions'
export default {
props: { value: Object },
components: {Sign},
inject: ['t'],
computed: {
    bilet({ value }) {
        return { ...value }
    },
    company({ bilet }) {
        return { ...bilet.company }
    },
    procent({ bilet }) {
        return bilet.procent
    },
    total({ bilet, procent }) {
        const total = toNumber(bilet.ocenca) - toNumber(procent)
        return toDouble(total)
    },
},

methods: {}
}
</script>

<style>

</style>