<template> 
    <modal-editor :title="title" :disabled="disabled" style="width: 718px;">
        <div>
            <spec :value="bilet"/>
            <obespechenie  :value="bilet.obespechenie"/>
        </div>
        <div class="print-only mt-5" style="border: 1px dashed;"></div>
        <div class="print-only mt-5">
            <spec :value="bilet"/>
            <div class="row">
                <obespechenie class="col-9" :value="bilet.obespechenie"/>
                <div class="col-3" style="border-top: 1px dashed; border-left: 1px dashed;">
                    <control-tiket  :bilet="bilet" :klient="klient"/>
                    <div class="row" style="position: absolute; bottom: 0px; width: 100%;">
                        <sign class="col p-0" :name="t('kassir_sign')"/>
                        <div class="col p-0" style="font-size: 15px; line-height: 30px;">
                            {{ klient.sername}}
                        </div>
                    </div>
                    <!-- <div class="row" style="position: absolute; bottom: 0px; width: 100%;">
                        <sign class="col-7" :name="t('klient_sign')" :value="klient.family"/>
                    </div> -->
                </div>
            </div>
        </div>
    </modal-editor>
</template>
<script>
import { mapGetters } from 'vuex'
import ModalEditor from '@/components/ModalPrint'
import Obespechenie from './obespechenie'
import Spec from './spec'
import ControlTiket from './control-tiket'
import Sign from './Sign'
export default {
    components: { ModalEditor, Spec, Obespechenie, ControlTiket, Sign },
    props: { value: Object },
    computed: {
        ...mapGetters({
            klients: 'klient/klients',
            dt001: 'reestr/dt001',
            ct001: 'reestr/ct001'
        }),
        title({ value }) {
            return value.type
        },
        bilet({ value, dt001, ct001 }) {
            return { ...dt001, ...ct001 }[value._id]
        },
        klient({ bilet, klients }) {
            const { klient: id } = bilet
            return klients[id]
        },
        disabled({ }) {}
    },
    methods: {
        t(v) {
            return this.$t('print.' + v)
        }
    }
}
</script>
<style>
.print-only {
    display: none;
}
</style>