<template>
  <b-modal 
  v-model="modal"
  size="lg"
  content-class="perezalog" 
  :hide-footer="true" 
  title="Перезалог">
    <div class="modal-body mb-5" v-if="modal">
      <div class="row mb-3" >
        <div class="col">
          <strong>{{ `Билет № ${value.number}` }}</strong>
          <vozvrat-bilet :value="value" :disabled="true"/>
        </div>
        <div class="col">
          <vidacha-bilet 
            ref="vidacha"
            class="row vidacha-bilet" 
            :editMode="true" 
            :err="err"
            :disabled="true" 
            @change="change" 
            v-model="model"
            @reset="reset"
            @change-number="(number) => data = Object.assign({}, data, { number })">
            <template #default="{ssuda}">
              <div class="different">
                <dfn class="mr-3">Разница</dfn>
                <span :style="{ color: getDiff(ssuda) < 0  ? 'red' : 'green', 'font-weight': 500 }">
                  {{ toDouble(getDiff(ssuda)) }}
                </span>
              </div>
            </template>
          </vidacha-bilet>
            
        </div>
      </div>
      <obespechenie v-model="obespechenie"></obespechenie>
    </div>
    <modal-footer 
      ok="save" 
      :loading="loading" 
      @ok="save" 
      :disabled="disabled" 
      @cansel="close"/>
  </b-modal>
</template>

<script>
import { mapGetters } from 'vuex'
import ModalEditor from '@/widgets/Modal.vue'
import VozvratBilet from '@/components/vozvrat/components/Bilet.vue'
import VidachaBilet from '@/components/vidacha/components/Bilet.vue'
import Obespechenie from '@/components/obespechenie'
import { summ, toNumber, toDouble } from '@/functions'
import ModalFooter from '@/widgets/ModalFooter'
export default {
  components: { ModalEditor, VozvratBilet, VidachaBilet, Obespechenie, ModalFooter },
  props: ['value'],
  data: () => ({
    modal: false,
    resolve: null,
    loading: false,
    data: {},
    total: 0,
  }),

  computed: {
    ...mapGetters({ emptyNumbers: 'reestr/emptyNumbers' }),
    model: {
      get() {
        const pay = toNumber(this.data.pay) * -1
       const ocenca = summ(this.value.ocenca, pay)
        const number = this.data.number || this.emptyNumbers[0]
        return {...this.value, ...this.data, ocenca, number }
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
    disabled({ model }) {
      const sameNumber = this.value.number === model.number
      return !Number(model.number) || sameNumber
    },
    err({ model, ocenca }) {
      return {
        ocenca_over: summ(model.ssuda, model.procent) > ocenca
      }
    },
  },
  methods: {
    toDouble,
    getDiff(ssuda) {
      return this.total - toNumber(ssuda)
    },
    save() {
      this.loading = true
      this.resolve(this.model)
    },
    show(v) {
      this.reset()
      this.total = toNumber(v)
      this.modal = true
      return new Promise(resolve => this.resolve = resolve)
    },
    close() {
      this.loading = false
      this.modal = false
      this.reset()
    },
    change({ value: pay }) {
      this.data = {...this.data, pay }
    },
    reset() {
      this.data = {}
    }
  }
}
</script>

<style >
  .perezalog {
    height: auto;
  }
  .perezalog .modal-body {
    max-height: none !important;
    overflow: visible;
    /* padding: 0; */
  }
  .perezalog .vidacha-bilet {
    margin-top: -25px;
  }
  .perezalog .different {
    border-bottom: 1px solid #00000030;
  }
</style>