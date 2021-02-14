<template>
  <div class="row vidacha  pt-3">
    <div  class="col-8">
      <div class="row" style="height: 300px;">
        <klient ref="klient" class="col" v-model="klient" :disabled="!!klient" :clearable="true"/>
        <div class="vidacha__bilet col pl-2 border-left">
          <draggable v-if="target" class="target" group="bilet"/>
          <bilet ref="bilet" class="row" style="height: 75%;" 
          :err="err" 
          v-model="bilet"
          @reset="bilet = {}"
          @change-number="(number) => bilet = Object.assign({}, bilet, { number })"/>
          <div class="vidacha__actions">
            <b-spinner v-if="loading" variant="primary"></b-spinner>
            <button v-else class="btn btn-primary" :disabled="disabled"
              @click="onSave">
              {{ t('btn', 'save') }}
            </button>
          </div>
        </div>                                 
      </div>        
      <obespechenie ref="obespechenie" v-model="obespechenie"
      @change="onChange"/>
    </div>
    <kassa ref="kassa" class="col-4" @start="() => target = true" @end="onEnd"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Bilet, draggable, mix } from './components'
import { summ, toNumber } from '@/functions'
export default {
components: { Bilet, draggable },
mixins: [ mix ],
data() {
  return {
    loading: false,
    target: false,
    bilet: {}
  }
},
computed: {

  obespechenie: {
    get({ bilet }) {
      const { obespechenie = [] } = bilet || {}
      return obespechenie.length ? obespechenie : [{}]
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
  onEnd([{ toElement }, v]) {
    const { number, _id } = {}
    const target = toElement.className === 'target'
    this.update(target ? {...v, number, _id } : {})
  },
  onChange({name, value}) {
    this.update({ ...this.bilet, [name]: value })
  },
  update(v = {}) {
    this.bilet = v
    this.loading = false
    this.target = false
  },
  async onSave() {
    this.loading = true
    const res = await this.saveBilet(this.model)
    this.update(res)
  }
}
}
</script>

<style scoped>
.vidacha{
  overflow: auto;
  height: 100%;
}
.vidacha >>> .target {
  height: 200px;
  position: absolute;
  z-index: 1000;
  width: 300px;
  background-color: rgba(0, 0, 0, 0.14);
}
.vidacha__bilet {
  position: relative;
}
.vidacha__actions {
  position: absolute !important;
  bottom: 10px;
  right: 10px;
}
</style>

